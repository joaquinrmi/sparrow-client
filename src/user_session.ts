import SessionData from "./session_data";
import UserData from "./user_data";

interface UserSession extends SessionData
{
    login(data: UserData): void;
    logout(): void;
}

export default UserSession;