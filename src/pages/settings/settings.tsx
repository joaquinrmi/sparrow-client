import React from "react";
import PageHeader from "../../components/page_header";

import "./settings.scss";

export interface Props
{}

const Settings: React.FunctionComponent<Props> = (props) =>
{
    return <div className="settings-page">
        <PageHeader>
            <span className="title">Configuración</span>
        </PageHeader>
    </div>;
};

export default Settings;