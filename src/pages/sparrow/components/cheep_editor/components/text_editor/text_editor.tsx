import React, { useEffect } from "react";

import "./text_editor.scss";

export interface Props
{
    id: string;
    maxLength: number;

    setStatus(status: number): void;
}

const TextEditor: React.FunctionComponent<Props> = (props) =>
{
    useEffect(() =>
    {
        const editor = document.getElementById(props.id) as HTMLDivElement;
        const placeholder = editor.querySelector(".placeholder") as HTMLDivElement;
        const editorContent = editor.querySelector(".editor-content") as HTMLDivElement;
        const editable = editor.querySelector(".editor-editable") as HTMLTextAreaElement;

        editable.addEventListener("keydown", (ev) =>
        {
            if(editable.value.length >= props.maxLength)
            {
                ev.preventDefault();
                ev.stopPropagation();
            }
        });

        editable.addEventListener("input", (ev) =>
        {
            const text = editable.value;

            if(!text || text.length === 0)
            {
                placeholder.classList.add("show");
                props.setStatus(0);
                editorContent.innerHTML = "";

                return;
            }

            const parsered = parseText(text);

            if(parsered.length > 0)
            {
                placeholder.classList.remove("show");
            }
            else
            {
                placeholder.classList.add("show");
            }

            editorContent.innerHTML = parsered;
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

const searchHashtag = /\s#[a-zA-Z0-9_]+|^#[a-zA-Z0-9_]+/g;

function parseText(text: string): string
{
    let result = "";
    
    const found = [ ...text.matchAll(searchHashtag) ];

    let lastIndex = 0;
    for(let i = 0; i < found.length; ++i)
    {
        const element = found[i];
        if(element.index === undefined)
        {
            continue;
        }
        
        let start = element.index;
        let toAdd: string;

        if(element[0].charCodeAt(0) === 32)
        {
            start += 1;
            toAdd = element[0].substring(1);
        }
        else
        {
            toAdd = element[0];
        }

        result += `${text.substring(lastIndex, start)}<span class="hashtag">${toAdd}</span>`;
        lastIndex = start + toAdd.length;
    }

    return result + text.substring(lastIndex);
}

export default TextEditor;