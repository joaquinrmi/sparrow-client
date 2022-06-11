import CheepData from "../cheep_data";

function processCheep(data: any, processResponseTarget?: boolean): CheepData
{
    const result: CheepData = {
        id: data.id,
        author: data.author,
        dateCreated: new Date(data.dateCreated),
        content: data.content || undefined,
        gallery: data.gallery || [],
        quoteTarget: data.quoteTarget ? processCheep(data.quoteTarget) : undefined,
        commentCount: data.commentCount,
        likeCount: data.likes,
        recheepCount: data.recheeps,
        withCommentsCount: data.quotes,
        recheepped: data.userRecheeppedIt,
        liked: data.userLikesIt
    };

    if(processResponseTarget)
    {
        if(data.responseOf)
        {
            result.responseOf = processCheep(result.responseOf, true);
        }
    }

    return result;
}

export default processCheep;