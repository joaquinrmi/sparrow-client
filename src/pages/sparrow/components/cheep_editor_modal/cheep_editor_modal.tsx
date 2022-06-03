import React from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../../../components/modal";
import CheepEditor from "../cheep_editor/cheep_editor";

import "./cheep_editor_modal.scss";

const CheepEditorModal: React.FunctionComponent = () =>
{
    const navigate = useNavigate();

    return <Modal id="compose-modal" className="cheep-editor-modal" closeRequest={() =>
    {
        navigate(-1);
    }}>
        <CheepEditor />
    </Modal>;
};

export default CheepEditorModal;