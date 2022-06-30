import React, { useContext } from "react";
import SessionContext from "../../../../session_context";
import StateContext from "../../state_context";

import "./account_menu.scss";

export interface Props
{}

const AccountMenu: React.FunctionComponent<Props> = (props) =>
{
    const userSession = useContext(SessionContext);
    const [ state, stateManager ] = useContext(StateContext);

    if(state.accountMenu !== undefined)
    {
        var menuData = state.accountMenu;
    }
    else
    {
        return <></>;
    }

    return <>
        <div
            className="account-menu-container"
            onClick={() =>
            {
                stateManager.closeAccountMenu();
            }}
        ></div>

        <div
            className="account-menu"
            style={
            {
                top: menuData.positionY - 20,
                left: menuData.positionX + 12
            }}
        >
            <div
                className="option"
                onClick={(ev) =>
                {
                    ev.stopPropagation();

                    stateManager.closeCheepOptionsMenu();

                    (async () =>
                    {
                        const logoutURL = `${process.env.REACT_APP_SERVER}/api/user/logout`;

                        const response = await fetch(
                            logoutURL,
                            {
                                method: "POST",
                                credentials: "include"
                            }
                        );

                        if(response.status === 200)
                        {
                            userSession.logout();
                        }
                        else
                        {
                            stateManager.setStatusMessage("Ocurrió un error al cerrar la sesión.");
                        }
                    })();
                }}
            >
                <span className="message">
                    Cerrar la sesión de @{userSession.user.handle}.
                </span>
            </div>
        </div>
    </>;
};

export default AccountMenu;