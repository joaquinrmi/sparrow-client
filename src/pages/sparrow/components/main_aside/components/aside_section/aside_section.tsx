import React from "react";

import "./aside_section.scss";

export interface Props
{
    children?: React.ReactNode;
    title: string;
    className?: string;
}

const AsideSection: React.FunctionComponent<Props> = (props) =>
{
    return <div className={`aside-section ${props.className ? props.className : ""}`}>
        <header className="section-title">
            {props.title}
        </header>

        <section className="section-body">
            {props.children}
        </section>
    </div>;
};

export default AsideSection;