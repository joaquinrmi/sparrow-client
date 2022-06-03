import React from "react";

import "./modal_form.scss";

export interface Props
{
    children?: React.ReactNode;
    height: string;
}

const ModalForm: React.FunctionComponent<Props> = (props) =>
{
    return <div className="modal-form" style={{
        flex: `0 1 ${props.height}`
    }}>
        {props.children}
    </div>;
};

export default ModalForm;