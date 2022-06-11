async function loadCheep(cheepId: number): Promise<any>
{
    const loadCheepURL = `${process.env.REACT_APP_SERVER}/api/cheep/get?cheepId=${cheepId}`;

    const response = await fetch(loadCheepURL, {
        method: "GET",
        credentials: "include"
    });

    if(response.status === 200)
    {
        return await response.json();
    }

    throw await response.json();
}

export default loadCheep;