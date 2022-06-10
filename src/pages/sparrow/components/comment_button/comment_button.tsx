import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CheepData from "../../../../cheep_data";
import StateContext from "../../state_context";
import InteractionButton, { InteractionColor } from "../interaction_button";

export interface Props
{
    id: string;
    cheepData: CheepData;
    counter?: boolean;
}

const CommentButton: React.FunctionComponent<Props> = (props) =>
{
    const [ state, stateManager ] = useContext(StateContext);

    const navigate = useNavigate();

    return <InteractionButton id={props.id} color={InteractionColor.Blue} icon="comment" counter={props.counter ? props.cheepData.commentCount : undefined} onClick={(event) =>
    {
        event.stopPropagation();

        stateManager.setEditorResponseTarget(props.cheepData);
        navigate("/compose/cheep");
    }} />;
};

export default CommentButton;