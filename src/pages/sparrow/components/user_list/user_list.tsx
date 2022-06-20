import React, { useContext, useEffect } from "react";
import AnotherUserData from "../../../../another_user_data";
import Loading from "../../../../components/loading";
import { UserListName } from "../../state";
import StateContext from "../../state_context";
import UserCard from "../user_card";

import "./user_list.scss";

export interface Props
{
    id: string;
    name: UserListName;
    type: UserListType;
    targetHandle: string;
}

const UserList: React.FunctionComponent<Props> = (props) =>
{
    const [ state, stateManager ] = useContext(StateContext);

    const listState = state.userLists[props.name];

    useEffect(() =>
    {
        if(props.id === listState.id && listState.targetHandle === props.targetHandle)
        {
            return;
        }

        (async () =>
        {
            try
            {
                const userList = await loadUserList(props.type, props.targetHandle);

                stateManager.loadUserList(props.name, props.id, props.targetHandle, userList);
            }
            catch(err)
            {
                stateManager.loadUserList(props.name, props.id, props.targetHandle, []);
            }
        })()
    },
    [ props.targetHandle, props.name ])

    let content: React.ReactNode;
    if(listState.targetHandle === props.targetHandle)
    {
        content = <>{listState.users.map((userData, index) =>
        {
            return <UserCard id={`ucard-${index}-${props.id}`} key={`${index}-card`} data={userData} index={index} />;
        })}</>;
    }
    else
    {
        content = <div className="loading-container">
            <Loading />
        </div>;
    }

    return <div className="user-list">
        {content}

        {listState.loadMore && !listState.noMore ?
            <div className="loading-container">
                <Loading />
            </div> :
            null
        }
    </div>;
};

export enum UserListType
{
    Following,
    Followers,
    Recommended
}

async function loadUserList(type: UserListType, targetHandle: string, offsetId?: number): Promise<Array<AnotherUserData>>
{
    let requestURL = `${process.env.REACT_APP_SERVER}/api/user`;
    switch(type)
    {
    case UserListType.Followers:
        requestURL += `/follower-list?userHandle=${targetHandle}`;
        break;

    case UserListType.Following:
        requestURL += `/following-list?userHandle=${targetHandle}`;
        break;

    case UserListType.Recommended:
        requestURL += "/recommended-list";
        break;
    }

    if(offsetId !== undefined)
    {
        requestURL += `&offsetId=${offsetId}`;
    }    

    const response = await fetch(requestURL, {
        method: "GET",
        credentials: "include"
    });

    if(response.status === 200)
    {
        return await response.json();
    }
    else
    {
        throw response.status;
    }
}

export default UserList;