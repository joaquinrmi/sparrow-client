async function deleteRecheep(targetId: number): Promise<boolean>
{
    const deleteRecheepURL = `${process.env.REACT_APP_SERVER}/api/cheep/delete-recheep?targetId=${targetId}`;

    const response = await fetch(deleteRecheepURL, {
        method: "POST",
        credentials: "include"
    });

    if(response.status === 200)
    {
        return true;
    }
    else
    {
        console.log(response.status, await response.json());
    }

    return false;
}

export default deleteRecheep;