import React, { useContext } from "react";
import StateContext from "../../state_context";
import ConfirmationModal, { ConfirmationStyle } from "../confirmation_modal";

export interface Props
{}

const UnfollowConfirmation: React.FunctionComponent<Props> = (props) =>
{
    const [ state, stateManager ] = useContext(StateContext);

    return <ConfirmationModal
        id="close-confirmation-modal"
        title={`¿Quieres dejar de seguir a @${state.unfollowConfirmation.userHandle}?`}
        message="Sus Tweets ya no aparecerán en tu cronología de inicio. Podrás seguir viendo su perfil, a menos que sus Tweets estén protegidos."
        styleType={ConfirmationStyle.Normal}
        confirmButtonMessage="Dejar de seguir"
        cancelButtonMessage="Cancelar"
        confirm={state.closeConfirmation.discart}
        cancel={stateManager.closeCloseConfirmation}
        closeRequest={stateManager.closeCloseConfirmation}
    />;
};

export default UnfollowConfirmation;