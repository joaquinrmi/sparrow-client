import React, { useState } from "react";
import { Routes, Route, Navigate, useParams, useNavigate } from "react-router-dom";
import NavigationBar from "./components/navigation_bar";
import SessionContext from "../../session_context";
import MainSection from "./components/main_section";
import Profile, { ProfileState, SetProfileState, DEFAULT_PROFILE_STATE } from "./components/profile";
import Modal from "../../components/modal";
import CheepEditor from "./components/cheep_editor";
import UpdateState from "../../update_state";
import CheepPage, { CheepPageState, SetCheepPageState } from "../cheep_page";

import "./sparrow.scss";

const Sparrow: React.FunctionComponent = () =>
{    
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

    const [ cheepPageState, setCheepPageState ] = useState<CheepPageState>({});
    const [ changeCheepPageState ] = useState<SetCheepPageState>({
        cheepData: (value) =>
        {
            UpdateState(setCheepPageState, { cheepData: value });
        },
    });

    const navigate = useNavigate();

    const homePage = <>A</>;
    const explorePage = <>B</>;
    const notificationsPage = <>C</>;
    const messagesPage = <>D</>;
    const settingsPage = <>E</>;

    const aside = <></>;

    return <SessionContext.Consumer>{(userSession) =>
    {
        return <div className="sparrow">
            <div className="sparrow-content">
                <div className="navigation-container">
                    <NavigationBar handle={userSession.user.handle} />
                </div>

                <Routes>
                    <Route path="/" element={<Navigate to="/home" />} />

                    <Route path="/home" element={<PageComponent name="home" aside={aside}>
                        {homePage}
                    </PageComponent>} />

                    <Route path="/explore" element={<PageComponent name="explore" aside={aside}>
                        {explorePage}
                    </PageComponent>} />

                    <Route path="/notifications" element={<PageComponent name="notifications" aside={aside}>
                        {notificationsPage}
                    </PageComponent>} />

                    <Route path="/messages" element={<PageComponent name="messages" aside={aside}>
                        {messagesPage}
                    </PageComponent>} />

                    <Route path="/settings" element={<PageComponent name="settings" aside={aside}>
                        {settingsPage}
                    </PageComponent>} />

                    <Route path="/compose/cheep/*" element={<Modal id="compose-modal" closeRequest={() =>
                    {
                        navigate(-1);
                    }}>
                        <CheepEditor />
                    </Modal>} />

                    <Route path="/:userHandle/status/:cheepId" element={<GetCheepId>
                        {(cheepId) =>
                        {
                            return <PageComponent name={`cheepid${cheepId}`} aside={aside}>
                                <CheepPage cheepId={cheepId} state={cheepPageState} setState={changeCheepPageState} />
                            </PageComponent>;
                        }}
                    </GetCheepId>} />

                    <Route path="/:userHandle/*" element={<GetHandle>
                        {(userHandle) =>
                        {
                            return <PageComponent name={userHandle} aside={aside}>
                                <Profile state={profileState} setState={changeProfileState} handle={userHandle} />
                            </PageComponent>;
                        }}
                    </GetHandle>} />
                </Routes>
            </div>
        </div>;
    }}</SessionContext.Consumer>
};

interface PageComponentProps
{
    children?: React.ReactNode;
    name: string;
    aside: React.ReactNode;
}

const PageComponent: React.FunctionComponent<PageComponentProps> = (props) =>
{
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

interface GetCheepIdProps
{
    children(cheepId: number): React.ReactNode;
}

const GetCheepId: React.FunctionComponent<GetCheepIdProps> = (props) =>
{
    const { cheepId } = useParams();

    return <>{props.children(Number(cheepId))}</>;
};

export default Sparrow;