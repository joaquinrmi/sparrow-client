import React from "react";
import { Link } from "react-router-dom";

import "./user_picture.scss";

export interface Props
{
    userHandle: string;
    userName: string;
    picture: string;
}

const UserPicture: React.FunctionComponent<Props> = (props) =>
{
    return <Link className="user-picture-container" to={`/${props.userHandle}`} onClick={(ev) =>
    {
        ev.stopPropagation();
    }}>
        <div className="cheep-picture" style={{
            backgroundImage: `url(${props.picture})`
        }} title={`Foto de perfil de @${props.userName}`} />

        <div className="veil"></div>
    </Link>;
};

export default UserPicture;