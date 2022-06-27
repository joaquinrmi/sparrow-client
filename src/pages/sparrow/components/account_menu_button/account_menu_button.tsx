import React, { useContext } from "react";
import SessionContext from "../../../../session_context";

import "./account_menu_button.scss";

export interface Props
{}

const AccountMenuButton: React.FunctionComponent<Props> = (props) =>
{
    const userSession = useContext(SessionContext);

    return <div className="account-menu-button">
        <div className="button-image">
            <img src={userSession.user.picture} alt={`Foto de perfil de @${userSession.user.handle}`} />
        </div>
    </div>;
};

export default AccountMenuButton;