import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import getCheep from "../../cheep/get_cheep";
import processCheep from "../../cheep/process_cheep";
import CheepData from "../../cheep_data";
import Cheep from "../../components/cheep";
import CheepList from "../../components/cheep_list";
import Gallery from "../../components/gallery";
import Loading from "../../components/loading";
import PageHeader from "../../components/page_header";
import Thread from "../../components/thread";
import UserPicture from "../../components/user_picture";
import MONTHS from "../../months";
import CheepEditor from "../sparrow/components/cheep_editor";
import StateContext from "../sparrow/state_context";

import "./cheep_page.scss";

export interface Props
{
    id: string;
    cheepId: number;
    data?: CheepData;
    hideGallery?: boolean;
    hideHeader?: boolean;
}

const CheepPage: React.FunctionComponent<Props> = (props) =>
{
    const [ state, stateManager ] = useContext(StateContext);

    let cheepData: CheepData | undefined;
    if(props.data !== undefined)
    {
        cheepData = props.data
    }
    else if(state.cheepPage && state.cheepPage.data.id === props.cheepId)
    {
        cheepData = state.cheepPage.data;
    }

    useEffect(() =>
    {
        if(cheepData === undefined || cheepData.id !== props.cheepId)
        {
            (async () =>
            {
                try
                {
                    var responseData = await getCheep(props.cheepId);
                }
                catch(err)
                {
                    return console.error(err);
                }

                const cheepData = processCheep(responseData, true);

                let upperCheeps = new Array<CheepData>();

                let currentData = cheepData;
                while(currentData.responseOf !== undefined)
                {
                    upperCheeps = [ currentData.responseOf, ...upperCheeps ];
                    currentData = currentData.responseOf;
                }

                stateManager.setCheepPage(cheepData);
                stateManager.loadCheepList("thread", {}, 0, upperCheeps);
            })();
        }
    });

    let content: React.ReactNode;
    if(cheepData)
    {
        const date = cheepData.dateCreated;
        let formatedDate = "";

        const minutes = date.getMinutes();
        const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;

        const hours = date.getHours();
        if(hours > 0 && hours < 12)
        {
            formatedDate = `${hours}:${minutesStr} a. m.`;
        }
        else if(hours > 12 && hours < 24)
        {
            formatedDate = `${hours - 12}:${minutesStr} p. m.`;
        }
        else if(hours === 0)
        {
            formatedDate = "12:00 a. m.";
        }
        else
        {
            formatedDate = "12:00 p. m.";
        }

        formatedDate += ` · ${date.getDate()} ${MONTHS[date.getMonth()].substring(0, 3).toLowerCase()}. ${date.getFullYear()}`;

        const profilePath = `/${cheepData.author.handle}`;

        const cheepPath = `/${cheepData.author.handle}/status/${cheepData.id}`;

        content = <>
            <Thread name="thread" />

            <section className="cheep-page-body">
                <div className="author-header">
                    <UserPicture userHandle={cheepData.author.handle} userName={cheepData.author.name} picture={cheepData.author.picture} />

                    <div className="author-info-container">
                        <Link to={profilePath} className="author-name">
                            {cheepData.author.name}
                        </Link>

                        <Link to={profilePath} className="author-handle">
                            @{cheepData.author.handle}
                        </Link>
                    </div>
                </div>
                
                {cheepData.content && cheepData.content.length > 0 ?
                    <div className="cheep-content">
                        {cheepData.content}
                    </div>:
                    null
                }

                {!props.hideGallery && cheepData.gallery && cheepData.gallery.length > 0 ?
                    <div className="sub-container">
                        <Gallery pictures={cheepData.gallery} userHandle={cheepData.author.handle} cheepId={cheepData.id} />
                    </div> :
                    null
                }

                {cheepData.quoteTarget ?
                    <div className="sub-container">
                        <Cheep id={`quote-${props.id}`} data={cheepData.quoteTarget} />
                    </div> :
                    null
                }

                <div className="date-container">
                    <Link to={profilePath} className="cheep-date">
                        {formatedDate}
                    </Link>
                </div>

                <div className="cheep-page-bottom">
                    <div className="counters-container">
                        <div className="counters-list">
                            <Link className="cheep-counter" to={`${cheepPath}/recheeps`}>
                                <span className="counter-value">
                                    {formatNumber(cheepData.recheepCount)}
                                </span>

                                <span className="counter-message">
                                    Recheeps
                                </span>
                            </Link>

                            <Link className="cheep-counter" to={`${cheepPath}/with-comments`}>
                                <span className="counter-value">
                                    {formatNumber(cheepData.withCommentsCount)}
                                </span>

                                <span className="counter-message">
                                    Cheeps citados
                                </span>
                            </Link>

                            <Link className="cheep-counter" to={`${cheepPath}/likes`}>
                                <span className="counter-value">
                                    {formatNumber(cheepData.likeCount)}
                                </span>

                                <span className="counter-message">
                                    Me gusta
                                </span>
                            </Link>
                        </div>
                    </div>

                    <div className="buttons-container"></div>

                    <div className="reply-container">
                        <CheepEditor id="cheep-editor-page" responseTarget={cheepData.responseOf ? cheepData.responseOf : undefined} inPage />
                    </div>
                </div>
            </section>

            <CheepList name="comments" hideResponseTarget arguments={{
                responseOf: cheepData.id
            }} />
        </>;
    }
    else
    {
        content = <div className="loading-container">
            <Loading />
        </div>;
    }

    return <div id={props.id} className="cheep-page">
        {!props.hideHeader ?
            <PageHeader>
                <span className="title">Cheep</span>
            </PageHeader> :
            null
        }

        {content}
    </div>;
};

function formatNumber(num: number): string
{
    if(num < 1000)
    {
        return `${num}`;
    }

    if(num < 10_000)
    {
        let a = num / 1000;
        let b = Math.floor(a);
        return `${b}.${(a - b) * 1000}`;
    }

    return `${Math.floor(num / 100) / 10} mil`;
}

export default CheepPage;