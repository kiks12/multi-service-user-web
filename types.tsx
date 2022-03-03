

export type User = {
    userId: number,
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



export type Service = {
    serviceId: number, 
    userId: string, 
    title: string, 
    serviceDetails: string, 
    status: 'active' | 'inactive',
    priceType: 'Flat Rate' | 'Range',
    priceInitial: number, 
    priceFinal: number, 
    unavailableDates: string, 
    dislikes: number, 
    likes: number, 
    ratings: number, 
    category: string
}





export type BookedServicesFilter = 'To be Approved' | 'To be Rendered' | 'To be Rated' | 'Cancelled' | 'All'; 


export type Booking = {
    bookId: number, 
    userId: string, 
    serviceProviderId: string, 
    serviceId: number, 
    pax: number, 
    price: number, 
    paymentMethod: 'Cash on Delivery' | 'E-Wallet' | 'GCash',
    paid: boolean,
    date: string, 
    status: BookedServicesFilter,
    Users: User,
    Service: Service
}