import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

import "./navigation_bar.scss";

export interface Props
{
    handle: string;
}

const NavigationBar: React.FunctionComponent<Props> = (props) =>
{
    return <div className="navigation-bar">
        <NavigationItem to="/home" icon="house" />

        <NavigationItem to="/explore" icon="hashtag" />

        <NavigationItem to="/notifications" icon="bell" />

        <NavigationItem to="/messages" icon="envelope" />

        <NavigationItem to={`/${props.handle}`} icon="user" />

        <NavigationItem to="/settings" icon="gear" />

        <NavigationItem to="/compose/cheep" icon="feather" containerClassName="feather" linkClassName="big-blue" />
    </div>;
};

interface ItemProps
{
    to: string;
    icon: string;
    containerClassName?: string;
    linkClassName?: string;
}

const NavigationItem: React.FunctionComponent<ItemProps> = (props) =>
{
    let resolved = useResolvedPath(props.to);
    let match = useMatch({ path: resolved.pathname, end: true });

    return <div className={`nav-button-container ${props.containerClassName ? props.containerClassName : ""}`}>
        <Link to={props.to} className={`nav-button ${props.linkClassName ? props.linkClassName : ""} ${match ? "active" : ""}`}>
            <i className={`fa-solid fa-${props.icon}`}></i>
        </Link>
    </div>;
};

export default NavigationBar;