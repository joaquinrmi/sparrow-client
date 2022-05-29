import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Welcome from "../pages/welcome";
import SessionData from "../session_data";
import SessionContext from "../session_context";
import Signup from "../pages/signup/";
import Sparrow from "../pages/sparrow";

import "./app.scss";

const App: React.FunctionComponent = () =>
{
    const [ userSession, setUserSession ] = useState<SessionData>({
        logged: false,
        user: {
            handle: "sparrow",
            name: "",
            picture: ""
        }
    });

    let routes;
    if(userSession.logged)
    {
        routes = <>
            <Route path="/*" element={<Sparrow />} />
        </>;
    }
    else
    {
        routes = <>
            <Route path="/" element={<Welcome />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/*" element={<Navigate to="/" />} />
        </>;
    }

    return <SessionContext.Provider value={{
        ...userSession,
        login: (data) =>
        {
            setUserSession({
                logged: true,
                user: data
            });
        },
        logout: () =>
        {
            setUserSession({
                logged: false,
                user: {
                    handle: "",
                    name: "",
                    picture: ""
                }
            });
        }
    }}>
        <Routes>
            {routes}
        </Routes>
    </SessionContext.Provider>;
};

export default App;