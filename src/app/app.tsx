import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Welcome from "../pages/welcome";
import SessionData from "../session_data";
import SessionContext from "../session_context";
import Signup from "../pages/signup/";

import "./app.scss";

const App: React.FunctionComponent = () =>
{
    const [ userSession, setUserSession ] = useState<SessionData>({
        logged: false,
        user: {
            handle: "",
            name: "",
            picture: ""
        }
    });

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
            <Route path="/" element={<Welcome />} />
            <Route path="/signup" element={<Signup />} />
        </Routes>
    </SessionContext.Provider>;
};

export default App;