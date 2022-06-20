import React, { useContext } from "react";
import StateContext from "../../state_context";
import ConfirmationModal, { ConfirmationStyle } from "../confirmation_modal";

export interface Props
{}

const CloseConfirmation: React.FunctionComponent<Props> = (props) =>
{
    const [ state, stateManager ] = useContext(StateContext);

    return <ConfirmationModal
        id="close-confirmation-modal"
        title="¿Quieres descartar los cambios?"
        message="Esta acción no se puede revertir, y perderás tus cambios."
        styleType={ConfirmationStyle.Important}
        confirmButtonMessage="Descartar"
        cancelButtonMessage="Cancelar"
        confirm={() =>
        {
            state.closeConfirmation.discart();
        }}
        cancel={() =>
        {
            stateManager.closeCloseConfirmation();
        }}
        closeRequest={() =>
        {
            stateManager.closeCloseConfirmation();
        }} />;
};

export default CloseConfirmation;