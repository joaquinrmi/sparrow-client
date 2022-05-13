import React from "react";
import NavigationController from "../components/navigation_controller/";

import Welcome from "../pages/welcome";

import "./app.scss";

const App: React.FunctionComponent = () =>
{
    return <NavigationController>
        <Welcome />
    </NavigationController>;
};

export default App;