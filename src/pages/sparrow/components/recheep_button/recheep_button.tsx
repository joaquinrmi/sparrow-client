import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CheepData from "../../../../cheep_data";
import StateContext from "../../state_context";
import InteractionButton, { InteractionColor } from "../interaction_button";

export interface Props
{
    id: string;
    cheepData: CheepData;
    counter?: number;
    active?: boolean;
}

const RecheepButton: React.FunctionComponent<Props> = (props) =>
{
    const [ state, stateManager ] = useContext(StateContext);
    const navigate = useNavigate();
    
    return <InteractionButton id={props.id} color={InteractionColor.Green} icon="retweet" counter={props.counter} active={props.active} onClick={(event) =>
    {
        event.stopPropagation();

        stateManager.setEditorTargetCheep(props.cheepData);
        navigate("/compose/cheep");
    }} />;
};

export default RecheepButton;