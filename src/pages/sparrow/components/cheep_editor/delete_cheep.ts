async function deleteCheep(cheepId: number): Promise<boolean>
{
    const deleteCheepURL = `${process.env.REACT_APP_SERVER}/api/cheep/delete?cheepId=${cheepId}`;

    const response = await fetch(
        deleteCheepURL,
        {
            method: "POST",
            credentials: "include"
        }
    );

    if(response.status === 200)
    {
        return true;
    }

    return false;
}

export default deleteCheep;