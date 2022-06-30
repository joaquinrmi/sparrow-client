import React, { useContext } from "react";
import SessionContext from "../../../../session_context";
import StateContext from "../../state_context";

import "./account_menu_button.scss";

export interface Props
{}

const AccountMenuButton: React.FunctionComponent<Props> = (props) =>
{
    const userSession = useContext(SessionContext);
    const [ state, stateManager ] = useContext(StateContext);

    return <div
        className="account-menu-button"
        onClick={() =>
        {
            const button = document.querySelector(".account-menu-button") as HTMLDivElement;

            if (button === null)
            {
                return;
            }

            const rect = button.getBoundingClientRect();
            const x = rect.x + window.scrollX;
            const y = rect.y + window.scrollY;

            stateManager.openAccountMenu([ x, y ]);
        }}
    >
        <div className="button-image">
            <img src={userSession.user.picture} alt={`Foto de perfil de @${userSession.user.handle}`} />
        </div>
    </div>;
};

export default AccountMenuButton;