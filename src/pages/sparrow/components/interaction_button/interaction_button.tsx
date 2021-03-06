import React from "react";

import "./interaction_button.scss";

export interface Props
{
    id: string;
    color: InteractionColor;
    icon: string;
    counter?: number;
    active?: boolean;
    className?: string;

    onClick?(event: React.MouseEvent<HTMLDivElement>): void;
}

const InteractionButton: React.FunctionComponent<Props> = (props) =>
{
    return <div id={props.id} className={`interaction-button ${props.color} ${props.active ? "active" : ""} ${props.className || ""}`} onClick={props.onClick ? props.onClick : () => {}}>
        <div className="icon-container">
            <i className={`fa-solid fa-${props.icon}`}></i>
        </div>

        {props.counter ? <span className="counter">{props.counter}</span> : null}
    </div>;
};

export enum InteractionColor
{
    Blue = "blue",
    Green = "green",
    Pink = "pink"
}

export default InteractionButton;