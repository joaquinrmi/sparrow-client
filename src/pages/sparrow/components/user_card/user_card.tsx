import React from "react";
import { useNavigate } from "react-router-dom";
import AnotherUserData from "../../../../another_user_data";
import Button, { ButtonStyle } from "../../../../components/button";
import UserPicture from "../../../../components/user_picture";

import "./user_card.scss";

export interface Props
{
    id: string;
    data: AnotherUserData;
    index: number;
}

const UserCard: React.FunctionComponent<Props> = (props) =>
{
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
                    {props.data.following ?
                        <Button stylePreset={ButtonStyle.White}>Siguiendo</Button> :
                        <Button stylePreset={ButtonStyle.Black}>Seguir</Button>}
                </div>
            </div>

            <div className="user-card-content">
                {props.data.description}
            </div>
        </div>
    </div>;
};

export default UserCard;