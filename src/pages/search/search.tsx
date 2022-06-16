import React from "react";
import CheepList from "../../components/cheep_list";
import PageHeader from "../../components/page_header";
import SearchBar from "../sparrow/components/main_aside/components/search_bar";

import "./search.scss";

export interface Props
{
    params?: URLSearchParams;
}

const Search: React.FunctionComponent<Props> = (props) =>
{
    return <div className="home-page">
        <PageHeader>
            <SearchBar id="search-search-bar" />
        </PageHeader>

        <CheepList name="search" arguments={{
            words: props.params ? props.params.get("q") || "" : ""
        }} />
    </div>;
};

export default Search;