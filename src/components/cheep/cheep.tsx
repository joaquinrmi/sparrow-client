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
import getRelevantCheepData from "./get_relevant_cheep_data";
import StateContext from "../../pages/sparrow/state_context";
import { CheepListName } from "../../pages/sparrow/state";

import "./cheep.scss";

export interface Props
{
    id: string;
    data: CheepData;
    index?: number;
    listName?: CheepListName;
    quote?: boolean;
    response?: boolean;
}

const Cheep: React.FunctionComponent<Props> = (props) =>
{
    const cheepData = getRelevantCheepData(props.data);

    const [ cheepDate, setCheepDate ] = useState<string>(formatDate(cheepData.dateCreated));

    const userSession = useContext(SessionContext);
    const [ state, stateManager ] = useContext(StateContext);

    const like = cheepData.liked;
    const recheep = cheepData.recheepped;

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

    return <div className={`cheep ${props.quote ? "quote-form" : ""} ${props.response ? "response-form" : ""}`} onClick={(ev) =>
    {
        if(props.response)
        {
            return;
        }

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
                <div className="left-cheep-column">
                    <UserPicture userHandle={cheepData.author.handle} userName={cheepData.author.name} picture={cheepData.author.picture} notClickeable={props.response ? true : false} />

                    {props.response ?
                        <div className="silver-line-container">
                            <div className="silver-line"></div>
                        </div> :
                        null}
                </div> :
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

                    {props.response ?
                        <>
                            <span className="author-name">{cheepData.author.name}</span>
                            <span className="author-handle">@{cheepData.author.handle}</span>
                            <span className="separator">·</span>
                            <span className="cheep-date">{cheepDate}</span>
                        </> :
                        <>
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
                        </>
                    }
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
                                    if(props.response)
                                    {
                                        return <span key={`${index}-hashtag`} className="hashtag">
                                            {token.value}
                                        </span>;
                                    }
                                    else
                                    {
                                        return <Link key={`${index}-hashtag`} className="hashtag" to={`/hashtag/${token.value.substring(1)}`}>
                                            {token.value}
                                        </Link>;
                                    }
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
                                <RecheepButton id={`recheep-${props.id}`} cheepData={props.data} active={recheep} counter={cheepData.recheepCount} onRecheep={() =>
                                {
                                    let targetCheepData = { ...props.data };
                                    if(props.data === cheepData)
                                    {
                                        updateRecheep(targetCheepData, recheep);
                                    }
                                    else if(targetCheepData.quoteTarget)
                                    {
                                        updateRecheep(targetCheepData.quoteTarget, recheep);
                                    }

                                    if(props.listName !== undefined && props.index !== undefined)
                                    {
                                        stateManager.updateCheep(props.listName, props.index, targetCheepData);
                                    }
                                }} />
                            </div>

                            <div className="interaction-button-container">
                                <LikeButton id={`like-${props.id}`} cheepId={cheepData.id} active={like} counter={cheepData.likeCount} onClick={() =>
                                {
                                    let targetCheepData = { ...props.data };
                                    if(props.data === cheepData)
                                    {
                                        updateLike(targetCheepData, like);
                                    }
                                    else if(targetCheepData.quoteTarget)
                                    {
                                        updateLike(targetCheepData.quoteTarget, like);
                                    }

                                    if(props.listName !== undefined && props.index !== undefined)
                                    {
                                        stateManager.updateCheep(props.listName, props.index, targetCheepData);
                                    }
                                }} />
                            </div>
                        </div> :
                        null
                    }

                    {props.response ?
                        <div className="response-message">
                            <span>Respondiendo a </span>

                            <span className="response-author">
                                @{props.data.author.handle}
                            </span>
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

function updateRecheep(data: CheepData, recheep: boolean): void
{
    if(recheep)
    {
        data.recheepped = false;
        data.recheepCount -= 1;
    }
    else
    {
        data.recheepped = true;
        data.recheepCount += 1;
    }
}

function updateLike(data: CheepData, like: boolean): void
{
    if(like)
    {
        data.liked = false;
        data.likeCount -= 1;
    }
    else
    {
        data.liked = true;
        data.likeCount += 1;
    }
}

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