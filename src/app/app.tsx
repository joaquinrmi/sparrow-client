import React, { useState } from "react";

import Welcome from "../pages/welcome";
import SessionData from "../session_data";

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

    return <Welcome />;
};

export default App;