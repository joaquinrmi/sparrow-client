import React, { useEffect, useContext, useState } from "react";
import Cheep from "../cheep/";
import Loading from "../loading";

import SearchCheepsQuery from "../../search_cheep_query";
import CheepData from "../../cheep_data";
import StateContext from "../../pages/sparrow/state_context";
import { CheepListName } from "../../pages/sparrow/state";
import processCheep from "../../cheep/process_cheep";

import "./cheep_list.scss";

export interface Props
{
    name: CheepListName;
    arguments: SearchCheepsQuery;
    hideResponseTarget?: boolean;
}

const CheepList: React.FunctionComponent<Props> = (props) =>
{
    const [ loadMore, setLoadMore ] = useState<boolean>(false);
    const [ noMore, setNoMore ] = useState<boolean>(false);

    const [ state, stateManager ] = useContext(StateContext);

    const listState = state.cheepLists[props.name];

    useEffect(() =>
    {
        (async () =>
        {
            if(loadMore && !noMore)
            {
                let args: SearchCheepsQuery = {
                    ...props.arguments,
                    maxTime: listState.nextTime
                };

                const { cheeps, nextTime } = await loadCheeps(args, props.hideResponseTarget);

                stateManager.loadCheepList(props.name, props.arguments, nextTime, [ ...listState.cheeps, ...cheeps ]);

                setLoadMore(false);

                if(cheeps.length < 20)
                {
                    setNoMore(true);
                }
            }
        })();
    },
    [ loadMore ]);

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
                const { cheeps, nextTime } = await loadCheeps(props.arguments, props.hideResponseTarget);

                stateManager.loadCheepList(props.name, props.arguments, nextTime, cheeps);
            }
            catch(err)
            {
                stateManager.loadCheepList(props.name, props.arguments, 0, []);
            }
        })();
    },
    [ props.arguments ]);

    useEffect(() =>
    {
        const cheepList = document.querySelector(".cheep-list") as HTMLDivElement;

        const onScroll = () =>
        {
            const box = cheepList.getBoundingClientRect();

            if(box.height + box.top - window.innerHeight < 1000)
            {
                setLoadMore(true);
            }
        };

        document.addEventListener("scroll", onScroll);

        const onResize = () =>
        {
            const lastChild = cheepList.lastChild as HTMLDivElement;
            if(lastChild === null || lastChild === undefined)
            {
                return;
            }

            const box = lastChild.getBoundingClientRect();

            cheepList.style.paddingBottom = `${window.innerHeight - box.height}px`;
        }

        window.addEventListener("resize", onResize);

        onResize();

        return () =>
        {
            document.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onResize);
        }
    });

    let content: React.ReactNode;
    if(compareQuery(props.arguments, listState.query))
    {
        content = <>{listState.cheeps.map((data, index) =>
        {
            return <Cheep id={`${index}-cheep-${props.name}`} index={index} listName={props.name} key={`${index}-cheep`} data={data} />;
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

        {loadMore && !noMore ?
            <div className="loading-container">
                <Loading />
            </div> :
            null
        }
    </div>;
};

async function loadCheeps(query: SearchCheepsQuery, hideResponseTarget?: boolean): Promise<{ cheeps: Array<CheepData>, nextTime: number }>
{
    const searchCheepsURL = `${process.env.REACT_APP_SERVER}/api/cheep/search${parseCheepQuery(query)}`;

    const response = await fetch(searchCheepsURL, {
        method: "GET",
        credentials: "include"
    });

    if(response.status === 200)
    {
        const { cheeps, nextTime } = (await response.json()) as { cheeps: Array<any>, nextTime: number };

        let processedCheeps = new Array<CheepData>();
        for(let i = 0; i < cheeps.length; ++i)
        {
            const cheep = processCheep(cheeps[i]);

            if(!hideResponseTarget && cheeps[i].responseOf !== undefined)
            {
                const responseTarget = processCheep(cheeps[i].responseOf);
                responseTarget.existsJustBecauseItIsAResponseTarget = true;
                cheep.responseOf = responseTarget;

                processedCheeps.push(responseTarget);
            }

            processedCheeps.push(cheep);
        }

        return {
            cheeps: processedCheeps,
            nextTime: nextTime
        };
    }
    else
    {
        throw new Error();
    }
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