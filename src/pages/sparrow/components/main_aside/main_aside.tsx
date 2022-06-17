import React from "react";
import { Route, Routes } from "react-router-dom";
import SearchBar from "./components/search_bar";

import "./main_aside.scss";

const MainAside: React.FunctionComponent = (props) =>
{
    return <aside className="main-aside">
        <Routes>
            <Route path="/search" element={<></>} />
            <Route path="/*" element={<SearchBar id="main-search-bar" />} />
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