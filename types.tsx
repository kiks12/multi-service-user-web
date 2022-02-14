

export type User = {
    id: number,
    accessToken: string,
    username: string | null;
    email: string;
    image: string | null;
    cover: string | null;
    address: string | null;
    contact: string | null;

    shopName: string | null;
    skills: string | null;
    description: string | null;
    followers: number;
    likes: number;
    verifiedProvider: boolean;

    firstLogin: boolean;
    firstProviderLogin: boolean;
}