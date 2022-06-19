interface ProfileData
{
    handle?: string;
    name: string;
    picture: string;
    banner?: string;
    description?: string;
    joinDate: Date;
    birthdate?: Date;
    location?: string;
    website?: string;
    followersCount: number;
    followingCount: number;
    cheepCount: number;
    following: boolean;
}

export default ProfileData;