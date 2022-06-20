async function followUser(userHandle: string): Promise<boolean>
{
    const followURL = `${process.env.REACT_APP_SERVER}/api/user/follow?userHandle=${userHandle}`;

    const response = await fetch(followURL, {
        method: "POST",
        credentials: "include"
    });

    return response.status === 201;
}

export default followUser;