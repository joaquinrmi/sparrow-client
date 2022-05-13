import React, { MouseEventHandler } from "react";

import "./button.scss";

export interface Props
{
    children: React.ReactNode;
    id?: string;
    stylePreset: ButtonStyle;

    onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FunctionComponent<Props> = (props) =>
{
    let buttonClass = `button-standar ${props.stylePreset}`;

    return <button onClick={props.onClick} id={props.id} className={buttonClass}>
        <span className="button-text">
            {props.children}
        </span>
    </button>;
};

export enum ButtonStyle
{
    White = "white",
    Black = "black",
    Blue = "blue",
    BlueTransparent = "blue-transparent"
}

export default Button;