import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./search_bar.scss";

export interface Props
{
    id: string;
    defaultValue?: string;
}

const SearchBar: React.FunctionComponent<Props> = (props) =>
{
    const navigate = useNavigate();

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

    return <div id={props.id} className="search-bar-container" onKeyDown={(ev) =>
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

        if(inputElement.value.trim().length === 0)
        {
            return;
        }

        if(ev.key === "Enter")
        {
            navigate(`/search?q=${inputElement.value}`);
        }
    }}>
        <div className="icon">
            <i className="fa-solid fa-magnifying-glass"></i>
        </div>

        <input type="text" defaultValue={props.defaultValue} placeholder="Buscar en Sparrow" />
    </div>;
};

export default SearchBar;