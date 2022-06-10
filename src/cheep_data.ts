interface CheepData
{
    id: number;
    author: {
        handle: string;
        name: string;
        picture: string;
    };
    dateCreated: Date;
    content?: string;
    gallery: Array<string>;
    quoteTarget?: CheepData;
    commentCount: number;
    likeCount: number;
    recheepCount: number;
    withCommentsCount: number;
    responseOf?: CheepData;
    recheepped: boolean;
    liked: boolean;
    existsJustBecauseItIsAResponseTarget?: boolean;
}

export default CheepData;