import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Button, { ButtonStyle } from "../../../../components/button";
import Loading from "../../../../components/loading";
import CheepList from "../../../../components/cheep_list";
import ProfileNavigation from "../profile_navigation";
import PageHeader from "../../../../components/page_header";

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
    }
};

const Profile: React.FunctionComponent<Props> = (props) =>
{
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

                props.setState.profileData({
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
                <Route path="/" element={<CheepList name="profileCheeps" arguments={{
                    userHandle: props.state.profileData.handle,
                    responses: false
                }} />} />

                <Route path="/with-replies" element={<CheepList name="profileWithReplies" arguments={{
                    userHandle: props.state.profileData.handle,
                    responses: true
                }} />} />

                <Route path="/media" element={<CheepList name="profileMedia" arguments={{
                    userHandle: props.state.profileData.handle,
                    onlyGallery: true
                }} />} />

                <Route path="/likes" element={<CheepList name="profileLikes" arguments={{
                    userHandle: props.state.profileData.handle,
                }} />} />
            </Routes>
        </>;
    }

    return <>
        <PageHeader>
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