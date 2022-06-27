import React from "react";
import PageHeader from "../../components/page_header";

import "./notifications.scss";

export interface Props
{}

const Notifications: React.FunctionComponent<Props> = (props) =>
{
    return <div className="notifications-page">
        <PageHeader>
            <span className="title">Notificaciones</span>
        </PageHeader>
    </div>;
};

export default Notifications;