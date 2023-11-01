export type Hotspot = {
    pitch: number;
    yaw: number;
    type: string;
    text: string;
    link: number;
};

export type Scene = {
    id: number;
    text: string;
    img: File | string;
    hotspots: Hotspot[];
};

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
