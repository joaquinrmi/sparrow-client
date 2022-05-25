import React from "react";
import CheepData from "../../../../cheep_data";
import InteractionButton, { InteractionColor } from "../interaction_button";

export interface Props
{
    cheepData: CheepData;
    counter?: boolean;
}

const CommentButton: React.FunctionComponent<Props> = (props) =>
{
    return <InteractionButton color={InteractionColor.Blue} icon="comment" counter={props.counter ? props.cheepData.commentCount : undefined} onClick={(event) =>
    {
        event.stopPropagation();
    }} />;
};

export default CommentButton;