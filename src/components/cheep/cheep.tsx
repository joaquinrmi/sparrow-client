import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CheepData from "../../cheep_data";
import MONTHS from "../../months";
import CommentButton from "../../pages/sparrow/components/comment_button";
import LikeButton from "../../pages/sparrow/components/like_button";
import RecheepButton from "../../pages/sparrow/components/recheep_button";

import "./cheep.scss";

export interface Props
{
    data: CheepData;
}

const Cheep: React.FunctionComponent<Props> = (props) =>
{
    const [ cheepDate, setCheepDate ] = useState<string>(formatDate(props.data.dateCreated));

    useEffect(() =>
    {
        let interval = setInterval(() =>
        {
            setCheepDate(formatDate(props.data.dateCreated));
        },
        2 * 60 * 1000);

        return () =>
        {
            clearInterval(interval);
        };
    },
    []);

    const navigate = useNavigate();

    const cheepLink = `/${props.data.author.handle}/status/${props.data.id}`;

    return <div className="cheep" onClick={() =>
    {
        navigate(cheepLink);
    }}>
        <Link className="picture-container" to={`/${props.data.author.handle}`} onClick={(ev) =>
        {
            ev.stopPropagation();
        }}>
            <div className="cheep-picture" style={{
                backgroundImage: `url(${props.data.author.picture})`
            }} title={`Foto de perfil de @${props.data.author.name}`} />

            <div className="veil"></div>
        </Link>

        <div className="cheep-body">
            <div className="cheep-header">
                <Link className="author-name" to={`/${props.data.author.handle}`} onClick={(ev) =>
                {
                    ev.stopPropagation();
                }}>
                    {props.data.author.name}
                </Link>

                <Link className="author-handle" to={`/${props.data.author.handle}`} onClick={(ev) =>
                {
                    ev.stopPropagation();
                }}>
                    @{props.data.author.handle}
                </Link>

                <span className="separator">·</span>

                <Link className="cheep-date" to={cheepLink} onClick={(ev) =>
                {
                    ev.stopPropagation();
                }}>
                    {cheepDate}
                </Link>
            </div>

            <div className="cheep-content">
                <span className="content-text">
                    {props.data.content}
                </span>

                <div className="interaction-container">
                    <div className="interaction-button-container">
                        <CommentButton cheepData={props.data} counter={true} />
                    </div>
                    
                    <div className="interaction-button-container">
                        <RecheepButton cheepId={props.data.id} active={props.data.recheepped} counter={props.data.recheepCount} />
                    </div>

                    <div className="interaction-button-container">
                        <LikeButton cheepId={props.data.id} active={props.data.liked} counter={props.data.likeCount} />
                    </div>
                </div>
            </div>
        </div>
    </div>;
};

const MINUTE_TIME = 1000 * 60;
const HOUR_TIME = MINUTE_TIME * 60;
const DAY_TIME = HOUR_TIME * 24;

function formatDate(date: Date): string
{
    const deltaTime = new Date().getTime() - date.getTime();

    if(deltaTime < 1000)
    {
        return "ahora";
    }

    if(deltaTime < MINUTE_TIME)
    {
        return `${Math.round(deltaTime / 1000)}s`;
    }
    
    if(deltaTime < HOUR_TIME)
    {
        return `${Math.round(deltaTime / (1000 * 60))}min`;
    }

    if(deltaTime < DAY_TIME)
    {
        return `${Math.round(deltaTime / (1000 * 60 * 60))}h`;
    }

    let result = `${date.getDate()} ${MONTHS[date.getMonth()].substring(0, 3).toLowerCase()}.`;

    if(new Date().getFullYear() !== date.getFullYear())
    {
        result += ` ${date.getFullYear()}`;
    }

    return result;
}

export default Cheep;