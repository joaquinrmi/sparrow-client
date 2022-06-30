import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export interface Props
{
    path: string;
    action(): void;
}

const NavigateTo: React.FunctionComponent<Props> = (props) =>
{
    const navigate = useNavigate();

    useEffect(
        () =>
        {
            navigate(props.path);
            props.action();
        }
    );

    return <></>;
}

export default NavigateTo;