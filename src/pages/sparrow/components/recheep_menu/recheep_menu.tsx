import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CheepData from "../../../../cheep_data";
import StateContext from "../../state_context";
import CreateCheepData from "../cheep_editor/create_cheep_data";
import postCheep from "../cheep_editor/post_cheep";

import "./recheep_menu.scss";

export interface Props
{
    targetCheep: CheepData;
    positionX: number;
    positionY: number;
    onRecheep(): void;
}

const RecheepMenu: React.FunctionComponent<Props> = (props) =>
{
    const [ state, stateManager ] = useContext(StateContext);

    const navigate = useNavigate();

    return <>
        <div className="recheep-menu-container" onClick={() =>
        {
            stateManager.closeRecheepMenu();
        }}></div>

        <div className="recheep-menu" style={{
            top: props.positionY,
            left: props.positionX
        }}>
            <div className="option" onClick={async () =>
            {
                props.onRecheep();
                stateManager.closeRecheepMenu();

                const data: CreateCheepData = {
                    quoteTarget: props.targetCheep.id
                };

                try
                {
                    await postCheep(data);
                }
                catch(err)
                {}
            }}>
                <div className="icon">
                    <i className="fa-solid fa-pencil"></i>
                </div>

                <span className="message">
                    Recheepear
                </span>
            </div>

            <div className="option" onClick={() =>
            {
                stateManager.setEditorTargetCheep(props.targetCheep);
                stateManager.closeRecheepMenu();

                navigate("/compose/cheep");
            }}>
                <div className="icon">
                    <i className="fa-solid fa-retweet"></i>
                </div>

                <span className="message">
                    Citar Cheep
                </span>
            </div>
        </div>
    </>;
};

export default RecheepMenu;