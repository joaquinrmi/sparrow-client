import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Welcome from "../pages/welcome";
import SessionData from "../session_data";
import SessionContext from "../session_context";
import Signup from "../pages/signup/";
import Login from "../pages/login";
import Sparrow from "../pages/sparrow";
import LoadingPage from "../pages/loading_page";
import restoreSession from "../restore_session";
import UserData from "../user_data";

import "./app.scss";

const App: React.FunctionComponent = () =>
{
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ userSession, setUserSession ] = useState<SessionData>(
        {
            logged: false,
            user:
            {
                handle: "sparrow",
                name: "",
                picture: ""
            }
        }
    );

    useEffect(() =>
    {
        if(loading)
        {
            (async () =>
            {
                let userData: UserData | undefined;
                try
                {
                    userData = await restoreSession();
                }
                catch(err)
                {}

                setLoading(false);

                if(userData)
                {
                    setUserSession(
                        {
                            logged: true,
                            user: userData
                        }
                    );
                }
            })();
        }
    });

    if(loading)
    {
        return <LoadingPage />;
    }

    let routes;
    if(userSession.logged)
    {
        routes = <>
            <Route path="/signup" element={<Navigate to="/" />} />
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/*" element={<Sparrow />} />
        </>;
    }
    else
    {
        routes = <>
            <Route path="/" element={<Welcome />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
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
            setUserSession(
                {
                    logged: false,
                    user: {
                        handle: "",
                        name: "",
                        picture: ""
                    }
                }
            );
        }
    }}>
        <Routes>
            {routes}
        </Routes>
    </SessionContext.Provider>;
};

export default App;