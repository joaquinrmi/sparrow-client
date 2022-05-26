import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Button, { ButtonStyle } from "../../../../components/button";
import Loading from "../../../../components/loading";
import CheepList, { CheepListStatus } from "../../../../components/cheep_list";
import ProfileNavigation from "../profile_navigation";

import ProfileData from "../../profile_data";
import MONTHS from "../../../../months";
import SetState from "../../../../set_state";

import "./profile.scss";

export interface Props
{
    handle: string;
    state: ProfileState;
    setState: SetProfileState;
}

export interface ProfileState
{
    profileData: ProfileData;
    cheepsStatus: CheepListStatus;
    withRepliesStatus: CheepListStatus;
    mediaStatus: CheepListStatus;
    likesStatus: CheepListStatus;
}

export type SetProfileState = SetState<ProfileState>;

export const DEFAULT_PROFILE_STATE: ProfileState = {
    profileData: {
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
    },

    cheepsStatus: {
        loaded: false,
        cheeps: []
    },

    withRepliesStatus: {
        loaded: false,
        cheeps: []
    },

    mediaStatus: {
        loaded: false,
        cheeps: []
    },

    likesStatus: {
        loaded: false,
        cheeps: []
    },
};

const Profile: React.FunctionComponent<Props> = (props) =>
{
    useEffect(() =>
    {
        setTimeout(() =>
        {
            props.setState.profileData({
                handle: "sparrow",
                name: "Sparrow",
                picture: "",
                banner: "",
                description: "Una copia barata de Twitter.",
                location: "Argentina",
                birthdate: new Date(),
                joinDate: new Date(),
                website: "https://joaquinrmi.github.io/porfolio/",
                cheepCount: 104,
                followersCount: 0,
                followingCount: 0
            });
        },
        2000);
    },
    [ props.handle ]);

    let content: React.ReactNode;
    if(props.state.profileData.handle.length === 0 || props.handle !== props.state.profileData.handle)
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
                    <div className="picture"></div>
                </div>

                <div className="options-container">
                    <div className="follow-button-container">
                        <Button className="follow-button" stylePreset={ButtonStyle.Black}>
                            Seguir
                        </Button>
                    </div>
                </div>
            </header>

            <section className="user-information">
                <div className="user-id">
                    <span className="user-name">
                        {props.state.profileData.name}
                    </span>

                    <span className="user-handle">
                        @{props.state.profileData.handle}
                    </span>
                </div>

                {props.state.profileData.description.length > 0 ? <div className="description">
                    {props.state.profileData.description}
                </div> : null}

                <div className="bottom-information">
                    <div className="extra-information">
                        {props.state.profileData.location.length > 0 ? <ShortInfo icon="location-dot">{props.state.profileData.location}</ShortInfo> : null}
                        {props.state.profileData.birthdate !== undefined ? <ShortInfo icon="cake-candles">Fecha de nacimiento: {props.state.profileData.birthdate.getDate()} de {MONTHS[props.state.profileData.birthdate.getMonth()]} de {props.state.profileData.birthdate.getFullYear()}</ShortInfo> : null}
                        {props.state.profileData.joinDate !== undefined ? <ShortInfo icon="calendar-days">Se unió en {MONTHS[props.state.profileData.joinDate.getMonth()]} de {props.state.profileData.joinDate.getFullYear()}</ShortInfo> : null}
                    </div>

                    <div className="counters">
                        <div className="counter-container">
                            <span className="ammount">
                                {props.state.profileData.followingCount}
                            </span>

                            <span className="label">
                                Siguiendo
                            </span>
                        </div>

                        <div className="counter-container">
                            <span className="ammount">
                                {props.state.profileData.followersCount}
                            </span>

                            <span className="label">
                                Seguidores
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <ProfileNavigation userHandle={props.state.profileData.handle} />

            <Routes>
                <Route path="/" element={<CheepList arguments={{
                    userHandle: props.state.profileData.handle,
                    responses: false
                }} dataStatus={props.state.cheepsStatus} setDataStatus={props.setState.cheepsStatus} />} />

                <Route path="/with-replies" element={<CheepList arguments={{
                    userHandle: props.state.profileData.handle,
                    responses: true
                }} dataStatus={props.state.withRepliesStatus} setDataStatus={props.setState.withRepliesStatus} />} />

                <Route path="/media" element={<CheepList arguments={{
                    userHandle: props.state.profileData.handle,
                    onlyGallery: true
                }} dataStatus={props.state.mediaStatus} setDataStatus={props.setState.mediaStatus} />} />

                <Route path="/likes" element={<CheepList arguments={{
                    userHandle: props.state.profileData.handle,
                }} dataStatus={props.state.likesStatus} setDataStatus={props.setState.likesStatus} />} />
            </Routes>
        </>;
    }

    return <>
        <div className="top-information">
            {
                props.state.profileData.handle.length === 0 ?
                <>
                    <span className="title">
                        Perfil
                    </span>
                </> :
                <>
                    <span className="user-name">
                        {props.state.profileData.name}
                    </span>

                    <span className="cheep-count">
                        {props.state.profileData.cheepCount} Cheeps
                    </span>
                </>
            }
        </div>

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