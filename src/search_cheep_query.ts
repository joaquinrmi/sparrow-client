interface SearchCheepsQuery
{
    words?: string;
    maxTime?: number;
    userHandle?: string;
    responses?: boolean;
    onlyGallery?: boolean;
    likes?: boolean;
}

export default SearchCheepsQuery;