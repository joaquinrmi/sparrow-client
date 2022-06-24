import React, { ReactNode, useContext, useEffect } from "react";
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
    target: string | number;
    limit?: number;
}

const UserList: React.FunctionComponent<Props> = (props) =>
{
    const [ state, stateManager ] = useContext(StateContext);

    const listState = state.userLists[props.name];

    useEffect(() =>
    {
        (async () =>
        {
            if(listState.loadMore && !listState.noMore)
            {
                const userList = await loadUserList(props.type, props.target, listState.users[listState.users.length - 1].id);

                stateManager.loadUserList(props.name, props.id, props.target,
                    [ ...listState.users, ...userList ]
                );

                stateManager.setUserListLoadMore(props.name, false);

                if(userList.length < 20)
                {
                    stateManager.setUserListLoadNoMore(props.name);
                }
            }
        })();
    },
    [ listState.loadMore ]);

    useEffect(() =>
    {
        if(props.id === listState.id && listState.target === props.target)
        {
            return;
        }

        (async () =>
        {
            try
            {
                const userList = await loadUserList(props.type, props.target);

                stateManager.loadUserList(props.name, props.id, props.target, userList);
            }
            catch(err)
            {
                stateManager.loadUserList(props.name, props.id, props.target, []);
            }
        })();
    },
    [ props.target, props.name ]);

    useEffect(() =>
    {
        const userList = document.getElementById(props.id) as HTMLDivElement;
        if(userList === null)
        {
            return;
        }

        const onScroll = () =>
        {
            const box = userList.getBoundingClientRect();

            if((box.height + box.top - window.innerHeight < 1000) && listState.users.length >= 20)
            {
                stateManager.setUserListLoadMore(props.name, true);
            }
        };

        document.addEventListener("scroll", onScroll);

        const onResize = () =>
        {
            const lastChild = userList.lastChild as HTMLDivElement;
            if(lastChild === null || lastChild === undefined)
            {
                return;
            }

            const box = lastChild.getBoundingClientRect();

            userList.style.paddingBottom = `${window.innerHeight - box.height}px`;
        }

        window.addEventListener("resize", onResize);

        onResize();

        return () =>
        {
            document.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onResize);
        }
    });

    let content: React.ReactNode;
    if(listState.target === props.target)
    {
        let cards = new Array<ReactNode>();

        let limit = props.limit || listState.users.length;
        for(let i = 0; i < limit && i < listState.users.length; ++i)
        {
            const userData = listState.users[i];

            cards.push(<UserCard id={`ucard-${i}-${props.id}`} listName={props.name} key={`${i}-card`} data={userData} index={i} />);
        }

        content = <>{cards}</>;
    }
    else
    {
        content = <div className="loading-container">
            <Loading />
        </div>;
    }

    return <div id={props.id} className="user-list">
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
    Recommended,
    Like,
    Recheep
}

async function loadUserList(type: UserListType, target: string | number, offsetId?: number): Promise<Array<AnotherUserData>>
{
    let requestURL = `${process.env.REACT_APP_SERVER}/api/user`;
    switch(type)
    {
    case UserListType.Followers:
        requestURL += `/follower-list?userHandle=${target}`;
        break;

    case UserListType.Following:
        requestURL += `/following-list?userHandle=${target}`;
        break;

    case UserListType.Recommended:
        requestURL += "/recommended-list";
        break;

    case UserListType.Like:
        requestURL += `/like-target-list?likeTarget=${target}`;
        break;

    case UserListType.Recheep:
        requestURL += `/recheep-target-list?recheepTarget=${target}`;
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