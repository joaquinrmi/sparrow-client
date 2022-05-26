import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Button, { ButtonStyle } from "../../../../components/button";
import Loading from "../../../../components/loading";
import CheepList from "../../../../components/cheep_list";
import ProfileNavigation from "../profile_navigation";

import ProfileData from "../../profile_data";
import MONTHS from "../../../../months";

import "./profile.scss";

export interface Props
{
    handle: string;
    profileData: ProfileData;
    setProfileData(profileData: ProfileData): void;
}

const Profile: React.FunctionComponent<Props> = (props) =>
{
    useEffect(() =>
    {
        setTimeout(() =>
        {
            props.setProfileData({
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
    if(props.profileData.handle.length === 0)
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
                        {props.profileData.name}
                    </span>

                    <span className="user-handle">
                        @{props.profileData.handle}
                    </span>
                </div>

                {props.profileData.description.length > 0 ? <div className="description">
                    {props.profileData.description}
                </div> : null}

                <div className="bottom-information">
                    <div className="extra-information">
                        {props.profileData.location.length > 0 ? <ShortInfo icon="location-dot">{props.profileData.location}</ShortInfo> : null}
                        {props.profileData.birthdate !== undefined ? <ShortInfo icon="cake-candles">Fecha de nacimiento: {props.profileData.birthdate.getDate()} de {MONTHS[props.profileData.birthdate.getMonth()]} de {props.profileData.birthdate.getFullYear()}</ShortInfo> : null}
                        {props.profileData.joinDate !== undefined ? <ShortInfo icon="calendar-days">Se unió en {MONTHS[props.profileData.joinDate.getMonth()]} de {props.profileData.joinDate.getFullYear()}</ShortInfo> : null}
                    </div>

                    <div className="counters">
                        <div className="counter-container">
                            <span className="ammount">
                                {props.profileData.followingCount}
                            </span>

                            <span className="label">
                                Siguiendo
                            </span>
                        </div>

                        <div className="counter-container">
                            <span className="ammount">
                                {props.profileData.followersCount}
                            </span>

                            <span className="label">
                                Seguidores
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <ProfileNavigation userHandle={props.profileData.handle} />

            <Routes>
                <Route path="/" element={<CheepList arguments={{
                    userHandle: props.profileData.handle,
                    responses: false
                }} />} />
                <Route path="/with-replies" element={<CheepList arguments={{
                    userHandle: props.profileData.handle,
                    responses: true
                }} />} />
                <Route path="/media" element={<CheepList arguments={{
                    userHandle: props.profileData.handle,
                    onlyGallery: true
                }} />} />
                <Route path="/likes" element={<CheepList arguments={{
                    userHandle: props.profileData.handle,
                }} />} />
            </Routes>
        </>;
    }

    return <>
        <div className="top-information">
            {
                props.profileData.handle.length === 0 ?
                <>
                    <span className="title">
                        Perfil
                    </span>
                </> :
                <>
                    <span className="user-name">
                        {props.profileData.name}
                    </span>

                    <span className="cheep-count">
                        {props.profileData.cheepCount} Cheeps
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