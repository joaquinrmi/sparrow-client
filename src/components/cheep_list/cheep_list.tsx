import React, { useEffect, useContext } from "react";
import Cheep from "../cheep/";
import Loading from "../loading";
import loadCheeps from "../../cheep/load_cheeps";

import SearchCheepsQuery from "../../search_cheep_query";
import StateContext from "../../pages/sparrow/state_context";
import { CheepListName } from "../../pages/sparrow/state";

import "./cheep_list.scss";

export interface Props
{
    name: CheepListName;
    arguments: SearchCheepsQuery;
    hideResponseTarget?: boolean;
}

const CheepList: React.FunctionComponent<Props> = (props) =>
{
    const [ state, stateManager ] = useContext(StateContext);

    const listState = state.cheepLists[props.name];

    useEffect(
        () =>
        {
            (async () =>
            {
                if(listState.loadMore && !listState.noMore)
                {
                    let args: SearchCheepsQuery =
                    {
                        ...props.arguments,
                        maxTime: listState.nextTime
                    };

                    const { cheeps, nextTime } = await loadCheeps(args, props.hideResponseTarget);

                    stateManager.loadCheepList(props.name, props.arguments, nextTime, [ ...listState.cheeps, ...cheeps ]);

                    stateManager.setLoadMore(props.name, false);

                    if(cheeps.length < 20)
                    {
                        stateManager.loadNoMore(props.name);
                    }
                }
            })();
        },
        [ listState.loadMore ]
    );

    useEffect(
        () =>
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
        [ props.arguments ]
    );

    useEffect(
        () =>
        {
            const cheepList = document.querySelector(".cheep-list") as HTMLDivElement;

            const onScroll = () =>
            {
                const box = cheepList.getBoundingClientRect();

                if((box.height + box.top - window.innerHeight < 1000) && listState.cheeps.length >= 20)
                {
                    stateManager.setLoadMore(props.name, true);
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
        }
    );

    let content: React.ReactNode;
    if(compareQuery(props.arguments, listState.query))
    {
        content = <>
            {listState.cheeps.map(
                (data, index) =>
                {
                    return <Cheep id={`${index}-cheep-${props.name}`} index={index} listName={props.name} key={`${index}-cheep`} data={data} />;
                }
            )}
        </>;
    }
    else
    {
        content = <div className="loading-container">
            <Loading />
        </div>;
    }

    return <div className="cheep-list">
        {content}

        {listState.loadMore && !listState.noMore ?
            <div className="loading-container">
                <Loading />
            </div> :
            null
        }
    </div>;
};

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