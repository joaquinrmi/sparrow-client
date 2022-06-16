import React, { useState } from "react";
import { Routes, Route, Navigate, useParams, useSearchParams } from "react-router-dom";
import NavigationBar from "./components/navigation_bar";
import SessionContext from "../../session_context";
import MainSection from "./components/main_section";
import Profile from "./components/profile";
import CheepPage from "../cheep_page";
import Router from "../../components/router";
import RouteSetter from "../../components/route_setter";
import StateContext from "./state_context";
import SparrowState from "./state";
import StateManager from "./state_manager";
import CheepEditorModal from "./components/cheep_editor_modal";
import StatusModal from "../../components/status_modal";
import StatusMessageContext from "../../status_message_context";
import RecheepMenu from "./components/recheep_menu";
import ProfileFormModal from "./components/profile_form_modal";
import CloseConfirmation from "./components/close_confirmation";
import CheepGalleryModal from "./components/cheep_gallery_modal";
import MainAside from "./components/main_aside";

import "./sparrow.scss";
import Search from "../search";

const Sparrow: React.FunctionComponent = () =>
{
    const [ state, setState ] = useState<SparrowState>({
        location: {
            profile: {
                currentRoute: ""
            },
            innerProfile: {
                currentRoute: ""
            }
        },
        profile: {
            data: {
                handle: "",
                name: "",
                picture: "",
                banner: "",
                description: "",
                location: "",
                birthdate: new Date(),
                joinDate: new Date(),
                website: "",
                cheepCount: 0,
                followersCount: 0,
                followingCount: 0
            }
        },
        cheepLists: {
            home: { query: {}, nextTime: 0, cheeps: [] },
            explore: { query: {}, nextTime: 0, cheeps: [] },
            profileCheeps: { query: {}, nextTime: 0, cheeps: [] },
            profileWithReplies: { query: {}, nextTime: 0, cheeps: [] },
            profileMedia: { query: {}, nextTime: 0, cheeps: [] },
            profileLikes: { query: {}, nextTime: 0, cheeps: [] },
            thread: { query: {}, nextTime: 0, cheeps: [] },
            comments: { query: {}, nextTime: 0, cheeps: [] },
            search: { query: {}, nextTime: 0, cheeps: [] },
        },
        cheepEditor: {},
        closeConfirmation: {
            open: false,
            discart() {}
        }
    });

    const [ currentRoute, setCurrentRoute ] = useState<string>("");
    const [ userHandle, setUserHandle ] = useState<string>("");
    const [ cheepId, setCheepId ] = useState<number>(0);
    const [ searchParams, setSearchParams ] = useState<URLSearchParams>();

    const [ statusMessage, setStatusMessage ] = useState<string>("");

    const aside = <MainAside />;

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

                    cheep: <MainSection mainColumnChildren={<CheepPage id="cheep-page" cheepId={cheepId} />} rightColumnChildren={aside} />,

                    profile: <MainSection mainColumnChildren={<Profile handle={userHandle} />} rightColumnChildren={aside} />,

                    search: <MainSection mainColumnChildren={<Search params={searchParams} />} rightColumnChildren={aside} />,
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
                    
                    <Route path="/settings/profile" element={<ProfileFormModal />} />
                    
                    <Route path="/settings" element={<RouteSetter id="settings" onMatch={() => {
                        setCurrentRoute("settings");
                    }} />} />

                    <Route path="/search" element={<GetSearchParams>{(searchParams) =>
                    {
                        return <RouteSetter id={`search-${searchParams.get("q")}`} onMatch={() => {
                            setSearchParams(searchParams);
                            setCurrentRoute("search");
                        }} />;
                    }}</GetSearchParams>} />

                    <Route path="/compose/cheep/*" element={<CheepEditorModal />} />

                    <Route path="/:userHandle/status/:cheepId/photo/:photoIndex/*" element={<GetHandle>{(userHandle) =>
                    {
                        return <GetCheepId>{(cheepId) =>
                            {
                                return <GetPhotoIndex>{(photoIndex) =>
                                {
                                    return <CheepGalleryModal userHandle={userHandle} cheepId={cheepId} photoIndex={photoIndex} />;
                                }}</GetPhotoIndex>
                            }
                        }</GetCheepId>;
                    }}</GetHandle>} />
                    
                    <Route path="/:userHandle/status/:cheepId/*" element={<GetCheepId>{
                        (cheepId) =>
                        {
                            return <RouteSetter id={`cheep-${cheepId}`} onMatch={() => {
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
                <RecheepMenu /> :
                null
            }

            {state.closeConfirmation.open ?
                <CloseConfirmation /> :
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

interface GetPhotoIndexProps
{
    children(photoIndex: number): React.ReactNode;
}

const GetPhotoIndex: React.FunctionComponent<GetPhotoIndexProps> = (props) =>
{
    const { photoIndex } = useParams();

    return <>{props.children(Number(photoIndex))}</>;
};

interface GetSearchParamsProps
{
    children(searchParams: URLSearchParams): React.ReactNode;
}

const GetSearchParams: React.FunctionComponent<GetSearchParamsProps> = (props) =>
{
    const [ searchParams ] = useSearchParams();

    return <>{props.children(searchParams)}</>;
}

export default Sparrow;