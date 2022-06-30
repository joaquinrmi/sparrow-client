import React, { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Router from "../../../../components/router";
import RouteSetter from "../../../../components/route_setter";
import StateContext from "../../state_context";
import GetHandle from "../get_handle";
import Recommended from "./components/recommended";
import SearchBar from "./components/search_bar";
import UserGallery from "./components/user_gallery/user_gallery";

import "./main_aside.scss";

const MainAside: React.FunctionComponent = (props) =>
{
    const [ state, stateManager ] = useContext(StateContext);

    useEffect(
        () =>
        {
            const element = document.querySelector(".main-aside") as HTMLDivElement;
            const separator = document.querySelector(".aside-separator") as HTMLDivElement;
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
        []
    );

    return <>
        <div className="aside-separator"></div>

        <aside className="main-aside">
            <Router
                currentRoute={state.location.mainAsideSearch.currentRoute}
                routes={{
                    mainAsideNone: <></>,
                    mainAsideSearch: <SearchBar id="main-search-bar" />,
                }}
            />

            <Router
                currentRoute={state.location.mainAsideGallery.currentRoute}
                routes={{
                    mainAsideNone: <></>,
                    mainAsideGallery: <UserGallery userHandle={state.mainAside.userHandle} />,
                }}
            />

            <Recommended />

            <div className="links-container">
                <ul>
                    <li><a href="https://joaquinrmi.github.io/porfolio/">Porfolio</a></li>
                    <li><a href="https://www.linkedin.com/in/joaquin-ruaimi-3381a1201/">LinkedIn</a></li>
                    <li><a href="https://github.com/joaquinrmi">Github</a></li>
                    <li><a href="https://github.com/joaquinrmi/sparrow-client">Repositorio (front-end)</a></li>
                    <li><a href="https://github.com/joaquinrmi/sparrow-server">Repositorio (back-end)</a></li>
                </ul>
            </div>

            <Routes>
                <Route
                    path="/search"
                    element={<RouteSetter
                        id={`aside-none`}
                        onMatch={() =>
                        {
                            stateManager.navigate("mainAsideSearch", "mainAsideNone");
                        }}
                    />}
                />
                
                <Route
                    path="/*"
                    element={<RouteSetter id={`aside-search`}
                        onMatch={() =>
                        {
                            stateManager.navigate("mainAsideSearch", "mainAsideSearch");
                        }}
                    />}
                />
            </Routes>

            <Routes>
                <Route
                    path="/search/*"
                    element={<RouteSetter
                        id={`aside-none`}
                        onMatch={() =>
                        {
                            stateManager.navigate("mainAsideGallery", "mainAsideNone");
                        }}
                    />}
                />

                <Route
                    path="/home/*"
                    element={<RouteSetter
                        id={`aside-none`}
                        onMatch={() =>
                        {
                            stateManager.navigate("mainAsideGallery", "mainAsideNone");
                        }}
                    />}
                />

                <Route
                    path="/explore/*"
                    element={<RouteSetter
                        id={`aside-none`}
                        onMatch={() =>
                        {
                            stateManager.navigate("mainAsideGallery", "mainAsideNone");
                        }}
                    />}
                />

                <Route
                    path="/notifications/*"
                    element={<RouteSetter
                        id={`aside-none`}
                        onMatch={() =>
                        {
                            stateManager.navigate("mainAsideGallery", "mainAsideNone");
                        }}
                    />}
                />

                <Route
                    path="/messages/*"
                    element={<RouteSetter
                        id={`aside-none`}
                        onMatch={() =>
                        {
                            stateManager.navigate("mainAsideGallery", "mainAsideNone");
                        }}
                    />}
                />

                <Route path="/settings/profile" element={<></>} />

                <Route
                    path="/settings/*"
                    element={<RouteSetter
                        id={`aside-none`}
                        onMatch={() =>
                        {
                            stateManager.navigate("mainAsideGallery", "mainAsideNone");
                        }}
                    />}
                />

                <Route path="/compose/*" element={<></>} />

                <Route 
                    path="/:userHandle/*"
                    element={<GetHandle>{
                        (userHandle) =>
                        {
                            return <RouteSetter
                                id={`aside-${userHandle}`}
                                onMatch={() =>
                                {
                                    stateManager.setMainAsideUserHandle(userHandle);
                                    stateManager.navigate("mainAsideGallery", "mainAsideGallery");
                                }}
                            />;
                        }
                    }</GetHandle>}
                />
            </Routes>
        </aside>
    </>;
};

export default MainAside;