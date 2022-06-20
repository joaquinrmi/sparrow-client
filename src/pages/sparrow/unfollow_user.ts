async function unfollowUser(userHandle: string): Promise<boolean>
{
    const unfollowURL = `${process.env.REACT_APP_SERVER}/api/user/unfollow`;

    const response = await fetch(unfollowURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userHandle
        }),
        credentials: "include"
    });

    return response.status === 200;
}

export default unfollowUser;