import React from "react";
import UserSession from "./user_session";

const SessionContext = React.createContext<UserSession>(
    {
        logged: false,
        user:
        {
            handle: "",
            name: "",
            picture: ""
        },

        login: (data) =>
        {},

        logout: () =>
        {}
    }
);

export default SessionContext;