import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AnotherUserData from "../../../../another_user_data";
import UserPicture from "../../../../components/user_picture";
import { UserListName } from "../../state";
import StateContext from "../../state_context";
import FollowButton from "../follow_button";

import "./user_card.scss";

export interface Props
{
    id: string;
    listName: UserListName;
    data: AnotherUserData;
    index: number;
}

const UserCard: React.FunctionComponent<Props> = (props) =>
{
    const [ state, stateManager ] = useContext(StateContext);

    const navigate = useNavigate();

    return <div id={props.id} className="user-card" onClick={(ev) =>
    {
        const element = document.getElementById(props.id) as HTMLDivElement;

        if(element !== null)
        {
            navigate(`/${props.data.handle}`);
        }
    }}>
        <div className="left-column">
            <UserPicture userHandle={props.data.handle} userName={props.data.name} picture={props.data.picture} />
        </div>

        <div className="right-column">
            <div className="user-card-header">
                <div className="user-name-container">
                    <div className="name">
                        {props.data.name}
                    </div>

                    <div className="bottom-data">
                        <div className="handle">
                            @{props.data.handle}
                        </div>

                        {props.data.follower ?
                            <span className="follow-mark">Te sigue</span> :
                            null
                        }
                    </div>
                </div>

                <div className="interaction-container">
                    <FollowButton
                        id={`${props.id}-follow`}
                        following={props.data.following}
                        userHandle={props.data.handle}
                        onFollow={() =>
                        {
                            stateManager.updateUserCard(props.listName, props.index, {
                                ...props.data,
                                following: true
                            });
                        }}
                        onUnfollow={() =>
                        {
                            stateManager.updateUserCard(props.listName, props.index, {
                                ...props.data,
                                following: false
                            });
                        }}
                    />
                </div>
            </div>

            <div className="user-card-content">
                {props.data.description}
            </div>
        </div>
    </div>;
};

export default UserCard;