import React, { useEffect } from "react";

import "./status_modal.scss";

export interface Props
{
    children?: React.ReactNode;
    id: string;
    message: string;
}

const StatusModal: React.FunctionComponent<Props> = (props) =>
{
    useEffect(() =>
    {
        if(props.message.length === 0)
        {
            return;
        }

        const modal = document.getElementById(props.id) as HTMLDivElement;

        modal.classList.remove("hide");
        modal.classList.add("show");

        setTimeout(() =>
        {
            modal.classList.remove("show");
            setTimeout(() =>
            {
                modal.classList.add("hide");
            },
            300);
        },
        10_000);
    },
    [ props.message ]);

    return <div id={props.id} className={`status-modal ${props.message.length > 0 ? "show" : "hide"}`}>
        <div className="modal-body">
            {props.message}
        </div>
    </div>;
};

export default StatusModal;