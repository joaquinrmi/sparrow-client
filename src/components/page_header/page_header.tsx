import React from "react";

import "./page_header.scss";

export interface Props
{
    children?: React.ReactNode;
}

const PageHeader: React.FunctionComponent<Props> = (props) =>
{
    return <header className="page-header">
        {props.children}
    </header>;
};

export default PageHeader;