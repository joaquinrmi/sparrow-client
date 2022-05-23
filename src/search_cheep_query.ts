interface SearchCheepsQuery
{
    words?: string;
    maxTime?: number;
    userHandle?: string;
    responses?: boolean;
    onlyGallery: boolean;
}

export default SearchCheepsQuery;