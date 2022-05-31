import React, { useEffect } from "react";

export interface Props
{
    onMatch(): void;
}

const RouteSetter: React.FunctionComponent<Props> = (props) =>
{
    useEffect(() =>
    {
        props.onMatch();
    });

    return <></>;
};

export default RouteSetter;