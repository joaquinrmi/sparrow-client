import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../../../components/modal";
import CheepEditor from "../cheep_editor/cheep_editor";

import "./cheep_editor_modal.scss";

export interface Props
{
    onClose?(): void;
}

const CheepEditorModal: React.FunctionComponent<Props> = (props) =>
{
    const navigate = useNavigate();

    useEffect(() =>
    {
        return () =>
        {
            if(props.onClose)
            {
                props.onClose();
            }
        };
    });

    return <Modal id="compose-modal" className="cheep-editor-modal" closeRequest={() =>
    {
        navigate(-1);
    }}>
        <CheepEditor id="cheep-editor-modal" />
    </Modal>;
};

export default CheepEditorModal;