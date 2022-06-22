import React from "react";
import PageHeader from "../../../components/page_header";
import UserList, { UserListType } from "../../sparrow/components/user_list";

export interface Props
{
    cheepId: number;
}

const LikesList: React.FunctionComponent<Props> = (props) =>
{
    return <div className="likes-list">
        <PageHeader>
            <div className="title">
                Marcado como Me gusta por
            </div>
        </PageHeader>

        <UserList id="likes-list" name="likes" type={UserListType.Like} target={props.cheepId} />
    </div>;
};

export default LikesList;