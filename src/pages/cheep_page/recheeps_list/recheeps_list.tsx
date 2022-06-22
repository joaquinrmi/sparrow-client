import React from "react";
import PageHeader from "../../../components/page_header";
import UserList, { UserListType } from "../../sparrow/components/user_list";

export interface Props
{
    cheepId: number;
}

const RecheepsList: React.FunctionComponent<Props> = (props) =>
{
    return <div className="recheeps-list">
        <PageHeader>
            <div className="title">
                Recheepeado por
            </div>
        </PageHeader>

        <UserList id="recheeps-list" name="recheeps" type={UserListType.Recheep} target={props.cheepId} />
    </div>;
};

export default RecheepsList;