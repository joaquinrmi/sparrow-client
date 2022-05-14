import React, { useEffect } from "react";

import "./form_input.scss";

export interface Props
{
    id: string;
    title: string;
    value?: string;
}

interface FormInputElement extends HTMLDivElement
{
    getValue(): string;
}

const FormInput: React.FunctionComponent<Props> = (props) =>
{
    useEffect(() =>
    {
        const element = document.getElementById(props.id) as FormInputElement;
        const inputElement = document.getElementById(`input-${props.id}`) as HTMLInputElement;

        element.getValue = () =>
        {
            return inputElement.value;
        };

        element.onclick = () =>
        {
            inputElement.focus();
        };

        inputElement.onfocus = () =>
        {
            element.classList.add("active");
        }

        inputElement.addEventListener("focusout", () =>
        {
            element.classList.remove("active");
        });
    },
    []);

    return <div id={props.id} className="form-input">
        <span className="title">
            {props.title}
        </span>
        <div className="input-container">
            <input id={`input-${props.id}`} type="text" defaultValue={props.value ? props.value : ""} />
        </div>
    </div>;
};

export default FormInput;