import React from "react";

export interface Props
{
    routes: Routes;
    currentRoute: string;
}

const Router: React.FunctionComponent<Props> = (props) =>
{
    if(props.routes[props.currentRoute])
    {
        return <>{props.routes[props.currentRoute]}</>
    }

    return <></>;
};

export type Routes = {
    [Key: string]: React.ReactNode;
};

export default Router;
