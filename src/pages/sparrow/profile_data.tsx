interface ProfileData
{
    handle: string;
    name: string;
    picture: string;
    banner: string;
    description: string;
    location: string;
    birthdate?: Date;
    joinDate: Date;
    website: string;
    cheepCount: number;
    followersCount: number;
    followingCount: number;
}

export default ProfileData;