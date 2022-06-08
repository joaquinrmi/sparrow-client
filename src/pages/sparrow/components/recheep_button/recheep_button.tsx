import React, { useContext } from "react";
import CheepData from "../../../../cheep_data";
import StateContext from "../../state_context";
import InteractionButton, { InteractionColor } from "../interaction_button";

export interface Props
{
    id: string;
    cheepData: CheepData;
    counter?: number;
    active?: boolean;

    onRecheep?(): void;
}

const RecheepButton: React.FunctionComponent<Props> = (props) =>
{
    const [ state, stateManager ] = useContext(StateContext);
    
    return <InteractionButton id={props.id} color={InteractionColor.Green} icon="retweet" counter={props.counter} active={props.active} onClick={(event) =>
    {
        event.stopPropagation();

        const button = document.getElementById(props.id) as HTMLDivElement;

        const rect = button.getBoundingClientRect();
        const x = rect.x + window.scrollX;
        const y = rect.y + window.scrollY;

        stateManager.openRecheepMenu(props.cheepData, [ x, y ], () =>
        {
            if(props.onRecheep)
            {
                props.onRecheep();
            }
        });
    }} />;
};

export default RecheepButton;