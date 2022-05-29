import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import CheepData from "../../cheep_data";
import Cheep from "../../components/cheep";
import Gallery from "../../components/gallery";
import Loading from "../../components/loading";
import PageHeader from "../../components/page_header";
import UserPicture from "../../components/user_picture";
import MONTHS from "../../months";
import SetState from "../../set_state";
import CheepEditor from "../sparrow/components/cheep_editor";

import "./cheep_page.scss";

export interface Props
{
    cheepId: number;
    state: CheepPageState;
    setState: SetCheepPageState;
}

export interface CheepPageState
{
    cheepData?: CheepData;
}

export type SetCheepPageState = SetState<CheepPageState>;

const CheepPage: React.FunctionComponent<Props> = (props) =>
{
    useEffect(() =>
    {
        if(props.state.cheepData === undefined)
        {
            setTimeout(() =>
            {
                props.setState.cheepData({
                    id: 3,
                    author: {
                        handle: "sparrow",
                        name: "Sparrow",
                        picture: "https://www.revistaestilo.net/binrepository/trollface2_ES1218446_MG282389852.jpg",
                    },
                    dateCreated: new Date(),
                    content: "Ejemplo de galería",
                    gallery: [
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Eiche_bei_Graditz.jpg/1200px-Eiche_bei_Graditz.jpg",
                        "https://www.elagoradiario.com/wp-content/uploads/2021/04/Pino-Castrej%C3%B3n-1140x600.jpg",
                        "https://www.fundacionaquae.org/wp-content/uploads/2021/12/fresno-e1639053075597.jpg"
                    ],
                    commentCount: 0,
                    likeCount: 28600,
                    recheepCount: 0,
                    withCommentsCount: 0,
                    recheepped: false,
                    liked: false
                });
            },
            2000);
        }
    },
    [ props ]);

    let content: React.ReactNode;
    if(props.state.cheepData)
    {
        const date = props.state.cheepData.dateCreated;
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

        const profilePath = `/${props.state.cheepData.author.handle}`;

        const cheepPath = `/${props.state.cheepData.author.handle}/status/${props.state.cheepData.id}`;

        content = <section className="cheep-page-body">
            <div className="author-header">
                <UserPicture userHandle={props.state.cheepData.author.handle} userName={props.state.cheepData.author.name} picture={props.state.cheepData.author.picture} />

                <div className="author-info-container">
                    <Link to={profilePath} className="author-name">
                        {props.state.cheepData.author.name}
                    </Link>

                    <Link to={profilePath} className="author-handle">
                        @{props.state.cheepData.author.handle}
                    </Link>
                </div>
            </div>
            
            {props.state.cheepData.content && props.state.cheepData.content.length > 0 ?
                <div className="cheep-content">
                    {props.state.cheepData.content}
                </div>:
                null
            }

            {props.state.cheepData.gallery && props.state.cheepData.gallery.length > 0 ?
                <div className="sub-container">
                    <Gallery pictures={props.state.cheepData.gallery} />
                </div> :
                null
            }

            {props.state.cheepData.quoteTarget ?
                <div className="sub-container">
                    <Cheep data={props.state.cheepData.quoteTarget} />
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
                                {formatNumber(props.state.cheepData.recheepCount)}
                            </span>

                            <span className="counter-message">
                                Recheeps
                            </span>
                        </Link>

                        <Link className="cheep-counter" to={`${cheepPath}/with-comments`}>
                            <span className="counter-value">
                                {formatNumber(props.state.cheepData.withCommentsCount)}
                            </span>

                            <span className="counter-message">
                                Cheeps citados
                            </span>
                        </Link>

                        <Link className="cheep-counter" to={`${cheepPath}/likes`}>
                            <span className="counter-value">
                                {formatNumber(props.state.cheepData.likeCount)}
                            </span>

                            <span className="counter-message">
                                Me gusta
                            </span>
                        </Link>
                    </div>
                </div>

                <div className="buttons-container"></div>

                <div className="reply-container">
                    <CheepEditor />
                </div>
            </div>
        </section>;
    }
    else
    {
        content = <div className="loading-container">
            <Loading />
        </div>;
    }

    return <div className="cheep-page">
        <PageHeader>
            <span className="title">Cheep</span>
        </PageHeader>

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