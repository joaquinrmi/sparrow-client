interface SearchCheepsQuery
{
    words?: string;
    maxTime?: number;
    userHandle?: string;
    responses?: boolean;
    onlyGallery?: boolean;
    likes?: boolean;
    responseOf?: number;
    quoteTarget?: number;
    recheepTarget?: number;
    timeline?: boolean;
    explore?: boolean;
}

export default SearchCheepsQuery;