import React, { useContext, useState } from "react";
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
import RecheepMenu from "./components/recheep_menu";
import ProfileFormModal from "./components/profile_form_modal";
import CloseConfirmation from "./components/close_confirmation";
import CheepGalleryModal from "./components/cheep_gallery_modal";
import MainAside from "./components/main_aside";
import Search from "../search";
import UnfollowConfirmation from "./components/unfollow_confirmation";
import LikesList from "../cheep_page/likes_list";
import QuotesList from "../cheep_page/quotes_list";
import RecheepsList from "../cheep_page/recheeps_list";
import GetHandle from "./components/get_handle";
import Home from "../home";
import Explore from "../explore";
import RecommendedList from "./components/recommended_list";
import CheepOptionsMenu from "./components/cheep_options_menu";
import AccountMenuButton from "./components/account_menu_button";
import Notifications from "../notifications";
import Messages from "../messages";
import Settings from "../settings";
import AccountMenu from "./components/account_menu";

import "./sparrow.scss";

const Sparrow: React.FunctionComponent = () =>
{
    const [ state, setState ] = useState<SparrowState>(
        {
            location:
            {
                profile: { currentRoute: "" },
                innerProfile: { currentRoute: "" },
                relations: { currentRoute: "" },
                cheepPage: { currentRoute: "" },
                mainAsideSearch: { currentRoute: "" },
                mainAsideGallery: { currentRoute: "" },
            },
            profile:
            {
                data:
                {
                    handle: "",
                    name: "",
                    picture: "",
                    joinDate: new Date(),
                    followingCount: 0,
                    followersCount: 0,
                    cheepCount: 0,
                    following: false
                }
            },
            cheepLists: 
            {
                home: { query: {}, nextTime: 0, cheeps: [] },
                explore: { query: {}, nextTime: 0, cheeps: [] },
                profileCheeps: { query: {}, nextTime: 0, cheeps: [] },
                profileWithReplies: { query: {}, nextTime: 0, cheeps: [] },
                profileMedia: { query: {}, nextTime: 0, cheeps: [] },
                profileLikes: { query: {}, nextTime: 0, cheeps: [] },
                thread: { query: {}, nextTime: 0, cheeps: [] },
                comments: { query: {}, nextTime: 0, cheeps: [] },
                search: { query: {}, nextTime: 0, cheeps: [] },
                quotes: { query: {}, nextTime: 0, cheeps: [] },
                userGallery: { query: {}, nextTime: 0, cheeps: [] },
            },
            userLists:
            {
                following: { id: "", target: "", users: [] },
                followers: { id: "", target: "", users: [] },
                likes: { id: "", target: "", users: [] },
                recheeps: { id: "", target: "", users: [] },
                asideRecommended: { id: "", target: "", users: [] },
                recommended: { id: "", target: "", users: [] },
            },
            cheepEditor: {},
            closeConfirmation:
            {
                open: false,
                discart() {}
            },
            unfollowConfirmation:
            {
                open: false,
                userHandle: "",
                unfollow() {}
            },
            mainAside: { userHandle: "" },
            statusMessage: { message: "" },
        }
    );

    const [ currentRoute, setCurrentRoute ] = useState<string>("");
    const [ userHandle, setUserHandle ] = useState<string>("");
    const [ cheepId, setCheepId ] = useState<number>(0);
    const [ searchParams, setSearchParams ] = useState<URLSearchParams>();

    const userSession = useContext(SessionContext);

    const aside = <MainAside />;

    return <StateContext.Provider
        value={
        [
            state, new StateManager(setState)
        ]}
    >
        <div className="sparrow">
            <div className="sparrow-content">
                <div className="sparrow-left">
                    <div className="navigation-container">
                        <NavigationBar handle={userSession.user.handle} />

                        <div className="account-menu-button-container">
                            <AccountMenuButton />
                        </div>
                    </div>
                </div>

                <Router
                    currentRoute={currentRoute}
                    routes={
                    {
                        home: <MainSection mainColumnChildren={<Home />} rightColumnChildren={aside} />,

                        explore: <MainSection mainColumnChildren={<Explore />} rightColumnChildren={aside} />,

                        notifications: <MainSection mainColumnChildren={<Notifications />} rightColumnChildren={aside} />,

                        messages: <MainSection mainColumnChildren={<Messages />} rightColumnChildren={aside} />,

                        settings: <MainSection mainColumnChildren={<Settings />} rightColumnChildren={aside} />,

                        compose: <CheepEditorModal />,

                        cheep: <MainSection mainColumnChildren={<CheepPage id="cheep-page" cheepId={cheepId} />} rightColumnChildren={aside} />,

                        profile: <MainSection mainColumnChildren={<Profile handle={userHandle} />} rightColumnChildren={aside} />,

                        recommended: <MainSection mainColumnChildren={<RecommendedList />} rightColumnChildren={aside} />,

                        search: <MainSection mainColumnChildren={<Search params={searchParams} />} rightColumnChildren={aside} />,

                        hashtag: <MainSection mainColumnChildren={<Search params={searchParams} />} rightColumnChildren={aside} />,

                        usersLike: <MainSection mainColumnChildren={<LikesList cheepId={cheepId} />} rightColumnChildren={aside} />,

                        withComments: <MainSection mainColumnChildren={<QuotesList cheepId={cheepId} />} rightColumnChildren={aside} />,

                        recheeps: <MainSection mainColumnChildren={<RecheepsList cheepId={cheepId} />} rightColumnChildren={aside} />,
                    }}
                />

                <Routes>
                    <Route path="/" element={<Navigate to="/home" />} />

                    <Route path="/home" element={
                        <RouteSetter 
                            id="home"
                            onMatch={() =>
                            {
                                setCurrentRoute("home");
                            }}
                        />}
                    />

                    <Route path="/explore" element={
                        <RouteSetter
                            id="explore"
                            onMatch={() =>
                            {
                                setCurrentRoute("explore");
                            }}
                        />}
                    />
                    
                    <Route path="/notifications" element={
                        <RouteSetter
                            id="notifications"
                            onMatch={() =>
                            {
                                setCurrentRoute("notifications");
                            }}
                        />}
                    />
                    
                    <Route path="/messages" element={
                        <RouteSetter
                            id="messages"
                            onMatch={() =>
                            {
                                setCurrentRoute("messages");
                            }}
                        />}
                    />
                    
                    <Route path="/settings/profile" element={<ProfileFormModal />} />
                    
                    <Route path="/settings" element={
                        <RouteSetter
                            id="settings"
                            onMatch={() =>
                            {
                                setCurrentRoute("settings");
                            }}
                        />}
                    />

                    <Route path="/recommended" element={
                        <RouteSetter
                            id="recommended"
                            onMatch={() =>
                            {
                                setCurrentRoute("recommended");
                            }}
                        />}
                    />

                    <Route path="/search" element={
                        <GetSearchParams>{
                            (searchParams) =>
                            {
                                return <RouteSetter
                                    id={`search-${searchParams.get("q")}`}
                                    onMatch={() =>
                                    {
                                        setSearchParams(searchParams);
                                        setCurrentRoute("search");
                                    }}
                                />;
                            }
                        }</GetSearchParams>}
                    />

                    <Route path="/hashtag/:tag" element={
                        <GetHashtag>{
                            (searchParams) =>
                            {
                                return <RouteSetter
                                    id={`hashtag-${searchParams.get("q")}`}
                                    onMatch={() =>
                                    {
                                        setSearchParams(searchParams);
                                        setCurrentRoute("hashtag");
                                    }}
                                />;
                            }
                        }</GetHashtag>}
                    />

                    <Route path="/compose/cheep/*" element={<CheepEditorModal />} />

                    <Route path="/:userHandle/status/:cheepId/photo/:photoIndex/*" element={
                        <GetHandle>{
                            (userHandle) =>
                            {
                                return <GetCheepId>{
                                    (cheepId) =>
                                    {
                                        return <GetPhotoIndex>{
                                            (photoIndex) =>
                                            {
                                                return <CheepGalleryModal userHandle={userHandle} cheepId={cheepId} photoIndex={photoIndex} />;
                                            }
                                        }</GetPhotoIndex>
                                    }
                                }</GetCheepId>;
                            }
                        }</GetHandle>}
                    />

                    <Route path="/:userHandle/status/:cheepId/likes" element={
                        <GetCheepId>{
                            (cheepId) =>
                            {
                                return <RouteSetter
                                    id={`cheep-${cheepId}-likes`}
                                    onMatch={() =>
                                    {
                                        setCheepId(cheepId);
                                        setCurrentRoute("usersLike");
                                    }}
                                />;
                            }
                        }</GetCheepId>}
                    />

                    <Route path="/:userHandle/status/:cheepId/with-comments" element={
                        <GetCheepId>{
                            (cheepId) =>
                            {
                                return <RouteSetter
                                    id={`cheep-${cheepId}-with-comments`}
                                    onMatch={() =>
                                    {
                                        setCheepId(cheepId);
                                        setCurrentRoute("withComments");
                                    }}
                                />;
                            }
                        }</GetCheepId>} 
                    />
                    
                    <Route path="/:userHandle/status/:cheepId/recheeps" element={
                        <GetCheepId>{
                            (cheepId) =>
                            {
                                return <RouteSetter
                                    id={`cheep-${cheepId}-recheeps`}
                                    onMatch={() =>
                                    {
                                        setCheepId(cheepId);
                                        setCurrentRoute("recheeps");
                                    }}
                                />;
                            }
                        }</GetCheepId>}
                    />
                    
                    <Route path="/:userHandle/status/:cheepId/*" element={
                        <GetCheepId>{
                            (cheepId) =>
                            {
                                return <RouteSetter
                                    id={`cheep-${cheepId}`}
                                    onMatch={() =>
                                    {
                                        setCheepId(cheepId);
                                        setCurrentRoute("cheep");
                                    }}
                                />;
                            }
                        }</GetCheepId>}
                    />

                    <Route path="/:userHandle/*" element={
                        <GetHandle>{
                            (userHandle) =>
                            {
                                return <RouteSetter
                                    id={userHandle}
                                    onMatch={() =>
                                    {
                                        setUserHandle(userHandle);
                                        setCurrentRoute("profile");
                                    }}
                                />
                            }
                        }</GetHandle>}
                    />
                </Routes>
            </div>

            <StatusModal id="sparrow-status-modal" />

            {state.recheepMenu ?
                <RecheepMenu /> :
                null
            }

            {state.moreOptionsMenu ?
                <CheepOptionsMenu /> :
                null
            }

            {state.accountMenu ?
                <AccountMenu /> :
                null
            }

            {state.closeConfirmation.open ?
                <CloseConfirmation /> :
                null
            }

            {state.unfollowConfirmation.open ?
                <UnfollowConfirmation /> :
                null
            }
        </div>
    </StateContext.Provider>;
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

interface GetHashtagProps
{
    children(searchParams: URLSearchParams): React.ReactNode;
}

const GetHashtag: React.FunctionComponent<GetHashtagProps> = (props) =>
{
    const { tag } = useParams();

    return <>{props.children(new URLSearchParams(`?q=${tag}`))}</>
};

export default Sparrow;