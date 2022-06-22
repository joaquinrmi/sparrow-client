import React from "react";
import { Route, Routes } from "react-router-dom";
import GetHandle from "../get_handle";
import SearchBar from "./components/search_bar";
import UserGallery from "./components/user_gallery/user_gallery";

import "./main_aside.scss";

const MainAside: React.FunctionComponent = (props) =>
{
    return <aside className="main-aside">
        <Routes>
            <Route path="/search" element={<></>} />
            <Route path="/*" element={<SearchBar id="main-search-bar" />} />
        </Routes>

        <Routes>
            <Route path="/search/*" element={<></>} />
            <Route path="/home/*" element={<></>} />
            <Route path="/explore/*" element={<></>} />
            <Route path="/notifications/*" element={<></>} />
            <Route path="/messages/*" element={<></>} />
            <Route path="/settings/*" element={<></>} />
            <Route path="/compose/*" element={<></>} />
            <Route path="/:userHandle/*" element={<GetHandle>{
                (userHandle) =>
                {
                    return <UserGallery userHandle={userHandle} />;
                }
            }</GetHandle>} />
        </Routes>

        <div className="links-container">
            <ul>
                <li><a href="https://joaquinrmi.github.io/porfolio/">Porfolio</a></li>
                <li><a href="https://www.linkedin.com/in/joaquin-ruaimi-3381a1201/">LinkedIn</a></li>
                <li><a href="https://github.com/joaquinrmi">Github</a></li>
                <li><a href="https://github.com/joaquinrmi/sparrow-client">Repositorio (front-end)</a></li>
                <li><a href="https://github.com/joaquinrmi/sparrow-server">Repositorio (back-end)</a></li>
            </ul>
        </div>
    </aside>;
};

export default MainAside;