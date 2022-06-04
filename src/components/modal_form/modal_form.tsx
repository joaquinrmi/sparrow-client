import React from "react";

import "./modal_form.scss";

export interface Props
{
    children?: React.ReactNode;
    className?: string;
}

const ModalForm: React.FunctionComponent<Props> = (props) =>
{
    return <div className={`modal-form ${props.className ? props.className : ""}`}>
        {props.children}
    </div>;
};

export default ModalForm;