import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useParams, useNavigate, useLocation } from "react-router-dom";
import NavigationBar from "./components/navigation_bar";
import SessionContext from "../../session_context";
import MainSection from "./components/main_section";
import Profile, { ProfileState, SetProfileState, DEFAULT_PROFILE_STATE } from "./components/profile";
import Modal from "../../components/modal";
import CheepEditor from "./components/cheep_editor";
import UpdateState from "../../update_state";

import "./sparrow.scss";

const Sparrow: React.FunctionComponent = () =>
{
    const [ currentPage, setCurrentPage ] = useState<string>("");
    
    const [ profileState, setProfileState ] = useState<ProfileState>(DEFAULT_PROFILE_STATE);
    const [ changeProfileState ] = useState<SetProfileState>({
        profileData: (value) =>
        {
            UpdateState(setProfileState, { profileData: value });
        },

        cheepsStatus: (value) =>
        {
            UpdateState(setProfileState, { cheepsStatus: value });
        },

        withRepliesStatus: (value) =>
        {
            UpdateState(setProfileState, { withRepliesStatus: value });
        },

        mediaStatus: (value) =>
        {
            UpdateState(setProfileState, { mediaStatus: value });
        },

        likesStatus: (value) =>
        {
            UpdateState(setProfileState, { likesStatus: value });
        },
    });

    const navigate = useNavigate();

    const homePage = <>A</>;
    const explorePage = <>B</>;
    const notificationsPage = <>C</>;
    const messagesPage = <>D</>;
    const settingsPage = <>E</>;

    const aside = <></>;

    const changeCurrentPage = (newPage: string) =>
    {
        setCurrentPage(newPage);
    };

    return <SessionContext.Consumer>{(userSession) =>
    {
        return <div className="sparrow">
            <div className="sparrow-content">
                <div className="navigation-container">
                    <NavigationBar handle={userSession.user.handle} />
                </div>

                <Routes>
                    <Route path="/" element={<Navigate to="/home" />} />
                    
                    <Route path="/home" element={<PageComponent name="home" aside={aside} currentPage={currentPage} setCurrentPage={changeCurrentPage}>
                        {homePage}
                    </PageComponent>} />

                    <Route path="/explore" element={<PageComponent name="explore" aside={aside} currentPage={currentPage} setCurrentPage={changeCurrentPage}>
                        {explorePage}
                    </PageComponent>} />

                    <Route path="/notifications" element={<PageComponent name="notifications" aside={aside} currentPage={currentPage} setCurrentPage={changeCurrentPage}>
                        {notificationsPage}
                    </PageComponent>} />

                    <Route path="/messages" element={<PageComponent name="messages" aside={aside} currentPage={currentPage} setCurrentPage={changeCurrentPage}>
                        {messagesPage}
                    </PageComponent>} />

                    <Route path="/settings" element={<PageComponent name="settings" aside={aside} currentPage={currentPage} setCurrentPage={changeCurrentPage}>
                        {settingsPage}
                    </PageComponent>} />

                    <Route path="/compose/cheep/*" element={<>
                        <MainSection mainColumnChildren={<>{(() =>
                        {
                            switch(currentPage)
                            {
                            case "":
                                return homePage;

                            case "home":
                                return homePage;

                            case "explore":
                                return explorePage;

                            case "notifications":
                                return notificationsPage;

                            case "messages":
                                return messagesPage;

                            case "settings":
                                return settingsPage;

                            default:
                                return <Profile state={profileState} setState={changeProfileState} handle={currentPage} />;
                            }
                        })()}</>} rightColumnChildren={aside} />

                        <Modal id="compose-modal" closeRequest={() =>
                        {
                            navigate(-1);
                        }}>
                            <CheepEditor />
                        </Modal>
                    </>} />

                    <Route path="/:userHandle/*" element={<GetHandle>
                        {(userHandle) =>
                        {
                            return <PageComponent name={userHandle} aside={aside} currentPage={currentPage} setCurrentPage={setCurrentPage}>
                                <Profile state={profileState} setState={changeProfileState} handle={userHandle} />
                            </PageComponent>;
                        }}
                    </GetHandle>} />
                </Routes>
            </div>
        </div>;
    }}</SessionContext.Consumer>
};

type SetCurrentPage = (currentPage: string) => void;

interface PageComponentProps
{
    children?: React.ReactNode;
    name: string;
    aside: React.ReactNode;
    currentPage: string;
    setCurrentPage: SetCurrentPage;
}

const PageComponent: React.FunctionComponent<PageComponentProps> = (props) =>
{
    useEffect(() =>
    {
        if(props.name !== props.currentPage)
        {
            props.setCurrentPage(props.name);
        }
    });

    return <MainSection mainColumnChildren={props.children} rightColumnChildren={props.aside} />;
};

interface GetHandleProps
{
    children(userHandle: string): React.ReactNode;
}

const GetHandle: React.FunctionComponent<GetHandleProps> = (props) =>
{
    const { userHandle } = useParams();
    
    return <>{props.children(userHandle as string)}</>;
};

export default Sparrow;