import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./search_bar.scss";

export interface Props
{
    id: string;
    defaultValue?: string;
}

interface SearchBarElement extends HTMLFormElement
{
    keywords: HTMLInputElement;
}

const SearchBar: React.FunctionComponent<Props> = (props) =>
{
    const navigate = useNavigate();

    const defaultValue = props.defaultValue;

    useEffect(
        () =>
        {
            const element = document.getElementById(props.id) as HTMLDivElement;
            if(element === null)
            {
                return;
            }

            const inputElement = element.querySelector("input") as HTMLInputElement;
            if(inputElement === null)
            {
                return;
            }

            const onClick = () =>
            {
                inputElement.focus();
            };

            const onFocus = () =>
            {
                element.classList.add("active");
            };

            const onFocusOut = () =>
            {
                element.classList.remove("active");
            };

            element.addEventListener("click", onClick);
            inputElement.addEventListener("focusin", onFocus);
            inputElement.addEventListener("focusout", onFocusOut);

            return () =>
            {
                element.removeEventListener("click", onClick);
                inputElement.removeEventListener("focusin", onFocus);
                inputElement.removeEventListener("focusout", onFocusOut);
            };
        },
        [ props.id ]
    );

    return <form
        id={props.id}
        className="search-bar-container"
        onSubmit={(ev) =>
        {
            ev.preventDefault();

            const form = ev.target as SearchBarElement;

            if(!form.keywords)
            {
                return;
            }

            if(form.keywords.value.trim().length === 0)
            {
                return;
            }

            navigate(`/search?q=${form.keywords.value}`);
        }}
    >
        <div className="icon">
            <i className="fa-solid fa-magnifying-glass"></i>
        </div>

        <input key={defaultValue} name="keywords" type="text" defaultValue={defaultValue} placeholder="Buscar en Sparrow" />

        <input type="submit" className="invisible" />
    </form>;
};

export default SearchBar;