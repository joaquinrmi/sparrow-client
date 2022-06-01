import CheepData from "../../cheep_data";
import SearchCheepsQuery from "../../search_cheep_query";

interface SparrowState
{
    cheepLists: {
        home: CheepListState;
        explore: CheepListState;
        profileCheeps: CheepListState;
        profileWithReplies: CheepListState;
        profileMedia: CheepListState;
        profileLikes: CheepListState;
    };
}

export interface CheepListState
{
    query: SearchCheepsQuery;
    cheeps: Array<CheepData>;
}

export type CheepListName = keyof SparrowState["cheepLists"];

export default SparrowState;