import React from "react";
import AnotherUserData from "../../another_user_data";
import CheepData from "../../cheep_data";
import SearchCheepsQuery from "../../search_cheep_query";
import ProfileData from "./profile_data";
import SparrowState, { CheepListName, LocationName, UserListName } from "./state";

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
                    cheeps: cheeps,
                    loadMore: false,
                    noMore: false
                };

                return newState;
            });
        }
    }

    setLoadMore(listName: CheepListName, loadMore: boolean): void
    {
        if(this.setState)
        {
            this.setState((state) =>
            {
                const newState = { ...state };

                newState.cheepLists[listName].loadMore = loadMore;

                return newState;
            });
        }
    }

    loadNoMore(listName: CheepListName): void
    {
        if(this.setState)
        {
            this.setState((state) =>
            {
                const newState = { ...state };

                newState.cheepLists[listName].noMore = true;

                return newState;
            });
        }
    }

    loadUserList(listName: UserListName, id: string, targetHandle: string, users: Array<AnotherUserData>): void
    {
        if(this.setState)
        {
            this.setState((state) =>
            {
                const newState = { ...state };

                newState.userLists[listName] = {
                    id: id,
                    targetHandle: targetHandle,
                    users: users,
                    loadMore: false,
                    noMore: false
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

    setCheepGalleryModal(data: CheepData, photoIndex: number): void
    {
        if(this.setState)
        {
            this.setState((state) =>
            {
                const newState = { ...state };

                newState.cheepGalleryModal = {
                    data: data,
                    photoIndex: photoIndex
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

    openCloseConfirmation(discart: () => void): void
    {
        this.setCloseConfirmation(true, discart);
    }

    closeCloseConfirmation(): void
    {
        this.setCloseConfirmation(false, () => {});
    }

    openUnfollowConfirmation(userHandle: string, unfollow: () => void): void
    {
        this.setUnfollowConfirmation(true, userHandle, unfollow);
    }

    closeUnfollowConfirmation(): void
    {
        this.setUnfollowConfirmation(false, "", () => {});
    }

    private setCloseConfirmation(status: boolean, discart: () => void): void
    {
        if(this.setState)
        {
            this.setState((state) =>
            {
                const newState = { ...state };

                newState.closeConfirmation = {
                    open: status,
                    discart: discart
                };

                return newState;
            });
        }
    }

    private setUnfollowConfirmation(status: boolean, userHandle: string, unfollow: () => void): void
    {
        if(this.setState)
        {
            this.setState((state) =>
            {
                const newState = { ...state };

                newState.unfollowConfirmation = {
                    open: status,
                    userHandle: userHandle,
                    unfollow: unfollow
                };

                return newState;
            });
        }
    }
}

export default StateManager;