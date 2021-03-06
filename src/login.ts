import LoginForm from "./login_form";
import UserData from "./user_data";

async function login(form: LoginForm): Promise<UserData>
{
    if(process.env.REACT_APP_SERVER)
    {
        const loginURL = `${process.env.REACT_APP_SERVER}/api/user/login`;

        const response = await fetch(loginURL, {
            method: "POST",
            headers:
            {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form),
            credentials: "include"
        });

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

export default login;