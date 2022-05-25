import React from "react";
import InteractionButton, { InteractionColor } from "../interaction_button";

export interface Props
{
    cheepId: number;
    counter?: number;
    active?: boolean;
}

const LikeButton: React.FunctionComponent<Props> = (props) =>
{
    return <InteractionButton color={InteractionColor.Pink} icon="heart" counter={props.counter} active={props.active} onClick={(event) =>
    {
        event.stopPropagation();
    }} />;
};

export default LikeButton;