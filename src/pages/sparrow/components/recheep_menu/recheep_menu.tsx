import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import getRelevantCheepData from "../../../../components/cheep/get_relevant_cheep_data";
import StateContext from "../../state_context";
import CreateCheepData from "../cheep_editor/create_cheep_data";
import deleteRecheep from "../cheep_editor/delete_recheep";
import postCheep from "../cheep_editor/post_cheep";

import "./recheep_menu.scss";

export interface Props
{}

const RecheepMenu: React.FunctionComponent<Props> = (props) =>
{
    const [ state, stateManager ] = useContext(StateContext);

    const navigate = useNavigate();

    if(state.recheepMenu !== undefined)
    {
        var menuData = state.recheepMenu;
    }
    else
    {
        return <></>;
    }

    const targetCheep = getRelevantCheepData(menuData.targetCheep);

    return <>
        <div className="recheep-menu-container" onClick={() =>
        {
            stateManager.closeRecheepMenu();
        }}></div>

        <div className="recheep-menu" style={{
            top: menuData.positionY,
            left: menuData.positionX
        }}>
            <div className="option" onClick={async () =>
            {
                menuData.onRecheep();
                stateManager.closeRecheepMenu();

                if(menuData.active)
                {
                    await deleteRecheep(targetCheep.id);
                }
                else
                {
                    const data: CreateCheepData = {
                        quoteTarget: targetCheep.id
                    };
    
                    try
                    {
                        await postCheep(data);
                    }
                    catch(err)
                    {}
                }
            }}>
                <div className="icon">
                    <i className="fa-solid fa-pencil"></i>
                </div>

                <span className="message">
                    {menuData.active ? "Deshacer Recheep" : "Recheepear"}
                </span>
            </div>

            <div className="option" onClick={() =>
            {
                stateManager.setEditorTargetCheep(targetCheep);
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