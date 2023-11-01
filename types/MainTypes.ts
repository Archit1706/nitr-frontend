export type Hotspot = {
    pitch: number,
    yaw: number,
    type: string,
    text: string,
    link: number,
}

export type Scene = {
    id: number,
    text: string,
    img:  File | string,
    hotspots: Hotspot[],
}
