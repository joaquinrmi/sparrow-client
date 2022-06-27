import React, { useEffect } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

import "./navigation_bar.scss";

export interface Props
{
    handle: string;
}

const NavigationBar: React.FunctionComponent<Props> = (props) =>
{
    useEffect(() =>
    {
        const element = document.querySelector(".navigation-bar") as HTMLDivElement;
        const separator = document.querySelector(".navigation-separator") as HTMLDivElement;
        if(element === null || separator === null)
        {
            return;
        }

        let lastScroll = window.scrollY;
        let start = true;
        let finish = false;
        let up = false;
        let down = false;

        const onScroll = () =>
        {
            const box = element.getBoundingClientRect();

            if(box.height < window.innerHeight)
            {
                return;
            }

            if(lastScroll - window.scrollY < 0 && !down && !finish)
            {
                separator.style.height = `${window.scrollY}px`;
                element.style.top = "";
                element.style.position = "relative";

                start = false;
                up = false;
                finish = false;
                down = true;
            }

            if((-box.top) + window.innerHeight >= box.height)
            {
                element.style.top = `${box.top}px`;
                element.style.position = "sticky";

                start = false;
                up = false;
                down = false;
                finish = true;
            }

            if(lastScroll - window.scrollY > 0 && !up && finish)
            {
                separator.style.height = `${window.scrollY - (box.height - window.innerHeight)}px`;
                element.style.top = "";
                element.style.position = "relative";

                start = false;
                down = false;
                finish = false;
                up = true;
            }

            if(box.top > 0 && !start)
            {
                separator.style.height = "0px";
                element.style.position = "sticky";
                element.style.top = `0px`;

                down = false;
                up = false;
                finish = false;
                start = true;
            }

            lastScroll = window.scrollY;
        };

        window.addEventListener("scroll", onScroll);

        return () =>
        {
            window.removeEventListener("scroll", onScroll);
        };
    },
    []);

    return <>
        <div className="navigation-separator"></div>
        
        <div className="navigation-bar">
            <NavigationItem to="/home" icon="house" />

            <NavigationItem to="/explore" icon="hashtag" />

            <NavigationItem to="/notifications" icon="bell" />

            <NavigationItem to="/messages" icon="envelope" />

            <NavigationItem to={`/${props.handle}`} subroutes icon="user" />

            <NavigationItem to="/settings" icon="gear" />

            <NavigationItem to="/compose/cheep" icon="feather" containerClassName="feather" linkClassName="big-blue" />
        </div>
    </>;
};

interface ItemProps
{
    to: string;
    icon: string;
    subroutes?: boolean;
    containerClassName?: string;
    linkClassName?: string;
}

const NavigationItem: React.FunctionComponent<ItemProps> = (props) =>
{
    let path = `${props.to}${props.subroutes ? "/*" : ""}`

    let resolved = useResolvedPath(path);
    let match = useMatch({ path: resolved.pathname, end: true });

    return <div className={`nav-button-container ${props.containerClassName ? props.containerClassName : ""}`}>
        <Link to={props.to} className={`nav-button ${props.linkClassName ? props.linkClassName : ""} ${match ? "active" : ""}`}>
            <i className={`fa-solid fa-${props.icon}`}></i>
        </Link>
    </div>;
};

export default NavigationBar;