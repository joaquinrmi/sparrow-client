import React, { useContext, useEffect } from "react";
import StateContext from "../../pages/sparrow/state_context";

import "./status_modal.scss";

export interface Props
{
    children?: React.ReactNode;
    id: string;
}

const StatusModal: React.FunctionComponent<Props> = (props) =>
{
    const [ state, stateManager ] = useContext(StateContext);

    const data = state.statusMessage;

    useEffect(
        () =>
        {
            if(data.message.length === 0)
            {
                return;
            }

            const modal = document.getElementById(props.id) as HTMLDivElement;

            modal.classList.remove("hide");
            modal.classList.add("show");

            setTimeout(
                () =>
                {
                    modal.classList.remove("show");
                    setTimeout(
                        () =>
                        {
                            modal.classList.add("hide");
                            stateManager.setStatusMessage("");
                        },
                        300
                    );
                },
                6_000
            );
        },
        [ data.message ]
    );

    return <div id={props.id} className={`status-modal ${data.message.length > 0 ? "show" : "hide"}`}>
        <div className="modal-body">
            {data.message}
        </div>
    </div>;
};

export default StatusModal;