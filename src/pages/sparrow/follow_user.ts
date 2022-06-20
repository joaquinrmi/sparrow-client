async function followUser(userHandle: string): Promise<boolean>
{
    const followURL = `${process.env.REACT_APP_SERVER}/api/user/follow`;

    const response = await fetch(followURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userHandle
        }),
        credentials: "include"
    });

    return response.status === 201;
}

export default followUser;