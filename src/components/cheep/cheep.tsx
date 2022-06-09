import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import CheepData from "../../cheep_data";
import MONTHS from "../../months";
import CommentButton from "../../pages/sparrow/components/comment_button";
import LikeButton from "../../pages/sparrow/components/like_button";
import RecheepButton from "../../pages/sparrow/components/recheep_button";
import parseText, { TokenType } from "../../parse_text";
import SessionContext from "../../session_context";
import Gallery from "../gallery";
import UserPicture from "../user_picture";

import "./cheep.scss";

export interface Props
{
    id: string;
    data: CheepData;
    quote?: boolean;
}

const Cheep: React.FunctionComponent<Props> = (props) =>
{
    const cheepData = props.data.quoteTarget && props.data.content === null && props.data.gallery?.length === 0 ? props.data.quoteTarget : props.data;

    const [ cheepDate, setCheepDate ] = useState<string>(formatDate(cheepData.dateCreated));
    const [ like, setLike ] = useState<boolean>(cheepData.liked);
    const [ recheep, setRecheep ] = useState<boolean>(cheepData.recheepped);

    const userSession = useContext(SessionContext);

    useEffect(() =>
    {
        let interval = setInterval(() =>
        {
            setCheepDate(formatDate(cheepData.dateCreated));
        },
        2 * 60 * 1000);

        return () =>
        {
            clearInterval(interval);
        };
    },
    []);

    const navigate = useNavigate();

    const cheepLink = `/${cheepData.author.handle}/status/${cheepData.id}`;
    const authorPicture = <>
        <div className="cheep-picture" style={{
            backgroundImage: `url(${cheepData.author.picture})`
        }} title={`Foto de perfil de @${cheepData.author.name}`} />

        <div className="veil"></div>
    </>;

    return <div className={`cheep ${props.quote ? "quote-form" : ""}`} onClick={(ev) =>
    {
        ev.stopPropagation();
        navigate(cheepLink);
    }}>
        {cheepData !== props.data ?
            <div className="recheep-info">
                <div className="icon">
                    <i className="fa-solid fa-retweet"></i>
                </div>

                <Link className="message" to={`/${props.data.author.handle}`} onClick={(ev) =>
                {
                    ev.stopPropagation();
                }}>
                    {props.data.author.name === userSession.user.name ? "Recheepeaste" : `${props.data.author.name} lo recheepeó`}
                </Link>
            </div> :
            null
        }

        <div className="cheep-cheep">
            {!props.quote ?
                <UserPicture userHandle={cheepData.author.handle} userName={cheepData.author.name} picture={cheepData.author.picture} /> :
                null
            }

            <div className="cheep-body">
                <div className="cheep-header">
                    {props.quote ?
                        <div className="header-picture-container">
                            {authorPicture}
                        </div> :
                        null
                    }

                    <Link className="author-name" to={`/${cheepData.author.handle}`} onClick={(ev) =>
                    {
                        ev.stopPropagation();
                    }}>
                        {cheepData.author.name}
                    </Link>

                    <Link className="author-handle" to={`/${cheepData.author.handle}`} onClick={(ev) =>
                    {
                        ev.stopPropagation();
                    }}>
                        @{cheepData.author.handle}
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
                        {cheepData.content ?
                            parseText(cheepData.content).map((token, index) =>
                            {
                                switch(token.type)
                                {
                                case TokenType.Plain:
                                    return <span key={`${index}-text`}>{token.value}</span>;

                                case TokenType.Hashtag:
                                    return <Link key={`${index}-hashtag`} className="hashtag" to={`/hashtag/${token.value.substring(1)}`}>
                                        {token.value}
                                    </Link>;
                                }
                            }) :
                            null
                        }
                    </span>

                    {props.quote && cheepData.quoteTarget ?
                        <span className="show-thread">Mostrar este hilo</span> :
                        null
                    }

                    {!props.quote && cheepData.gallery && cheepData.gallery.length > 0 ?
                        <div className="sub-container">
                            <Gallery pictures={cheepData.gallery} />
                        </div> :
                        null
                    }

                    {!props.quote && cheepData.quoteTarget ?
                        <div className="sub-container">
                            <Cheep id={`quote-${props.id}`} data={cheepData.quoteTarget} quote />
                        </div> :
                        null
                    }

                    {!props.quote ?
                        <div className="interaction-container">
                            <div className="interaction-button-container">
                                <CommentButton id={`comment-${props.id}`} cheepData={cheepData} counter={true} />
                            </div>
                            
                            <div className="interaction-button-container">
                                <RecheepButton id={`recheep-${props.id}`} cheepData={cheepData} active={recheep} counter={cheepData.recheepCount} onRecheep={() =>
                                {
                                    setRecheep((state) =>
                                    {
                                        return !state;
                                    });
                                }} />
                            </div>

                            <div className="interaction-button-container">
                                <LikeButton id={`like-${props.id}`} cheepId={cheepData.id} active={like} counter={cheepData.likeCount} onClick={() =>
                                {
                                    setLike((state) =>
                                    {
                                        return !state;
                                    });
                                }} />
                            </div>
                        </div> :
                        null
                    }
                </div>

                {props.quote && cheepData.gallery && cheepData.gallery.length > 0 ?
                    <div className="sub-container">
                        <Gallery pictures={cheepData.gallery} />
                    </div> :
                    null
                }
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