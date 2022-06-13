import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cheep from "../../../../components/cheep";
import Modal from "../../../../components/modal";
import ModalForm from "../../../../components/modal_form";
import StateContext from "../../state_context";
import CheepEditor from "../cheep_editor/cheep_editor";

import "./cheep_editor_modal.scss";

export interface Props
{
    onClose?(): void;
}

const CheepEditorModal: React.FunctionComponent<Props> = (props) =>
{
    const [ hasChanged, setHasChanged ] = useState<boolean>(false);

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
    });

    const closeRequest = () =>
    {
        setHasChanged((hasChanged) =>
        {
            if(hasChanged)
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

            return hasChanged;
        });
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

                <CheepEditor id="cheep-editor-modal" responseTarget={state.cheepEditor.responseTarget ? state.cheepEditor.responseTarget : undefined} targetCheep={state.cheepEditor.targetCheep} hasContent={(content) =>
                {
                    setHasChanged(content);
                }} />
            </div>
        </ModalForm>
    </Modal>;
};

export default CheepEditorModal;