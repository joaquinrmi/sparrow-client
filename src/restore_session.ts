import UserData from "./user_data";

async function restoreSession(): Promise<UserData>
{
    if(process.env.REACT_APP_SERVER)
    {
        const restoreSessionURL = `${process.env.REACT_APP_SERVER}/api/user/restore-session`;

        const response = await fetch(
            restoreSessionURL,
            {
                method: "POST",
                headers:
                {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            }
        );

        if(response.status === 200)
        {
            const data = await response.json();

            return {
                handle: data.handle,
                name: data.name,
                picture: data.picture
            };
        }
        else
        {
            throw await response.json();
        }
    }
    else
    {
        throw new Error("The server URL is not defined.");
    }
}

export default restoreSession;