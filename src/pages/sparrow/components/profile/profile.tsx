import React, { useContext, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Button, { ButtonStyle } from "../../../../components/button";
import Loading from "../../../../components/loading";
import CheepList from "../../../../components/cheep_list";
import ProfileNavigation from "../profile_navigation";
import PageHeader from "../../../../components/page_header";
import Router from "../../../../components/router";
import RouteSetter from "../../../../components/route_setter";
import ButtonContainer from "../../../../components/button_container";
import FollowButton from "../follow_button";

import MONTHS from "../../../../months";
import SessionContext from "../../../../session_context";
import StateContext from "../../state_context";
import Relations from "./components/relations";

import "./profile.scss";

export interface Props
{
    handle: string;
}

const Profile: React.FunctionComponent<Props> = (props) =>
{
    const [ state, stateManager ] = useContext(StateContext);
    const userSession = useContext(SessionContext);

    const navigate = useNavigate();

    useEffect(() =>
    {
        (async () =>
        {
            const getProfileURL = `${process.env.REACT_APP_SERVER}/api/profile/get?handle=${props.handle}`;

            const response = await fetch(getProfileURL, {
                method: "GET",
                credentials: "include"
            });

            if(response.status === 200)
            {
                const data = await response.json();

                if(data === null)
                {
                    stateManager.setProfileState({
                        handle: undefined,
                        name: "",
                        picture: "",
                        joinDate: new Date(),
                        followingCount: 0,
                        followersCount: 0,
                        cheepCount: 0,
                        following: false
                    });
                }
                else
                {
                    stateManager.setProfileState({
                        handle: data.handle,
                        name: data.name,
                        picture: data.picture,
                        banner: data.banner,
                        description: data.description,
                        joinDate: new Date(data.joinDate),
                        birthdate: data.birthdate === undefined ? undefined : new Date(data.birthdate),
                        location: data.location,
                        website: data.website,
                        followingCount: data.followingCount,
                        followersCount: data.followerCount,
                        cheepCount: data.cheepCount,
                        following: data.following
                    });
                }
            }
        })();
    },
    [ props.handle ]);

    let content: React.ReactNode;
    if(state.profile.data.handle !== undefined && (state.profile.data.handle.length === 0 || props.handle !== state.profile.data.handle))
    {
        content = <div className="loading-container">
            <Loading />
        </div>;
    }
    else if(state.profile.data.handle === undefined)
    {
        content = <>
            <header className="profile-header">
                <div className="banner-container">
                    <div className="banner"></div>
                </div>

                <div className="picture-container">
                    <div className="picture"></div>
                </div>

                <div className="options-container"></div>
            </header>

            <section className="user-information">
                <div className="user-id">
                    <span className="user-name">
                        @{props.handle}
                    </span>
                </div>
            </section>

            <section className="not-found">
                <div className="message-container">
                    <span className="message">
                        Esta cuenta no existe
                    </span>

                    <span className="extra">
                        Prueba intentando con otra.
                    </span>
                </div>
            </section>
        </>;
    }
    else
    {
        content = <>
            <header className="profile-header">
                <div className="banner-container">
                    <div className="banner">
                        {state.profile.data.banner !== undefined ? <img src={state.profile.data.banner} alt="Imagen de portada" /> : null}
                    </div>
                </div>

                <div className="picture-container">
                    <div className="picture">
                        <img src={state.profile.data.picture} alt="" />
                    </div>
                </div>

                <div className="options-container">
                    <ButtonContainer>
                        {userSession.user.handle === props.handle ?
                            <Button className="follow-button" stylePreset={ButtonStyle.White} onClick={() =>
                            {
                                navigate("/settings/profile");
                            }}>
                                Editar perfil
                            </Button> :

                            <FollowButton
                                id="profile-follow-button"
                                following={state.profile.data.following}
                                userHandle={state.profile.data.handle}
                                onFollow={() =>
                                {
                                    stateManager.setProfileState({
                                        ...state.profile.data,
                                        following: true
                                    });
                                }}
                                onUnfollow={() =>
                                {
                                    stateManager.setProfileState({
                                        ...state.profile.data,
                                        following: false
                                    });
                                }}
                            />
                        }
                    </ButtonContainer>
                </div>
            </header>

            <section className="user-information">
                <div className="user-id">
                    <span className="user-name">
                        {state.profile.data.name}
                    </span>

                    <span className="user-handle">
                        @{state.profile.data.handle}
                    </span>
                </div>

                {state.profile.data.description !== undefined ? <div className="description">
                    {state.profile.data.description}
                </div> : null}

                <div className="bottom-information">
                    <div className="extra-information">
                        {state.profile.data.location !== undefined ? <ShortInfo icon="location-dot">{state.profile.data.location}</ShortInfo> : null}

                        {state.profile.data.birthdate !== undefined ? <ShortInfo icon="cake-candles">Fecha de nacimiento: {state.profile.data.birthdate.getDate()} de {MONTHS[state.profile.data.birthdate.getMonth()]} de {state.profile.data.birthdate.getFullYear()}</ShortInfo> : null}

                        {state.profile.data.joinDate !== undefined ? <ShortInfo icon="calendar-days">Se unió en {MONTHS[state.profile.data.joinDate.getMonth()]} de {state.profile.data.joinDate.getFullYear()}</ShortInfo> : null}
                    </div>

                    <div className="counters">
                        <Link to={`/${state.profile.data.handle}/following`} className="counter-container">
                            <span className="ammount">
                                {state.profile.data.followingCount}
                            </span>

                            <span className="label">
                                &nbsp;Siguiendo
                            </span>
                        </Link>

                        <Link to={`/${state.profile.data.handle}/followers`} className="counter-container">
                            <span className="ammount">
                                {state.profile.data.followersCount}
                            </span>

                            <span className="label">
                                &nbsp;{state.profile.data.followersCount === 1 ? "Seguidor" : "Seguidores"}
                            </span>
                        </Link>
                    </div>
                </div>
            </section>

            <ProfileNavigation userHandle={state.profile.data.handle} />

            <Router currentRoute={state.location["innerProfile"].currentRoute} routes={{
                cheeps: <CheepList name="profileCheeps" arguments={{
                    userHandle: state.profile.data.handle,
                    responses: false
                }} />,

                withReplies: <CheepList name="profileWithReplies" arguments={{
                    userHandle: state.profile.data.handle,
                    responses: true
                }} />,

                media: <CheepList name="profileMedia" arguments={{
                    userHandle: state.profile.data.handle,
                    onlyGallery: true
                }} />,

                likes: <CheepList name="profileLikes" arguments={{
                    userHandle: state.profile.data.handle,
                    likes: true
                }} />,
            }} />

            <Routes>
                <Route path="/:userHandle" element={<RouteSetter id="cheeps" onMatch={() =>
                {
                    stateManager.navigate("innerProfile", "cheeps");
                }} />} />

                <Route path="/:userHandle/with-replies" element={<RouteSetter id="withReplies" onMatch={() =>
                {
                    stateManager.navigate("innerProfile", "withReplies");
                }} />} />

                <Route path="/:userHandle/media" element={<RouteSetter id="media" onMatch={() =>
                {
                    stateManager.navigate("innerProfile", "media");
                }} />} />

                <Route path="/:userHandle/likes" element={<RouteSetter id="likes" onMatch={() =>
                {
                    stateManager.navigate("innerProfile", "likes");
                }} />} />
            </Routes>
        </>;
    }

    return <>
        <Router currentRoute={state.location["profile"].currentRoute} routes={{
            main: <>
                <PageHeader>
                    {
                        state.profile.data.handle === undefined || (state.profile.data.handle !== undefined && state.profile.data.handle.length === 0) ?
                        <>
                            <span className="title">
                                Perfil
                            </span>
                        </> :
                        <>
                            <span className="user-name">
                                {state.profile.data.name}
                            </span>

                            <span className="cheep-count">
                                {state.profile.data.cheepCount} Cheeps
                            </span>
                        </>
                    }
                </PageHeader>

                {content}
            </>,

            relations: <Relations handle={state.profile.data.handle || ""} name={state.profile.data.name} />
        }} />

        <Routes>
            <Route path="/compose/cheep" element={<></>} />

            <Route path="/:userHandle/following" element={<RouteSetter id="following" onMatch={() =>
            {
                stateManager.navigate("profile", "relations");
            }} />} />

            <Route path="/:userHandle/followers" element={<RouteSetter id="followers" onMatch={() =>
            {
                stateManager.navigate("profile", "relations");
            }} />} />

            <Route path="/:userHandle/*" element={<RouteSetter id="main" onMatch={() =>
            {
                stateManager.navigate("profile", "main");
            }} />} />
        </Routes>
    </>;
};

interface ShortInfoProps
{
    children?: React.ReactNode;
    icon: string;
}

const ShortInfo: React.FunctionComponent<ShortInfoProps> = (props) =>
{
    return <span className="short-info">
        <i className={`fa-solid fa-${props.icon}`}></i>
        <span>{props.children}</span>
    </span>;
};

export default Profile;