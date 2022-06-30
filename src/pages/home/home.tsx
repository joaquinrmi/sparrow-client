import React from "react";
import CheepList from "../../components/cheep_list";
import PageHeader from "../../components/page_header";

import "./home.scss";

export interface Props
{}

const Home: React.FunctionComponent<Props> = (props) =>
{
    return <div className="home-page">
        <PageHeader>
            <span className="title">Inicio</span>
        </PageHeader>

        <CheepList
            name="home"
            arguments={
            {
                timeline: true
            }}
        />
    </div>;
};

export default Home;