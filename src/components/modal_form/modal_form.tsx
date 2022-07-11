import React, { FormEventHandler } from "react";

import "./modal_form.scss";

export interface Props
{
    children?: React.ReactNode;
    className?: string;

    onSubmit?: FormEventHandler<HTMLFormElement>;
}

const ModalForm: React.FunctionComponent<Props> = (props) =>
{
    return <form
        className={`modal-form ${props.className ? props.className : ""}`}
        onSubmit={props.onSubmit}
    >
        {props.children}
    </form>;
};

export default ModalForm;