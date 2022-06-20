async function unfollowUser(userHandle: string): Promise<boolean>
{
    const unfollowURL = `${process.env.REACT_APP_SERVER}/api/user/unfollow?userHandle=${userHandle}`;

    const response = await fetch(unfollowURL, {
        method: "POST",
        credentials: "include"
    });

    return response.status === 200;
}

export default unfollowUser;