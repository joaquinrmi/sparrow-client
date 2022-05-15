import React, { MouseEventHandler } from "react";
import { useNavigate } from "react-router-dom";

import "./button.scss";

export interface Props
{
    children: React.ReactNode;
    stylePreset: ButtonStyle;
    disabled?: boolean;

    id?: string;
    to?: string;

    onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FunctionComponent<Props> = (props) =>
{
    let navigate = useNavigate();
    let buttonClass = `button-standar ${props.stylePreset} ${props.disabled ? "disable" : ""}`;

    let onClick: MouseEventHandler<HTMLButtonElement>;
    if(props.to !== undefined)
    {
        onClick = (ev) =>
        {
            if((ev.target as HTMLButtonElement).classList.contains("disable"))
            {
                return;
            }

            if(props.onClick !== undefined)
            {
                props.onClick(ev);
            }

            navigate(props.to as string);
        };
    }
    else if(props.onClick !== undefined)
    {
        onClick = (ev) =>
        {
            if((ev.target as HTMLButtonElement).classList.contains("disable"))
            {
                return;
            }

            if(props.onClick)
            {
                props.onClick(ev);
            }
        };
    }
    else
    {
        onClick = () =>
        {};
    }

    return <button
        onClick={onClick}
        id={props.id}
        className={buttonClass}
    >
        <span className="button-text">
            {props.children}
        </span>
    </button>
};

export enum ButtonStyle
{
    White = "white",
    Black = "black",
    Blue = "blue",
    BlueTransparent = "blue-transparent"
}

export default Button;