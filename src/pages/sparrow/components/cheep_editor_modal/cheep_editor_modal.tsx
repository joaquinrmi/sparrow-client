import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../../../components/modal";
import StateContext from "../../state_context";
import CheepEditor from "../cheep_editor/cheep_editor";

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
        };
    });

    return <Modal id="compose-modal" className="cheep-editor-modal" closeRequest={() =>
    {
        navigate(-1);
    }}>
        <CheepEditor id="cheep-editor-modal" targetCheep={state.cheepEditor.targetCheep} />
    </Modal>;
};

export default CheepEditorModal;