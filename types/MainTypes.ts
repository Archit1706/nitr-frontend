export type Hotspot = {
    pitch: number;
    yaw: number;
    type: string;
    text: string;
    link?: number;
    info?: string;
};

export type Scene = {
    id: number,
    text: string,
    img: File | string,
    hotspots: Hotspot[],
}





export interface Product {
    _id: number;
    name: string;
    brand: string;
    description: string;
    tags?: string[];
    price: number;
    rating?: number;
    sellerReviews?: SellerReview[];
    productQuestions?: ProductQuestion[];
    condition?: string;
    images: string[];
    createDate: Date | string;
    soldDate?: Date | string;
    seller: string;
    buyer?: string;
    status?: string;
    category: string;
    specs?: Specs;
    location?: string;
    returns?: boolean;
    bids?: number;
}


export interface SellerReview {
    name: string;
    comment: string;
    rating: number;
}

export interface ProductQuestion {
    name: string;
    comment: string;
    response: string;
}

export interface Specs {
    [key: string]: string | number | boolean | undefined | any;
}

// {
//     "title": "Ramnivas",
//     "location": "Malad, Mumbai",
//     "bedrooms": "2",
//     "prop_size": "600",
//     "price": "2000000",
//     "desc": "New property on sale!",
//     "typeOfProperty": "rent",
//     "amenities": [
//         "A/C",
//         "Pool",
//         "Sea View"
//     ],
//     "scenes": [
//         {
//             "id": 0,
//             "img": {},
//             "text": "test",
//             "hotspots": [
//                 {
//                     "type": "custom",
//                     "text": "Kitchen",
//                     "pitch": 174.74930458511992,
//                     "yaw": 21.631147406159144,
//                     "link": 1
//                 }
//             ]
//         },
//         {
//             "id": 1,
//             "img": {},
//             "text": "nit",
//             "hotspots": [
//                 {
//                     "type": "custom",
//                     "text": "Kitchen",
//                     "pitch": 0.09009231299632514,
//                     "yaw": 10.723411299831989,
//                     "link": 0
//                 }
//             ]
//         }
//     ]
// }


export interface PropertyType {
    _id? : string,
    title : string,
    location : string,
    bedrooms : string,
    prop_size : string,
    price : string,
    desc : string,
    amenities : string[],
    typeOfProperty : string,
    scenes : Scene[]
}

export type Chat = {
    id: number;
    threads: Thread[];
};

export type Thread = {
    id: number;
    prompt: string;
    image?: File | string;
    output?: File[] | string[];
};
