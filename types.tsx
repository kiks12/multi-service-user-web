

export type User = {
    image: String | null;
    username: String | null;
    email: String;
    id: number;
    address: String | null,
    contact: String | null;
    firstLogin: boolean;
    firstProviderLogin: boolean;
    verifiedProvider: boolean;
}