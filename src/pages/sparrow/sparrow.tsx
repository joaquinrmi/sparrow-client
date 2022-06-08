import React, { useState } from "react";
import { Routes, Route, Navigate, useParams } from "react-router-dom";
import NavigationBar from "./components/navigation_bar";
import SessionContext from "../../session_context";
import MainSection from "./components/main_section";
import Profile, { ProfileState, SetProfileState, DEFAULT_PROFILE_STATE } from "./components/profile";
import UpdateState from "../../update_state";
import CheepPage, { CheepPageState, SetCheepPageState } from "../cheep_page";
import Router from "../../components/router";
import RouteSetter from "../../components/route_setter";
import StateContext from "./state_context";
import SparrowState from "./state";
import StateManager from "./state_manager";
import CheepEditorModal from "./components/cheep_editor_modal";
import StatusModal from "../../components/status_modal";
import StatusMessageContext from "../../status_message_context";
import RecheepMenu from "./components/recheep_menu";

import "./sparrow.scss";

const Sparrow: React.FunctionComponent = () =>
{
    const [ state, setState ] = useState<SparrowState>({
        location: {
            profile: {
                currentRoute: ""
            }
        },
        cheepLists: {
            home: { query: {}, nextTime: 0, cheeps: [] },
            explore: { query: {}, nextTime: 0, cheeps: [] },
            profileCheeps: { query: {}, nextTime: 0, cheeps: [] },
            profileWithReplies: { query: {}, nextTime: 0, cheeps: [] },
            profileMedia: { query: {}, nextTime: 0, cheeps: [] },
            profileLikes: { query: {}, nextTime: 0, cheeps: [] },
        },
        cheepEditor: {}
    });

    const [ profileState, setProfileState ] = useState<ProfileState>(DEFAULT_PROFILE_STATE);
    const [ changeProfileState ] = useState<SetProfileState>({
        profileData: (value) =>
        {
            UpdateState(setProfileState, { profileData: value });
        }
    });

    const [ cheepPageState, setCheepPageState ] = useState<CheepPageState>({});
    const [ changeCheepPageState ] = useState<SetCheepPageState>({
        cheepData: (value) =>
        {
            UpdateState(setCheepPageState, { cheepData: value });
        },
    });

    const [ currentRoute, setCurrentRoute ] = useState<string>("");
    const [ userHandle, setUserHandle ] = useState<string>("");
    const [ cheepId, setCheepId ] = useState<number>(0);

    const [ statusMessage, setStatusMessage ] = useState<string>("");

    const aside = <></>;

    return <StateContext.Provider value={[
        state, new StateManager(setState)
    ]}>
    <SessionContext.Consumer>{(userSession) =>
    {
        return <StatusMessageContext.Provider value={(message: string) =>
        {
            setStatusMessage(message);
        }}>
        <div className="sparrow">
            <div className="sparrow-content">
                <div className="navigation-container">
                    <NavigationBar handle={userSession.user.handle} />
                </div>

                <Router currentRoute={currentRoute} routes={{
                    home: <MainSection mainColumnChildren={<>A</>} rightColumnChildren={aside} />,

                    explore: <MainSection mainColumnChildren={<>B</>} rightColumnChildren={aside} />,

                    notifications: <MainSection mainColumnChildren={<>C</>} rightColumnChildren={aside} />,

                    messages: <MainSection mainColumnChildren={<>D</>} rightColumnChildren={aside} />,

                    settings: <MainSection mainColumnChildren={<>E</>} rightColumnChildren={aside} />,

                    compose: <CheepEditorModal />,

                    cheep: <CheepPage id="cheep-page" cheepId={cheepId} state={cheepPageState} setState={changeCheepPageState} />,

                    profile: <MainSection mainColumnChildren={<Profile state={profileState} setState={changeProfileState} handle={userHandle} />} rightColumnChildren={aside} />
                }} />

                <Routes>
                    <Route path="/" element={<Navigate to="/home" />} />

                    <Route path="/home" element={<RouteSetter id="home" onMatch={() => {
                        setCurrentRoute("home");
                    }} />} />

                    <Route path="/explore" element={<RouteSetter id="explore" onMatch={() => {
                        setCurrentRoute("explore");
                    }} />} />
                    
                    <Route path="/notifications" element={<RouteSetter id="notifications" onMatch={() => {
                        setCurrentRoute("notifications");
                    }} />} />
                    
                    <Route path="/messages" element={<RouteSetter id="messages" onMatch={() => {
                        setCurrentRoute("messages");
                    }} />} />
                    
                    <Route path="/settings" element={<RouteSetter id="settings" onMatch={() => {
                        setCurrentRoute("settings");
                    }} />} />

                    <Route path="/compose/cheep/*" element={<CheepEditorModal />} />
                    
                    <Route path="/:userHandle/status/:cheepId/*" element={<GetCheepId>{
                        (cheepId) =>
                        {
                            return <RouteSetter id="cheep" onMatch={() => {
                                setCheepId(cheepId);
                                setCurrentRoute("cheep");
                            }} />;
                        }
                    }</GetCheepId>} />

                    <Route path="/:userHandle/*" element={<GetHandle>{
                        (userHandle) =>
                        {
                            return <RouteSetter id="profile" onMatch={() => {
                                setUserHandle(userHandle);
                                setCurrentRoute("profile");
                            }} />
                        }
                    }</GetHandle>} />
                </Routes>
            </div>
            
            <StatusModal id="sparrow-status-modal" message={statusMessage} onClose={() =>
            {
                setStatusMessage("");
            }} />

            {state.recheepMenu ?
                <RecheepMenu targetCheep={state.recheepMenu.targetCheep} positionX={state.recheepMenu.positionX} positionY={state.recheepMenu.positionY} onRecheep={state.recheepMenu.onRecheep} /> :
                null
            }
        </div></StatusMessageContext.Provider>;
    }}</SessionContext.Consumer></StateContext.Provider>;
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