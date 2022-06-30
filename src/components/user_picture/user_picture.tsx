import React from "react";
import { Link } from "react-router-dom";

import "./user_picture.scss";

export interface Props
{
    userHandle: string;
    userName: string;
    picture: string;
    notClickeable?: boolean;
}

const UserPicture: React.FunctionComponent<Props> = (props) =>
{
    let content = <>
        <div
            className="cheep-picture"
            style={{
                backgroundImage: `url(${props.picture})`
            }}
            title={`Foto de perfil de @${props.userName}`}
        />
    </>;

    if(props.notClickeable)
    {
        return <div className="user-picture-container">
            {content}
        </div>
    }
    else
    {
        return <Link
            className="user-picture-container"
            to={`/${props.userHandle}`}
            onClick={(ev) =>
            {
                ev.stopPropagation();
            }}
        >
            {content}

            <div className="veil"></div>
        </Link>;
    }
};

export default UserPicture;