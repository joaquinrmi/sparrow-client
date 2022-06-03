import React from "react";

import "./button_container.scss";

export interface Props
{
    children?: React.ReactNode;
    className?: string;
}

const ButtonContainer: React.FunctionComponent<Props> = (props) =>
{
    return <div className={`standar-button-container ${props.className ? props.className : ""}`}>
        {props.children}
    </div>;
};

export default ButtonContainer;