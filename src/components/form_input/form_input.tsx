import React, { useState, useEffect } from "react";

import "./form_input.scss";

export interface Props
{
    id: string;
    title: string;
    type?: FormInputType;
    value?: string;
    options?: Array<string>;
    errorMessage?: string;
    textarea?: boolean;
    limit?: number;
    onChange?(): void;
}

export interface FormInputElement extends HTMLDivElement
{
    getValue(): string;
}

const FormInput: React.FunctionComponent<Props> = (props) =>
{
    const [ currentLength, setCurrentLength ] = useState<number>(props.value ? props.value.length : 0);

    useEffect(
        () =>
        {
            const element = document.getElementById(props.id) as FormInputElement;
            const inputElement = document.getElementById(`input-${props.id}`) as HTMLInputElement;

            if(inputElement.value.length > 0)
            {
                element.classList.add("static");
            }
            else
            {
                element.classList.remove("static");
            }

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

            inputElement.onchange = () =>
            {
                if(inputElement.value.length > 0)
                {
                    element.classList.add("static");
                }
                else
                {
                    element.classList.remove("static");
                }
            };

            inputElement.addEventListener("keydown", (ev) =>
            {
                if(props.limit !== undefined)
                {
                    if(inputElement.value.length === props.limit)
                    {
                        if(ev.key !== "Backspace" && ev.key !== "Delete")
                        {
                            ev.stopPropagation();
                            ev.preventDefault();
                        }
                    }
                }
            });

            inputElement.addEventListener("input", (ev) =>
            {
                if(props.limit !== undefined)
                {
                    if(inputElement.value.length > props.limit)
                    {
                        inputElement.value = inputElement.value.substring(0, props.limit);
                    }

                    setCurrentLength(inputElement.value.length);
                }

                if(props.onChange)
                {
                    props.onChange();
                }
            });
        }
    );

    let className = "form-input";

    if(props.options !== undefined)
    {
        className += " static options";
    }
    else if(props.value !== undefined && props.value.length > 0)
    {
        className += " static";
    }

    if(props.errorMessage !== undefined && props.errorMessage.length > 0)
    {
        className += " error";
    }

    return <div className="form-input-container">
        <div id={props.id} className={className}>
            <span className={"title"}>
                {props.title}
            </span>

            {props.limit !== undefined ?
                <div className="limit-counter">
                    {currentLength} / {props.limit}
                </div> :
                null
            }

            {props.options !== undefined ?
                <div className="arrow-container">
                    <i className="fa-solid fa-angle-down"></i>
                </div> :
                null
            }
            {props.options !== undefined ?
                <select name="" id={`input-${props.id}`} defaultValue={props.value ? props.value : ""}>
                    {props.options.map((value, index) =>
                    {
                        return <option key={`option-${index}`}>{value}</option>;
                    })}
                </select> :
                <div className="input-container">
                    {props.textarea ?
                        <textarea id={`input-${props.id}`} defaultValue={props.value ? props.value : ""} rows={3} /> :
                        <input id={`input-${props.id}`} type={props.type !== undefined ? props.type : "text"} defaultValue={props.value ? props.value : ""} />
                    }
                </div>
            }
        </div>

        {props.errorMessage !== undefined ?
            <div className="input-error-message">
                {props.errorMessage}
            </div> :
            null
        }
    </div>;
};

export enum FormInputType
{
    Text = "text",
    Password = "password",
    Email = "email"
}

export default FormInput;