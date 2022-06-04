import React, { useEffect } from "react";

import "./text_editor.scss";

export interface Props
{
    id: string;
}

const TextEditor: React.FunctionComponent<Props> = (props) =>
{
    useEffect(() =>
    {
        const editor = document.getElementById(props.id) as HTMLDivElement;
        const placeholder = editor.querySelector(".placeholder") as HTMLDivElement;
        const editorContent = editor.querySelector(".editor-content") as HTMLDivElement;
        const editable = editor.querySelector(".editor-editable") as HTMLDivElement;

        editable.addEventListener("input", (ev) =>
        {
            const selection = window.getSelection();

            if(!selection)
            {
                return;
            }

            const text = editable.innerText;

            if(!text)
            {
                placeholder.classList.add("show");
                return;
            }

            console.log(text);

            if(text.length === 1 && text.charCodeAt(0) === 10)
            {
                editable.innerText = "";
                editorContent.innerText = "";
                placeholder.classList.add("show");
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
        });
    },
    [ props.id ]);

    return <div id={props.id} className="text-editor">
        <div className="placeholder show">
            ¿Qué te pasa?
        </div>

        <div className="editor-content"></div>
        <div className="editor-editable" contentEditable></div>
    </div>;
};

const withSpace = /\s/;
const hashtagValidChars = /[a-zA-Z0-9_]/;

function parseText(text: string): string
{
    let result = "";

    for(let i = 0; i < text.length; ++i)
    {
        if(text.charAt(i) === "#" && (i === 0 || text.charAt(i - 1).match(withSpace) !== null))
        {
            if(i === text.length - 1)
            {
                result += "#";
                continue;
            }

            let hashtag = "#";
            for(let j = i + 1; j < text.length; ++j)
            {
                if(text.charAt(j).match(hashtagValidChars) !== null)
                {
                    hashtag += text.charAt(j);
                }
                else
                {
                    if(hashtag.length > 1)
                    {
                        result += `<span class="hashtag">${hashtag}</span>`;
                        i = j - 1;
                    }
                    else
                    {
                        result += `#${text.charAt(j)}`;
                        i = j;
                    }

                    break;
                }

                if(j === text.length - 1)
                {
                    if(hashtag.length > 1)
                    {
                        result += `<span class="hashtag">${hashtag}</span>`;
                        i = j;
                    }
                    else
                    {
                        result += `#${text.charAt(j)}`;
                        i = j;
                    }
                }
            }
        }
        else
        {
            result += text.charAt(i);
        }
    }

    return result;
}

export default TextEditor;