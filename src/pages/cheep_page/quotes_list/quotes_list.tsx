import React from "react";
import CheepList from "../../../components/cheep_list";
import PageHeader from "../../../components/page_header";

export interface Props
{
    cheepId: number;
}

const QuotesList: React.FunctionComponent<Props> = (props) =>
{
    return <div className="likes-list">
        <PageHeader>
            <div className="title">
                Cheeps citados
            </div>
        </PageHeader>

        <CheepList
            name="quotes"
            arguments={{
                quoteTarget: props.cheepId
            }}
            hideResponseTarget
        />
    </div>;
};

export default QuotesList;