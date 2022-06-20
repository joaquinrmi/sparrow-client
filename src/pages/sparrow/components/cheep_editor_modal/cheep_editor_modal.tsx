import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cheep from "../../../../components/cheep";
import Modal from "../../../../components/modal";
import ModalForm from "../../../../components/modal_form";
import StateContext from "../../state_context";
import CheepEditor, { CheepEditorElement } from "../cheep_editor/cheep_editor";

import "./cheep_editor_modal.scss";

export interface Props
{
    onClose?(): void;
}

const CheepEditorModal: React.FunctionComponent<Props> = (props) =>
{
    const [ state, stateManager ] = useContext(StateContext);
    const navigate = useNavigate();

    useEffect(() =>
    {
        return () =>
        {
            if(props.onClose)
            {
                props.onClose();
            }

            stateManager.setEditorTargetCheep(undefined);
            stateManager.setEditorResponseTarget(undefined);
        };
    }, [ props.onClose ]);

    const closeRequest = () =>
    {
        const cheepEditor = document.getElementById("cheep-editor-modal") as CheepEditorElement;
        if(cheepEditor === null || cheepEditor.hasContent())
        {
            stateManager.openCloseConfirmation(() =>
            {
                stateManager.closeCloseConfirmation();
                navigate(-1);
            });
        }
        else
        {
            navigate(-1);
        }
    };

    return <Modal id="compose-modal" className="cheep-editor-modal" changeBodyOverflow closeRequest={closeRequest}>
        <ModalForm className="editor-modal-form">
            <div className="modal-form-top">
                <span className="modal-form-close-button" onClick={closeRequest}>
                    <i className="fa-solid fa-xmark"></i>
                </span>
            </div>

            <div className="modal-form-body">
                {state.cheepEditor.responseTarget ?
                    <Cheep id={`cheep-editor-response`} data={state.cheepEditor.responseTarget} response /> :
                    null
                }

                <CheepEditor id="cheep-editor-modal" responseTarget={state.cheepEditor.responseTarget ? state.cheepEditor.responseTarget : undefined} targetCheep={state.cheepEditor.targetCheep} />
            </div>
        </ModalForm>
    </Modal>;
};

export default CheepEditorModal;