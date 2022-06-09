import React, { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Button, { ButtonStyle } from "../../../../components/button";
import Loading from "../../../../components/loading";
import CheepList from "../../../../components/cheep_list";
import ProfileNavigation from "../profile_navigation";
import PageHeader from "../../../../components/page_header";
import Router from "../../../../components/router";
import RouteSetter from "../../../../components/route_setter";
import ButtonContainer from "../../../../components/button_container";

import MONTHS from "../../../../months";
import SessionContext from "../../../../session_context";
import StateContext from "../../state_context";

import "./profile.scss";

export interface Props
{
    handle: string;
}

const Profile: React.FunctionComponent<Props> = (props) =>
{
    const [ state, stateManager ] = useContext(StateContext);
    const userSession = useContext(SessionContext);

    useEffect(() =>
    {
        (async () =>
        {
            const getProfileURL = `${process.env.REACT_APP_SERVER}/api/profile/get?handle=${props.handle}`;

            const response = await fetch(getProfileURL, {
                method: "GET"
            });

            if(response.status === 200)
            {
                const data = await response.json();

                stateManager.setProfileState({
                    handle: data.handle,
                    name: data.name,
                    picture: data.picture,
                    banner: data.banner,
                    description: data.description || "",
                    location: data.location || "",
                    birthdate: new Date(data.birthdate),
                    joinDate: new Date(data.joinDate),
                    website: data.website,
                    cheepCount: data.cheepCount,
                    followersCount: data.followers,
                    followingCount: data.following
                });
            }
        })();
    },
    [ props.handle ]);

    let content: React.ReactNode;
    if(state.profile.data.handle.length === 0 || props.handle !== state.profile.data.handle)
    {
        content = <div className="loading-container">
            <Loading />
        </div>;
    }
    else
    {
        content = <>
            <header className="profile-header">
                <div className="banner-container"></div>

                <div className="picture-container">
                    <div className="picture">
                        <img src={state.profile.data.picture} alt="" />
                    </div>
                </div>

                <div className="options-container">
                    <ButtonContainer>
                        {userSession.user.handle === props.handle ?
                            <Button className="follow-button" stylePreset={ButtonStyle.White}>
                                Editar perfil
                            </Button> :

                            <Button className="follow-button" stylePreset={ButtonStyle.Black}>
                                Seguir
                            </Button>
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

                {state.profile.data.description.length > 0 ? <div className="description">
                    {state.profile.data.description}
                </div> : null}

                <div className="bottom-information">
                    <div className="extra-information">
                        {state.profile.data.location.length > 0 ? <ShortInfo icon="location-dot">{state.profile.data.location}</ShortInfo> : null}
                        {state.profile.data.birthdate !== undefined ? <ShortInfo icon="cake-candles">Fecha de nacimiento: {state.profile.data.birthdate.getDate()} de {MONTHS[state.profile.data.birthdate.getMonth()]} de {state.profile.data.birthdate.getFullYear()}</ShortInfo> : null}
                        {state.profile.data.joinDate !== undefined ? <ShortInfo icon="calendar-days">Se unió en {MONTHS[state.profile.data.joinDate.getMonth()]} de {state.profile.data.joinDate.getFullYear()}</ShortInfo> : null}
                    </div>

                    <div className="counters">
                        <div className="counter-container">
                            <span className="ammount">
                                {state.profile.data.followingCount}
                            </span>

                            <span className="label">
                                Siguiendo
                            </span>
                        </div>

                        <div className="counter-container">
                            <span className="ammount">
                                {state.profile.data.followersCount}
                            </span>

                            <span className="label">
                                Seguidores
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <ProfileNavigation userHandle={state.profile.data.handle} />

            <Router currentRoute={state.location["profile"].currentRoute} routes={{
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
                }} />
            }} />

            <Routes>
                <Route path="/:userHandle/" element={<RouteSetter id="cheeps" onMatch={() =>
                {
                    stateManager.navigate("profile", "cheeps");
                }} />} />

                <Route path="/:userHandle/with-replies" element={<RouteSetter id="withReplies" onMatch={() =>
                {
                    stateManager.navigate("profile", "withReplies");
                }} />} />

                <Route path="/:userHandle/media" element={<RouteSetter id="media" onMatch={() =>
                {
                    stateManager.navigate("profile", "media");
                }} />} />

                <Route path="/:userHandle/likes" element={<RouteSetter id="likes" onMatch={() =>
                {
                    stateManager.navigate("profile", "likes");
                }} />} />
            </Routes>
        </>;
    }

    return <>
        <PageHeader>
            {
                state.profile.data.handle.length === 0 ?
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