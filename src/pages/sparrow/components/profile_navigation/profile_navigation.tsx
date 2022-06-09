import React from "react";
import { Link, useResolvedPath, useMatch } from "react-router-dom";

import "./profile_navigation.scss";

export interface Props
{
    userHandle: string;
}

const ProfileNavigation: React.FunctionComponent<Props> = (props) =>
{
    return <div className="profile-navigation">
        <div className="items-wrapper">
            <NavigationItem to={`/${props.userHandle}`}>Cheeps</NavigationItem>
            <NavigationItem to={`/${props.userHandle}/with-replies`}>Cheeps y respuestas</NavigationItem>
            <NavigationItem to={`/${props.userHandle}/media`}>Fotos y videos</NavigationItem>
            <NavigationItem to={`/${props.userHandle}/likes`}>Me gusta</NavigationItem>
        </div>
    </div>;
};

interface NavigationItemProps
{
    children?: React.ReactNode;
    to: string;
}

const NavigationItem: React.FunctionComponent<NavigationItemProps> = (props) =>
{
    let resolved = useResolvedPath(props.to);
    let match = useMatch({ path: resolved.pathname, end: true });

    return <div className="nav-item">
        <Link to={props.to} className={`nav-button ${match ? "active" : ""}`}>
            <span className="nav-text">
                {props.children}
                
                <div className="color-bar"></div>
            </span>
        </Link>
    </div>;
};

export default ProfileNavigation;