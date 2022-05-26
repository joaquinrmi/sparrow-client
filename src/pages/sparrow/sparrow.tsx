import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useParams, useNavigate } from "react-router-dom";
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
    const [ currentPage, setCurrentPage ] = useState<CurrentPage>({
        path: "/",
        element: null
    });
    
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

    const changeCurrentPage = (newPage: CurrentPage) =>
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
                    
                    <Route path="/home" element={<PageComponent path="/home" aside={aside} currentPage={currentPage} setCurrentPage={changeCurrentPage}>
                        {homePage}
                    </PageComponent>} />

                    <Route path="/explore" element={<PageComponent path="/explore" aside={aside} currentPage={currentPage} setCurrentPage={changeCurrentPage}>
                        {explorePage}
                    </PageComponent>} />

                    <Route path="/notifications" element={<PageComponent path="/notifications" aside={aside} currentPage={currentPage} setCurrentPage={changeCurrentPage}>
                        {notificationsPage}
                    </PageComponent>} />

                    <Route path="/messages" element={<PageComponent path="/messages" aside={aside} currentPage={currentPage} setCurrentPage={changeCurrentPage}>
                        {messagesPage}
                    </PageComponent>} />

                    <Route path="/settings" element={<PageComponent path="/settings" aside={aside} currentPage={currentPage} setCurrentPage={changeCurrentPage}>
                        {settingsPage}
                    </PageComponent>} />

                    <Route path="/compose/cheep" element={<>
                        <MainSection mainColumnChildren={currentPage.element} rightColumnChildren={aside} />

                        <Modal id="compose-modal" closeRequest={() =>
                        {
                            navigate(currentPage.path);
                        }}>
                            <CheepEditor />
                        </Modal>
                    </>} />

                    <Route path="/:userHandle/*" element={<UserPage profileState={profileState} setProfileState={changeProfileState} aside={aside} currentPage={currentPage} setCurrentPage={changeCurrentPage} />} />
                </Routes>
            </div>
        </div>;
    }}</SessionContext.Consumer>
};

type SetCurrentPage = (currentPage: CurrentPage) => void;

interface CurrentPage
{
    path: string;
    element: any;
}

interface PageComponentProps
{
    children?: React.ReactNode;
    path: string;
    aside: React.ReactNode;
    currentPage: CurrentPage;
    setCurrentPage: SetCurrentPage;
}

const PageComponent: React.FunctionComponent<PageComponentProps> = (props) =>
{
    useEffect(() =>
    {
        if(props.path !== props.currentPage.path)
        {
            props.setCurrentPage({
                path: props.path,
                element: props.children
            });
        }
    });

    return <MainSection mainColumnChildren={props.children} rightColumnChildren={props.aside} />;
};

interface UserPageProps
{
    profileState: ProfileState;
    setProfileState: SetProfileState;

    aside: React.ReactNode;
    currentPage: CurrentPage;
    setCurrentPage: SetCurrentPage;
}

const UserPage: React.FunctionComponent<UserPageProps> = (props) =>
{
    const { userHandle } = useParams();
    const path = `/${userHandle}`;

    const profile = <Profile state={props.profileState} setState={props.setProfileState} handle={userHandle as string} />;

    return <PageComponent path={path} aside={props.aside} currentPage={props.currentPage} setCurrentPage={props.setCurrentPage}>
        {profile}
    </PageComponent>;
};

export default Sparrow;