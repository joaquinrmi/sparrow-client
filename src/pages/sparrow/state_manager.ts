import React from "react";
import CheepData from "../../cheep_data";
import SearchCheepsQuery from "../../search_cheep_query";
import ProfileData from "./profile_data";
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

    setProfileState(data: ProfileData): void
    {
        if(this.setState)
        {
            this.setState((state) =>
            {
                const newState = { ...state };

                newState.profile.data = { ...data };

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

    updateCheep(listName: CheepListName, index: number, data: CheepData): void
    {
        if(this.setState)
        {
            this.setState((state) =>
            {
                const newState = { ...state };

                newState.cheepLists[listName].cheeps[index] = data;

                return newState;
            });
        }
    }

    setCheepPage(data: CheepData): void
    {
        if(this.setState)
        {
            this.setState((state) =>
            {
                const newState = { ...state };

                newState.cheepPage = {
                    data: data
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

    setEditorResponseTarget(responseTarget?: CheepData): void
    {
        if(this.setState)
        {
            this.setState((state) =>
            {
                const newState = { ...state };

                newState.cheepEditor.responseTarget = responseTarget;

                return newState;
            });
        }
    }

    openRecheepMenu(targetCheep: CheepData, active: boolean, position: [ number, number ], onRecheep: () => void): void
    {
        if(this.setState)
        {
            this.setState((state) =>
            {
                const newState = { ...state };

                newState.recheepMenu = {
                    targetCheep: targetCheep,
                    active: active,
                    positionX: position[0],
                    positionY: position[1],
                    onRecheep: onRecheep
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

    openCloseConfirmation(): void
    {
        this.setCloseConfirmation(true);
    }

    closeCloseConfirmation(): void
    {
        this.setCloseConfirmation(false);
    }

    private setCloseConfirmation(status: boolean): void
    {
        if(this.setState)
        {
            this.setState((state) =>
            {
                const newState = { ...state };

                newState.closeConfirmation.open = status;

                return newState;
            });
        }
    }
}

export default StateManager;