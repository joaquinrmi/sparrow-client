interface SearchCheepsQuery
{
    words?: string;
    maxTime?: number;
    userHandle?: string;
    responses?: boolean;
    onlyGallery?: boolean;
    likes?: boolean;
    responseOf?: number;
}

export default SearchCheepsQuery;