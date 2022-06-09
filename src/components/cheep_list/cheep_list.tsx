import React, { useEffect, useContext } from "react";
import Cheep from "../cheep/";
import Loading from "../loading";

import SearchCheepsQuery from "../../search_cheep_query";
import CheepData from "../../cheep_data";
import StateContext from "../../pages/sparrow/state_context";
import { CheepListName } from "../../pages/sparrow/state";

import "./cheep_list.scss";

export interface Props
{
    name: CheepListName;
    arguments: SearchCheepsQuery;
}

const CheepList: React.FunctionComponent<Props> = (props) =>
{
    const [ state, stateManager ] = useContext(StateContext);

    const listState = state.cheepLists[props.name];

    useEffect(() =>
    {
        if(compareQuery(props.arguments, listState.query))
        {
            return;
        }

        (async () =>
        {
            try
            {
                const { cheeps, nextTime } = await loadCheeps(props.arguments);

                stateManager.loadCheepList(props.name, props.arguments, nextTime, cheeps);
            }
            catch(err)
            {
                stateManager.loadCheepList(props.name, props.arguments, 0, []);
            }
        })();
    },
    [ props.arguments ]);

    let content: React.ReactNode;
    if(compareQuery(props.arguments, listState.query))
    {
        content = <>{listState.cheeps.map((data, index) =>
        {
            return <Cheep id={`${index}-cheep-${props.name}`} key={`${index}-cheep`} data={data} />;
        })}</>;
    }
    else
    {
        content = <div className="loading-container">
            <Loading />
        </div>;
    }

    return <div className="cheep-list">
        {content}
    </div>;
};

async function loadCheeps(query: SearchCheepsQuery): Promise<{ cheeps: Array<CheepData>, nextTime: number }>
{
    const searchCheepsURL = `${process.env.REACT_APP_SERVER}/api/cheep/search${parseCheepQuery(query)}`;

    const response = await fetch(searchCheepsURL, {
        method: "GET",
        credentials: "include"
    });

    if(response.status === 200)
    {
        const { cheeps, nextTime } = (await response.json()) as { cheeps: Array<any>, nextTime: number };

        return {
            cheeps: cheeps.map((cheepData) => processCheep(cheepData)),
            nextTime: nextTime
        };
    }
    else
    {
        throw new Error();
    }
}

function processCheep(data: any): CheepData
{
    return {
        id: data.id,
        author: data.author,
        dateCreated: new Date(data.dateCreated),
        content: data.content || undefined,
        gallery: data.gallery || [],
        quoteTarget: data.quoteTarget ? processCheep(data.quoteTarget) : undefined,
        commentCount: data.commentCount,
        likeCount: data.likes,
        recheepCount: data.recheeps,
        withCommentsCount: data.quotes,
        responseOf: data.responseOf ? processCheep(data.responseOf) : undefined,
        recheepped: data.userRecheeppedIt,
        liked: data.userLikesIt
    };
}

function parseCheepQuery(query: SearchCheepsQuery): string
{
    let elements = new Array<string>();

    for(const arg in query)
    {
        elements.push(`${arg}=${query[arg as keyof SearchCheepsQuery]}`);
    }

    if(elements.length > 0)
    {
        return "?" + elements.join("&");
    }

    return "";
}

function compareQuery(first: SearchCheepsQuery, second: SearchCheepsQuery): boolean
{
    for(let key in first)
    {
        if(first[key as keyof SearchCheepsQuery] !== second[key as keyof SearchCheepsQuery])
        {
            return false;
        }
    }

    for(let key in second)
    {
        if(first[key as keyof SearchCheepsQuery] !== second[key as keyof SearchCheepsQuery])
        {
            return false;
        }
    }

    return true;
}

export default CheepList;