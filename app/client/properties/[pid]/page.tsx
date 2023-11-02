'use client'


import { useEffect, useState } from 'react'
import MainAuctionPage from '@/components/auctionPage/MainAuctionPage'
import { Product, PropertyType } from '@/types/MainTypes'
import React from 'react'
import products from '@/assets/realestate.json'
import { Pannellum } from "pannellum-react";
import { useParams } from 'next/navigation'
import axios from 'axios'
import TempImg from "@/assets/img/temp.jpg";
import { Counter } from "@/components/timer/Counter";
import { ImHammer2 } from "react-icons/im";
import { RxCross2 } from "react-icons/rx";
import { BsBookmark } from "react-icons/bs";
import Link from "next/link";
import Card from "@/components/ui/Card";

import Test from '../../../../assets/real-estate/realEstate1.jpg'



type Props = {}



const Property = (props: Props) => {

    const { pid } = useParams<{ pid: string }>()
    const [rotate, setRotate] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [count, setCount] = useState(1000002);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [tab, setTab] = useState(1);

    const panRef = React.useRef<any>(null);
    const addCount = () => {
        setCount((prev) => prev + 1);
    };

    // const [style, setStyle] = useState(

    const minusCount = () => {
        if (count > 0) {
            setCount((prev) => prev - 1);
        }
    };

    const [room, setRoom] = useState();
    const [userName, setUserName] = useState("user");
    const [_, update] = useState(1);

    const [price, setPrice] = useState(0);

    const [sceneIndex, setSceneIndex] = useState(0);


    const [properties, setProperties] = useState<PropertyType[]>([]);

    const [property, setProperty] = React.useState<PropertyType>();

    const sendBid = (amount: number) => {
        const messageContent = {
            room: room,
            content: {
                date: Date.now(),
                amount: amount,
                name: userName,
            },
            reverse: false
        };
        // socket.emit("bid", messageContent);
        setPrice(amount);
    };

    const hotspotIcon = (hotSpotDiv: HTMLDivElement) => {
        const image = document.createElement("img");
        image.classList.add("image");
        image.setAttribute("width", "30");
        image.setAttribute("height", "30");
        image.setAttribute(
            "src",
            "https://img.icons8.com/material/4ac144/256/camera.png"
        );
        hotSpotDiv.appendChild(image);
    };


    const fetchData = async (pid: string) => {
        try {
            const res = await axios("https://09ad-14-139-61-195.ngrok-free.app" + "/properties/" + pid, {
                headers: {
                    "ngrok-skip-browser-warning": "69420",
                },
            })
            const data = res.data
            console.log(data)
            setProperty(data)
            setPrice(parseInt(data.price))
        } catch (error) {
            console.log(error)
        }
    }

    const fetchAll = async () => {
        try {
            const res = await axios("https://09ad-14-139-61-195.ngrok-free.app" + "/properties", {
                headers: {
                    "ngrok-skip-browser-warning": "69420",
                },
            })
            const data = res.data
            console.log(data)
            setProperties(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData(pid)
        fetchAll()
    }, [pid])


    return (
        <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4 font-Roboto">
            <div className="flex justify-center items-center md:items-stretch lg:flex-row flex-col gap-8">

                {/* <!-- Description Div --> */}

                <div className="w-full sm:w-96 md:w-8/12 lg:w-6/12 flex flex-col items-start gap-2">
                    {/* <p className=" focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 font-normal text-base leading-4 text-gray-600">Mobile</p> */}
                    <h2 className="font-semibold lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-800 mt-4">
                        {property?.title}
                    </h2>
                    <hr className=" bg-gray-200 w-full mt-4" />
                    <p className="font-light">
                        Property Type :{" "}
                        <span className="font-bold">
                            {property?.typeOfProperty === 'sale' ? "For Sale" : "For Rent"}
                        </span>
                    </p>
                    <hr className=" bg-gray-200 w-full" />
                    <div className="flex flex-col md:flex-row gap-4 md:justify-between">
                        <p className="font-light">
                            Bedrooms :{" "}
                            <span className="font-bold">
                                {property?.bedrooms}
                            </span>
                        </p>
                        <p className="font-light">
                            Area (sqft) :{" "}
                            <span className="font-bold">
                                {property?.prop_size}
                            </span>
                        </p>
                    </div>

                    <p className=" font-normal text-base leading-6 text-gray-600 mt-2">
                        Location : <span className='font-bold'>{property?.location}</span>
                    </p>

                    <p className=" font-normal text-base leading-6 text-gray-600 mt-2">
                        {property?.desc}
                    </p>
                    <div className="flex flex-row gap-2 flex-wrap">
                        {property?.amenities &&
                            property.amenities?.map(
                                (tag: string, index: number) => {
                                    return <div className="border-1 border-green-600 px-4 py-1 bg-green-100 text-green-600 text-md md:text-lg w-fit rounded-full mt-2">
                                        {tag}
                                    </div>
                                }
                            )}
                    </div>
                    <p className=" font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 mt-6 text-mobile">
                        <span className="text-black">Price: </span>₹
                        {price}
                    </p>

                    <hr className=" bg-gray-200 w-full mt-4" />
                    {/* <p className="font-light">Status : <span className="font-bold">Available</span></p> */}

                    {/* <p className="font-light">Aucion ends : <span className="font-bold">June 30, 2023 12:00 am</span></p> */}
                    {/* <p className="font-light">Bids : <span className="font-bold">23</span></p> */}
                    {/*  timer */}
                    {/* <div className="flex flex-row justify-between items-center mt-6">
                        {product?.soldDate && <Counter endDate={product?.soldDate as any} />}
                    </div> */}

                </div>

                {/* <!-- Preview Images Div For larger Screen--> */}

                <div className="w-full min-h-[60vh] sm:w-96 md:w-8/12  lg:w-6/12 flex lg:flex-row flex-col lg:gap-8 sm:gap-6 gap-4">
                    {property?.scenes?.length && property?.scenes?.length >= 0 && (
                        <Pannellum
                            ref={panRef}
                            width="200%"
                            height="100%"
                            image={property?.scenes[sceneIndex].img}
                            pitch={10}
                            yaw={180}
                            // hfov={400}
                            // vfov={200}
                            autoLoad
                            author=""
                            title=""
                            orientationOnByDefault={false}
                            draggable
                            keyboardZoom
                            mouseZoom
                            preview=""
                            previewAuthor=""
                            previewTitle=""
                            showControls
                            showFullscreenCtrl
                            showZoomCtrl
                            onLoad={() => { console.log("panorama loaded"); }}
                            onScenechange={(id: any) => { console.log("Scene has change on " + id); }}
                            onScenechangefadedone={() => { console.log("panorama loaded"); }}
                            onError={(err: any) => { console.log("Error", err); }}
                            onErrorcleared={() => { console.log("Error Cleared"); }}
                            hotspotDebug={false}
                        >
                            {
                                // <Pannellum.Hotspot
                                //     type={hotSpot.type}
                                //     pitch={hotSpot.pitch}
                                //     yaw={hotSpot.yaw}
                                //     text={hotSpot.text}
                                //     URL={hotSpot.URL}
                                //     handleClick={(evt: any) => {
                                //         console.log("Hotspot clicked!", evt);
                                //     }}
                                //     handleClickArg={hotSpot.URL}
                                //     createTooltipFunc={(hotSpotDiv: HTMLDivElement, args: any) => {
                                //         hotspotIcon(hotSpotDiv);
                                //     }}
                                // />


                                // selectedScene?.hotspots.map((hotSpot, index) => (
                                //     <Pannellum.Hotspot
                                //         key={index}
                                //         type={hotSpot.type === "custom" ? "custom" : "info"}
                                //         pitch={hotSpot.pitch}
                                //         yaw={hotSpot.yaw}
                                //         text={hotSpot.text}
                                //         handleClick={(evt: any) => {
                                //             console.log("Hotspot clicked!", evt);
                                //             setSelectedScene(
                                //                 scenes.find((scene) => scene.id === hotSpot.link) || null
                                //             )
                                //         }}
                                //         createTooltipFunc={(hotSpotDiv: HTMLDivElement, args: any) => {
                                //             hotspotIcon(hotSpotDiv);
                                //         }}
                                //     />
                                // ))


                                property.scenes[sceneIndex].hotspots.map((hotSpot, index) => (
                                    <Pannellum.Hotspot
                                        key={index}
                                        type={hotSpot.type === "custom" ? "custom" : "info"}
                                        pitch={hotSpot.pitch}
                                        yaw={hotSpot.yaw}
                                        text={hotSpot.info || hotSpot.text}
                                        handleClick={(evt: any) => {
                                            console.log("Hotspot clicked!", evt);
                                            setSceneIndex(
                                                hotSpot.link || 0
                                            )
                                        }}
                                        createTooltipFunc={(hotSpotDiv: HTMLDivElement, args: any) => {
                                            hotspotIcon(hotSpotDiv);
                                        }}
                                    />
                                ))
                            }
                        </Pannellum>
                    )}
                </div>
            </div>
            {/* extra tabs section */}
            <div className="flex items-center flex-col md:flex-row gap-8 mt-6 md:mt-12">
                {/* <AuctionHistory product={product} />
            {product?.specs && (
                <Specs specifications={product?.specs} />
            )} */}
            </div>
            <div className="flex items-center flex-col md:flex-row gap-8 mt-6 md:mt-12">
                {/* <Chat /> */}
            </div>

            {/* Explore more producs */}
            <div className="flex items-center flex-col gap-8">
                <div className="py-4 mt-12 w-full">
                    <h1 className="text-4xl font-bold">
                        Explore More Products
                    </h1>
                </div>
                <div className="flex flex-wrap justify-center gap-8">
                    <Card fromBid={true} properties={properties} />
                </div>
            </div>
        </div>
    )
}

export default Property