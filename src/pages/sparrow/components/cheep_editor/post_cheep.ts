import CreateCheepData from "./create_cheep_data";

async function postCheep(data: CreateCheepData): Promise<number>
{
    const postCheepURL = `${process.env.REACT_APP_SERVER}/api/cheep/create`;

    const response = await fetch(
        postCheepURL,
        {
            method: "POST",
            headers:
            {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
            credentials: "include"
        }
    );

    if(response.status === 201)
    {
        return await response.json();
    }
    else
    {
        throw await response.json();
    }
}

export default postCheep;