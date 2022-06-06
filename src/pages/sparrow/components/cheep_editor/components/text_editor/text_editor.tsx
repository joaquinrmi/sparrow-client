import React, { useEffect } from "react";
import parseText, { tokensToHTML } from "../../../../../../parse_text";

import "./text_editor.scss";

export interface Props
{
    id: string;
    maxLength: number;

    setStatus(status: number): void;
}

export interface TextEditorElement extends HTMLDivElement
{
    getText(): string;
}

const TextEditor: React.FunctionComponent<Props> = (props) =>
{
    useEffect(() =>
    {
        const editor = document.getElementById(props.id) as TextEditorElement;
        const placeholder = editor.querySelector(".placeholder") as HTMLDivElement;
        const editorContent = editor.querySelector(".editor-content") as HTMLDivElement;
        const editable = editor.querySelector(".editor-editable") as HTMLTextAreaElement;

        editor.getText = () =>
        {
            if(editable.value === undefined)
            {
                return "";
            }
            
            return editable.value;
        };

        editable.addEventListener("keypress", (ev) =>
        {
            if(editable.value.length >= props.maxLength)
            {
                ev.preventDefault();
                ev.stopPropagation();
            }
        });

        editable.addEventListener("input", (ev) =>
        {
            let text = editable.value;

            if(text.length > props.maxLength)
            {
                text = text.substring(0, props.maxLength);
                editable.value = text;
            }

            if(!text || text.length === 0)
            {
                placeholder.classList.add("show");
                props.setStatus(0);
                editorContent.innerHTML = "";

                return;
            }

            const tokens = parseText(text);

            if(tokens.length > 0)
            {
                placeholder.classList.remove("show");
            }
            else
            {
                placeholder.classList.add("show");
            }

            editorContent.innerHTML = tokensToHTML(tokens);
            props.setStatus(text.length * 100 / props.maxLength);
        });
    },
    [ props.id ]);

    return <div id={props.id} className="text-editor">
        <div className="placeholder show">
            ¿Qué te pasa?
        </div>

        <div className="text-editor-content">
            <div className="editor-content"></div>
            <div className="editable-container">
                <textarea className="editor-editable"></textarea>
            </div>
        </div>
    </div>;
};

export default TextEditor;