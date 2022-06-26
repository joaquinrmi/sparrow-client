import React, { useContext } from "react";
import StateContext from "../../state_context";

import "./cheep_options_menu.scss";

export interface Props
{}

const CheepOptionsMenu: React.FunctionComponent<Props> = (props) =>
{
    const [ state, stateManager ] = useContext(StateContext);

    if(state.moreOptionsMenu !== undefined)
    {
        var menuData = state.moreOptionsMenu;
    }
    else
    {
        return <></>;
    }

    return <>
        <div className="cheep-options-menu-container" onClick={() =>
        {
            stateManager.closeCheepOptionsMenu();
        }}></div>

        <div className="cheep-options-menu" style={{
            top: menuData.positionY + 10,
            left: menuData.positionX - 100
        }}>
            <div className="option erase" onClick={(ev) =>
            {
                ev.stopPropagation();

                stateManager.closeCheepOptionsMenu();

                (async () =>
                {
                    const deleteCheepURL = `${process.env.REACT_APP_SERVER}/api/cheep/delete?cheepId=${menuData.targetCheep.id}`;

                    const response = await fetch(deleteCheepURL, {
                        method: "POST",
                        credentials: "include"
                    });

                    if(response.status === 200)
                    {
                        stateManager.setStatusMessage("Se eliminó el cheep.");
                        menuData.onDelete();
                    }
                    else
                    {
                        stateManager.setStatusMessage("Ocurrió un error al eliminar el cheep.");
                    }
                })();
            }}>
                <div className="icon">
                    <i className="fa-solid fa-trash-can"></i>
                </div>

                <span className="message">
                    Eliminar
                </span>
            </div>
        </div>
    </>;
};

export default CheepOptionsMenu;