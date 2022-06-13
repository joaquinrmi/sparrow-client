import React, { useEffect } from "react";

import "./modal.scss";

export interface Props
{
    children?: React.ReactNode;
    className?: string;
    id: string;
    changeBodyOverflow?: boolean;

    closeRequest(): void;
}

const Modal: React.FunctionComponent<Props> = (props) =>
{
    useEffect(() =>
    {
        const modal = document.getElementById(props.id) as HTMLDivElement;

        modal.onclick = (ev) =>
        {
            if(ev.target === modal)
            {
                props.closeRequest();
            }
        };

        if(props.changeBodyOverflow)
        {
            document.body.style.overflow = "hidden";
        }

        return () =>
        {
            if(props.changeBodyOverflow)
            {
                document.body.style.overflow = "auto";
            }
        };
    },
    []);

    return <div id={props.id} className={`modal ${props.className ? props.className : ""}`}>
        <div className="modal-body">
            {props.children}
        </div>
    </div>;
};

export default Modal;