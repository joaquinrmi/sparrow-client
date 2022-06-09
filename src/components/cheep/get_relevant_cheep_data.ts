import CheepData from "../../cheep_data";

function getRelevantCheepData(data: CheepData): CheepData
{
    if(data.quoteTarget && data.content === undefined && data.gallery.length === 0)
    {
        return data.quoteTarget;
    }
    else
    {
        return data;
    }
}

export default getRelevantCheepData;