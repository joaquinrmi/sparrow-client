import React from "react";

export interface NavigationOptions
{
    goTo(path: string): void;
}

const NavigationContext = React.createContext<NavigationOptions>({
    goTo: (path: string) =>
    {}
});

export default NavigationContext;