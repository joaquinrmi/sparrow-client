import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CheepData from "../../cheep_data";
import MONTHS from "../../months";
import CommentButton from "../../pages/sparrow/components/comment_button";
import LikeButton from "../../pages/sparrow/components/like_button";
import RecheepButton from "../../pages/sparrow/components/recheep_button";
import parseText, { TokenType } from "../../parse_text";
import Gallery from "../gallery";
import UserPicture from "../user_picture";

import "./cheep.scss";

export interface Props
{
    data: CheepData;
    quote?: boolean;
}

const Cheep: React.FunctionComponent<Props> = (props) =>
{
    const [ cheepDate, setCheepDate ] = useState<string>(formatDate(props.data.dateCreated));
    const [ like, setLike ] = useState<boolean>(props.data.liked);

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
    const authorPicture = <>
        <div className="cheep-picture" style={{
            backgroundImage: `url(${props.data.author.picture})`
        }} title={`Foto de perfil de @${props.data.author.name}`} />

        <div className="veil"></div>
    </>;

    return <div className={`cheep ${props.quote ? "quote-form" : ""}`} onClick={(ev) =>
    {
        ev.stopPropagation();
        navigate(cheepLink);
    }}>
        {!props.quote ?
            <UserPicture userHandle={props.data.author.handle} userName={props.data.author.name} picture={props.data.author.picture} /> :
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
                    {props.data.content ?
                        parseText(props.data.content).map((token, index) =>
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

                {props.quote && props.data.quoteTarget ?
                    <span className="show-thread">Mostrar este hilo</span> :
                    null
                }

                {!props.quote && props.data.gallery && props.data.gallery.length > 0 ?
                    <div className="sub-container">
                        <Gallery pictures={props.data.gallery} />
                    </div> :
                    null
                }

                {!props.quote && props.data.quoteTarget ?
                    <div className="sub-container">
                        <Cheep data={props.data.quoteTarget} quote />
                    </div> :
                    null
                }

                {!props.quote ?
                    <div className="interaction-container">
                        <div className="interaction-button-container">
                            <CommentButton cheepData={props.data} counter={true} />
                        </div>
                        
                        <div className="interaction-button-container">
                            <RecheepButton cheepId={props.data.id} active={props.data.recheepped} counter={props.data.recheepCount} />
                        </div>

                        <div className="interaction-button-container">
                            <LikeButton cheepId={props.data.id} active={like} counter={props.data.likeCount} onClick={() =>
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

            {props.quote && props.data.gallery && props.data.gallery.length > 0 ?
                <div className="sub-container">
                    <Gallery pictures={props.data.gallery} />
                </div> :
                null
            }
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