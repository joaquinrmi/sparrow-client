async function getCheep(cheepId: number): Promise<any>
{
    const getCheepURL = `${process.env.REACT_APP_SERVER}/api/cheep/get?cheepId=${cheepId}`;

    const response = await fetch(
        getCheepURL,
        {
            method: "GET",
            credentials: "include"
        }
    );

    if(response.status === 200)
    {
        return await response.json();
    }

    throw await response.json();
}

export default getCheep;