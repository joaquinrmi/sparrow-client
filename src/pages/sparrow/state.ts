import AnotherUserData from "../../another_user_data";
import CheepData from "../../cheep_data";
import SearchCheepsQuery from "../../search_cheep_query";
import ProfileData from "./profile_data";

interface SparrowState
{
    location:
    {
        profile: LocationState;
        innerProfile: LocationState;
        relations: LocationState;
        cheepPage: LocationState;
        mainAsideSearch: LocationState;
        mainAsideGallery: LocationState;
    };
    profile:
    {
        data: ProfileData;
    };
    cheepLists:
    {
        home: CheepListState;
        explore: CheepListState;
        profileCheeps: CheepListState;
        profileWithReplies: CheepListState;
        profileMedia: CheepListState;
        profileLikes: CheepListState;
        thread: CheepListState;
        comments: CheepListState;
        search: CheepListState;
        quotes: CheepListState;
        userGallery: CheepListState;
    };
    userLists:
    {
        following: UserListState;
        followers: UserListState;
        likes: UserListState;
        recheeps: UserListState;
        asideRecommended: UserListState;
        recommended: UserListState;
    };
    cheepPage?:
    {
        data: CheepData;
    },
    cheepGalleryModal?:
    {
        data: CheepData;
        photoIndex: number;
    },
    cheepEditor:
    {
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
    moreOptionsMenu?:
    {
        targetCheep: CheepData;
        active: boolean;
        positionX: number;
        positionY: number;
        onDelete(): void;
    };
    accountMenu?:
    {
        positionX: number;
        positionY: number;
    };
    closeConfirmation:
    {
        open: boolean;
        discart(): void;
    };
    unfollowConfirmation:
    {
        open: boolean;
        userHandle: string;
        unfollow(): void;
    };
    mainAside:
    {
        userHandle: string;
    };
    statusMessage:
    {
        message: string;
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
    id: string;
    target: string | number;
    users: Array<AnotherUserData>;
    loadMore?: boolean;
    noMore?: boolean;
}

export type LocationName = keyof SparrowState["location"];

export type CheepListName = keyof SparrowState["cheepLists"];
export type UserListName = keyof SparrowState["userLists"];

export default SparrowState;