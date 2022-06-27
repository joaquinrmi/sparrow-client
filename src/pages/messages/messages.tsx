import React from "react";
import PageHeader from "../../components/page_header";

import "./messages.scss";

export interface Props
{}

const Messages: React.FunctionComponent<Props> = (props) =>
{
    return <div className="messages-page">
        <PageHeader>
            <span className="title">Mensajes</span>
        </PageHeader>
    </div>;
};

export default Messages;