interface CheepData
{
    id: number;
    author: {
        handle: string;
        name: string;
        picture: string;
    };
    dateCreated: Date;
    quoteTarget: number;
    content: string;
    gallery: Array<string>;
    commentCount: number;
    likeCount: number;
    recheepCount: number;
    responseOf?: CheepData;
}

export default CheepData;