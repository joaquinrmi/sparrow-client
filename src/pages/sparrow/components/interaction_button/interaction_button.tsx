import React from "react";

import "./interaction_button.scss";

export interface Props
{
    color: InteractionColor;
    icon: string;
    counter?: number;
    active?: boolean;
    onClick?(event: React.MouseEvent<HTMLDivElement>): void;
}

const InteractionButton: React.FunctionComponent<Props> = (props) =>
{
    return <div className={`interaction-button ${props.color} ${props.active ? "active" : ""}`} onClick={props.onClick ? props.onClick : () => {}}>
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