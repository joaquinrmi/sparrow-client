import React from "react";
import PageHeader from "../../../../components/page_header";
import UserList, { UserListType } from "../user_list";

export interface Props
{}

const RecommendedList: React.FunctionComponent<Props> = (props) =>
{
    return <div className="recommended-list">
        <PageHeader>
            <span className="title">Quizás te guste</span>
        </PageHeader>

        <UserList id="recommended-list" name="recommended" type={UserListType.Recommended} target={0} />
    </div>;
};

export default RecommendedList;