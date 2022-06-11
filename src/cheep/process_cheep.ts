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
        commentCount: data.comments,
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
            result.responseOf = processCheep(data.responseOf, true);
            result.responseOf.existsJustBecauseItIsAResponseTarget = true;
        }
    }

    return result;
}

export default processCheep;