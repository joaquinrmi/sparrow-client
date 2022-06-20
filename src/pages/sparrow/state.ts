import AnotherUserData from "../../another_user_data";
import CheepData from "../../cheep_data";
import SearchCheepsQuery from "../../search_cheep_query";
import ProfileData from "./profile_data";

interface SparrowState
{
    location: {
        profile: LocationState;
        innerProfile: LocationState;
        relations: LocationState;
    };
    profile: {
        data: ProfileData;
    };
    cheepLists: {
        home: CheepListState;
        explore: CheepListState;
        profileCheeps: CheepListState;
        profileWithReplies: CheepListState;
        profileMedia: CheepListState;
        profileLikes: CheepListState;
        thread: CheepListState;
        comments: CheepListState;
        search: CheepListState;
    };
    userLists: {
        following: UserListState;
        followers: UserListState;
    };
    cheepPage?: {
        data: CheepData;
    },
    cheepGalleryModal?: {
        data: CheepData;
        photoIndex: number;
    },
    cheepEditor: {
        responseTarget?: CheepData;
        targetCheep?: CheepData;
    };
    recheepMenu?: {
        targetCheep: CheepData;
        active: boolean;
        positionX: number;
        positionY: number;
        onRecheep(): void;
    };
    closeConfirmation: {
        open: boolean;
        discart(): void;
    };
    unfollowConfirmation: {
        open: boolean;
        unfollow(): void;
    };
}

export interface LocationState
{
    currentRoute: string;
}

export interface CheepListState
{
    query: SearchCheepsQuery;
    nextTime: number;
    cheeps: Array<CheepData>;
    loadMore?: boolean;
    noMore?: boolean;
}

export interface UserListState
{
    users: Array<AnotherUserData>;
    loadMore?: boolean;
    noMore?: boolean;
}

export type LocationName = keyof SparrowState["location"];

export type CheepListName = keyof SparrowState["cheepLists"];

export default SparrowState;