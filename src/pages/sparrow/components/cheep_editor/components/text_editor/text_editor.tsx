import React, { useEffect, useState } from "react";
import parseText, { Token, TokenType } from "../../../../../../parse_text";

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
    const [ tokens, setTokens ] = useState<Array<Token>>([]);

    useEffect(() =>
    {
        const editor = document.getElementById(props.id) as TextEditorElement;
        const placeholder = editor.querySelector(".placeholder") as HTMLDivElement;
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
                setTokens([]);

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

            props.setStatus(text.length * 100 / props.maxLength);
            setTokens(tokens);
        });
    },
    [ props.id ]);

    return <div id={props.id} className="text-editor">
        <div className="placeholder show">
            ¿Qué te pasa?
        </div>

        <div className="text-editor-content">
            <div key={`a-${tokens.length}`} className="editor-content">
                {tokens.map((token, index) =>
                {
                    switch(token.type)
                    {
                    case TokenType.Plain:
                        return <span key={`${index}-token`}>
                            {token.value}
                        </span>;

                    case TokenType.Hashtag:
                        return <span key={`${index}-token`} className="hashtag">
                            {token.value}
                        </span>;

                    case TokenType.URL:
                        return <span key={`${index}-token`} className="link">
                            {token.value}
                        </span>;
                    }
                })}
            </div>

            <div className="editable-container">
                <textarea className="editor-editable"></textarea>
            </div>
        </div>
    </div>;
};

export default TextEditor;