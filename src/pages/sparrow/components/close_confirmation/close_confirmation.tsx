import React, { useContext } from "react";
import Button, { ButtonStyle } from "../../../../components/button";
import Modal from "../../../../components/modal";
import StateContext from "../../state_context";

import "./close_confirmation.scss";

export interface Props
{}

const CloseConfirmation: React.FunctionComponent<Props> = (props) =>
{
    const [ state, stateManager ] = useContext(StateContext);

    return <Modal id="close-confirmation-modal" className="close-confirmation-modal" closeRequest={() =>
    {}}>
        <div className="close-confirmation-message">
            <span className="title">
                ¿Quieres descartar los cambios?
            </span>

            <span className="message">
                Esta acción no se puede revertir, y perderás tus cambios.
            </span>
        </div>

        <div className="close-confirmation-buttons">
            <Button stylePreset={ButtonStyle.Red} onClick={state.closeConfirmation.discart}>
                Descartar
            </Button>

            <Button stylePreset={ButtonStyle.White} onClick={() =>
            {
                stateManager.closeCloseConfirmation();
            }}>
                Cancelar
            </Button>
        </div>
    </Modal>;
};

export default CloseConfirmation;