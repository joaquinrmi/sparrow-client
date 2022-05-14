import UserData from "./user_data";

interface UserSession
{
    logged: boolean;
    data: UserData;

    login(data: UserData): void;
    logout(): void;
}

export default UserSession;