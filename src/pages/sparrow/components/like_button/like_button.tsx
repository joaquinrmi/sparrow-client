import React  from "react";
import InteractionButton, { InteractionColor } from "../interaction_button";

export interface Props
{
    cheepId: number;
    counter?: number;
    active?: boolean;

    onClick?(): void;
}

const LikeButton: React.FunctionComponent<Props> = (props) =>
{
    return <InteractionButton color={InteractionColor.Pink} icon="heart" counter={props.counter} active={props.active} onClick={async (event) =>
    {
        event.stopPropagation();

        if(props.onClick)
        {
            props.onClick();
        }

        const likeURL = `${process.env.REACT_APP_SERVER}/api/cheep/like?cheepId=${props.cheepId}`;

        await fetch(likeURL, {
            method: "POST",
            credentials: "include"
        });
    }} />;
};

export default LikeButton;