import React from "react";
import CheepList from "../../components/cheep_list";
import PageHeader from "../../components/page_header";

export interface Props
{}

const Explore: React.FunctionComponent<Props> = (props) =>
{
    return <div className="explore-page">
        <PageHeader>
            <span className="title">Explorar</span>
        </PageHeader>

        <CheepList name="explore" arguments={{
            explore: true
        }} />
    </div>;
};

export default Explore;