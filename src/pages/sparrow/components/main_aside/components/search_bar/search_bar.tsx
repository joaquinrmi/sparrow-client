import React, { useEffect } from "react";

import "./search_bar.scss";

export interface Props
{
    id: string;
    defaultValue?: string;
}

const SearchBar: React.FunctionComponent<Props> = (props) =>
{
    useEffect(() =>
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
    [ props.id ]);

    return <div id={props.id} className="search-bar-container">
        <div className="icon">
            <i className="fa-solid fa-magnifying-glass"></i>
        </div>

        <input type="text" defaultValue={props.defaultValue} placeholder="Buscar en Sparrow" />
    </div>;
};

export default SearchBar;