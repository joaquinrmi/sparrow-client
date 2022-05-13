import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NavigationContext from "../../navigation_context";

export interface Props
{
    children?: React.ReactNode;
}

const NavigationController: React.FunctionComponent<Props> = (props) =>
{
    const [ navigation, setNavigation ] = useState({
        navigate: false,
        to: "/"
    });

    let content: any;
    if(navigation.navigate)
    {
        content = <Routes>
            <Route path={navigation.to} element={
                <>
                    { setNavigation({ navigate: false, to: "/" })}
                </>
            } />

            <Route path="/*" element={<Navigate to={navigation.to} />} />
        </Routes>;
    }
    else
    {
        content = props.children;
    }

    return <NavigationContext.Provider value={{
        goTo: (path: string) =>
        {
            setNavigation({
                navigate: true,
                to: path
            });
        }
    }}>
        {content}
    </NavigationContext.Provider>
};

export default NavigationController;