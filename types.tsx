

export type User = {
    userId: number;
    accessToken: string;
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


export type Provider = {
    userId: number;
    accessToken: string;
    username: string | null;
    email: string | null;
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

    Services?: Service[];
    Images: Image[];
}


export type Image = {
    imageId: number;
    type: string;
    userId: string;
    serviceId: number | null;
    name: string;
    path: string;
}


export type ServiceStatus = 'active' | 'inactive';


export type Service = {
    serviceId: number, 
    userId: string, 
    title: string, 
    serviceDetails: string, 
    status: ServiceStatus,
    priceType: 'Flat Rate' | 'Range',
    priceSubType: 'Per Pax' | 'Per Service',
    priceInitial: number, 
    priceFinal: number, 
    unavailableDates: string, 
    dislikes: number, 
    likes: number, 
    ratings: number, 
    category: string,
    Users?: User,
}





export type BookedServicesFilter = 'To be Approved' | 'To be Rendered' | 'To be Rated' | 'Cancelled' | 'All' | 'Completed'; 


export type Booking = {
    bookId: number, 
    userId: string, 
    serviceProviderId: string, 
    serviceId: number, 
    pax: number, 
    price: number, 
    finalPrice: number,
    paymentMethod: 'Cash on Delivery' | 'E-Wallet' | 'GCash',
    paid: boolean,
    date: string, 
    status: BookedServicesFilter,
    cancelReason?: string;
    Users: User,
    Service: Service,
    ServiceProviders: User,
}

