import CheepData from "../cheep_data";
import SearchCheepsQuery from "../search_cheep_query";
import processCheep from "./process_cheep";

async function loadCheeps(query: SearchCheepsQuery, hideResponseTarget?: boolean): Promise<{ cheeps: Array<CheepData>, nextTime: number }>
{
    let q: SearchCheepsQuery;
    let url = "";

    if(query.explore)
    {
        q = {
            maxTime: query.maxTime
        };

        url = `${process.env.REACT_APP_SERVER}/api/cheep/explore`;
    }
    else if(query.timeline)
    {
        q = {
            maxTime: query.maxTime
        };
        
        url = `${process.env.REACT_APP_SERVER}/api/cheep/timeline`;
    }
    else
    {
        q = { ...query };
        url = `${process.env.REACT_APP_SERVER}/api/cheep/search`;
    }

    const searchCheepsURL = `${url}${parseCheepQuery(q)}`;

    const response = await fetch(
        searchCheepsURL,
        {
            method: "GET",
            credentials: "include"
        }
    );

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
        if(query[arg as keyof SearchCheepsQuery] === undefined) continue;
        elements.push(`${arg}=${query[arg as keyof SearchCheepsQuery]}`);
    }

    if(elements.length > 0)
    {
        return "?" + elements.join("&");
    }

    return "";
}

export default loadCheeps;