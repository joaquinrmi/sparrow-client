import React from "react";
import CheepData from "../../cheep_data";
import SearchCheepsQuery from "../../search_cheep_query";
import SparrowState, { CheepListName } from "./state";

class StateManager
{
    private setState?: React.Dispatch<React.SetStateAction<SparrowState>>;

    constructor(setState?: React.Dispatch<React.SetStateAction<SparrowState>>)
    {
        this.setState = setState;
    }

    loadCheepList(listName: CheepListName, query: SearchCheepsQuery, nextTime: number, cheeps: Array<CheepData>): void
    {
        if(this.setState)
        {
            this.setState((state) =>
            {
                const newState = { ...state };

                newState.cheepLists[listName] = {
                    query: query,
                    nextTime: nextTime,
                    cheeps: cheeps
                };

                return newState;
            });
        }
    }
}

export default StateManager;