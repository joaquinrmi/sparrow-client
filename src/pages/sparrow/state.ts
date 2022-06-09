import CheepData from "../../cheep_data";
import SearchCheepsQuery from "../../search_cheep_query";
import ProfileData from "./profile_data";

interface SparrowState
{
    location: {
        profile: LocationState;
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
    };
    cheepEditor: {
        targetCheep?: CheepData;
    };
    recheepMenu?: {
        targetCheep: CheepData;
        active: boolean;
        positionX: number;
        positionY: number;
        onRecheep(): void;
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
}

export type LocationName = keyof SparrowState["location"];

export type CheepListName = keyof SparrowState["cheepLists"];

export default SparrowState;