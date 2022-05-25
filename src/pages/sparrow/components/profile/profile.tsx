import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Button, { ButtonStyle } from "../../../../components/button";
import Loading from "../../../../components/loading";
import CheepList from "../../../../components/cheep_list";

import ProfileData from "../../profile_data";
import MONTHS from "../../../../months";

import "./profile.scss";
import ProfileNavigation from "../profile_navigation";

export interface Props
{
    handle: string;
}

const Profile: React.FunctionComponent<Props> = (props) =>
{
    const [ profileData, setProfileData ] = useState<ProfileData>({
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
    });

    useEffect(() =>
    {
        setTimeout(() =>
        {
            setProfileData({
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
    if(profileData.handle.length === 0)
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
                        {profileData.name}
                    </span>

                    <span className="user-handle">
                        @{profileData.handle}
                    </span>
                </div>

                {profileData.description.length > 0 ? <div className="description">
                    {profileData.description}
                </div> : null}

                <div className="bottom-information">
                    <div className="extra-information">
                        {profileData.location.length > 0 ? <ShortInfo icon="location-dot">{profileData.location}</ShortInfo> : null}
                        {profileData.birthdate !== undefined ? <ShortInfo icon="cake-candles">Fecha de nacimiento: {profileData.birthdate.getDate()} de {MONTHS[profileData.birthdate.getMonth()]} de {profileData.birthdate.getFullYear()}</ShortInfo> : null}
                        {profileData.joinDate !== undefined ? <ShortInfo icon="calendar-days">Se unió en {MONTHS[profileData.joinDate.getMonth()]} de {profileData.joinDate.getFullYear()}</ShortInfo> : null}
                    </div>

                    <div className="counters">
                        <div className="counter-container">
                            <span className="ammount">
                                {profileData.followingCount}
                            </span>

                            <span className="label">
                                Siguiendo
                            </span>
                        </div>

                        <div className="counter-container">
                            <span className="ammount">
                                {profileData.followersCount}
                            </span>

                            <span className="label">
                                Seguidores
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <ProfileNavigation userHandle={profileData.handle} />

            <Routes>
                <Route path="/" element={<CheepList arguments={{
                    userHandle: profileData.handle,
                    responses: false
                }} />} />
                <Route path="/with-replies" element={<CheepList arguments={{
                    userHandle: profileData.handle,
                    responses: true
                }} />} />
                <Route path="/media" element={<CheepList arguments={{
                    userHandle: profileData.handle,
                    onlyGallery: true
                }} />} />
                <Route path="/likes" element={<CheepList arguments={{
                    userHandle: profileData.handle,
                }} />} />
            </Routes>
        </>;
    }

    return <>
        <div className="top-information">
            {
                profileData.handle.length === 0 ?
                <>
                    <span className="title">
                        Perfil
                    </span>
                </> :
                <>
                    <span className="user-name">
                        {profileData.name}
                    </span>

                    <span className="cheep-count">
                        {profileData.cheepCount} Cheeps
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