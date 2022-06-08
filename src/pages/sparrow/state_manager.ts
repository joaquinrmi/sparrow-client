import React from "react";
import CheepData from "../../cheep_data";
import SearchCheepsQuery from "../../search_cheep_query";
import SparrowState, { CheepListName, LocationName } from "./state";

class StateManager
{
    private setState?: React.Dispatch<React.SetStateAction<SparrowState>>;

    constructor(setState?: React.Dispatch<React.SetStateAction<SparrowState>>)
    {
        this.setState = setState;
    }

    navigate(locationName: LocationName, route: string): void
    {
        if(this.setState)
        {
            this.setState((state) =>
            {
                const newState = { ...state };

                newState.location[locationName].currentRoute = route;

                return newState;
            });
        }
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

    setEditorTargetCheep(targetCheep?: CheepData): void
    {
        if(this.setState)
        {
            this.setState((state) =>
            {
                const newState = { ...state };

                newState.cheepEditor.targetCheep = targetCheep;

                return newState;
            });
        }
    }

    openRecheepMenu(targetCheep: CheepData, position: [ number, number ], onClick: () => void): void
    {
        if(this.setState)
        {
            this.setState((state) =>
            {
                const newState = { ...state };

                newState.recheepMenu = {
                    targetCheep: targetCheep,
                    positionX: position[0],
                    positionY: position[1],
                    onClick: onClick
                };

                return newState;
            });
        }
    }

    closeRecheepMenu(): void
    {
        if(this.setState)
        {
            this.setState((state) =>
            {
                const newState = { ...state };

                newState.recheepMenu = undefined;

                return newState;
            });
        }
    }
}

export default StateManager;