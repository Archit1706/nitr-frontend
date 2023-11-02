"use client";

import { Counter } from "@/components/timer/Counter";
import React, { useState, useEffect } from "react";
import { ImHammer2 } from "react-icons/im";
import { RxCross2 } from "react-icons/rx";
import { BsBookmark } from "react-icons/bs";
// import AuctionHistory from "./AuctionHistory";
// import Chat from "./Chat";
// import Specs from "./Specs";
import ProductCard from "../../components/Cards/ProductCard";
import ReviewCard from "../Cards/ReviewCard";
import Table from "../table";
import TempImg from "@/assets/img/temp.jpg";
import { Product, Product, PropertyType } from "@/types/MainTypes";
import Link from "next/link";
import Card from "../ui/Card";
import { Pannellum } from "pannellum-react";

import Test from "../../assets/real-estate/realEstate1.jpg";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import io from "socket.io-client";
// import FAQ from "./FAQ";
import { toast } from "react-toastify";
let socket: any;
const CONNECTION_PORT = process.env.NEXT_PUBLIC_CONNECTION_URL || "";
import AuctionHistory from "@/components/auctionPage/AuctionHistory";

type Props = {
    product: Product;
    moreProducts?: Product[];
    // type: string;
    // color: Colour
};
const MainAuctionPage = (props: Props) => {
    const { isLoaded, isSignedIn, user } = useUser();
    const [rotate, setRotate] = useState(
        `mongodb+srv://admin:admin@cluster0.qs1hl6j.mongodb.net/codeutsav?retryWrites=true&w=majority`
    );
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
    // const [userName, setUserName] = useState("user");
    const [_, update] = useState(1);

    const [price, setPrice] = useState(0);
    const [bidAmt, setBidAmt] = useState(0);

    const [message, setMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const [bidList, setBidList] = useState([]);

    const [userCount, setUserCount] = useState(0);

    useEffect(() => {
        console.log("bid list----> ", bidList);
    }, [bidList]);

    const [properties, setProperties] = React.useState<PropertyType[]>([
        {
            title: "Ramnivas",
            location: "Malad, Mumbai",
            bedrooms: "2",
            prop_size: "600",
            price: "2000000",
            desc: "New property on sale!",
            typeOfProperty: "rent",
            amenities: ["A/C", "Pool", "Sea View"],
            scenes: [
                {
                    id: 0,
                    img: "https://fridayphotos.s3.eu-central-1.amazonaws.com/test_photoset/0005.JPG",
                    text: "test",
                    hotspots: [
                        {
                            type: "custom",
                            text: "Kitchen",
                            pitch: 174.74930458511992,
                            yaw: 21.631147406159144,
                            link: 1,
                        },
                    ],
                },
                {
                    id: 1,
                    img: "https://fridayphotos.s3.eu-central-1.amazonaws.com/test_photoset/0005.JPG",
                    text: "nit",
                    hotspots: [
                        {
                            type: "custom",
                            text: "Kitchen",
                            pitch: 0.09009231299632514,
                            yaw: 10.723411299831989,
                            link: 0,
                        },
                    ],
                },
            ],
        },
        {
            title: "Ramnivas 2",
            location: "Malad, Mumbai",
            bedrooms: "2",
            prop_size: "600",
            price: "2000000",
            desc: "New property on sale!",
            typeOfProperty: "sale",
            amenities: ["A/C", "Pool", "Sea View"],
            scenes: [
                {
                    id: 0,
                    img: "https://fridayphotos.s3.eu-central-1.amazonaws.com/test_photoset/0005.JPG",
                    text: "test",
                    hotspots: [
                        {
                            type: "custom",
                            text: "Kitchen",
                            pitch: 174.74930458511992,
                            yaw: 21.631147406159144,
                            link: 1,
                        },
                    ],
                },
                {
                    id: 1,
                    img: "https://fridayphotos.s3.eu-central-1.amazonaws.com/test_photoset/0005.JPG",
                    text: "nit",
                    hotspots: [
                        {
                            type: "custom",
                            text: "Kitchen",
                            pitch: 0.09009231299632514,
                            yaw: 10.723411299831989,
                            link: 0,
                        },
                    ],
                },
            ],
        },
        {
            title: "Ramnivas 3",
            location: "Malad, Mumbai",
            bedrooms: "2",
            prop_size: "600",
            price: "2000000",
            desc: "New property on sale!",
            typeOfProperty: "bid",
            amenities: ["A/C", "Pool", "Sea View"],
            scenes: [
                {
                    id: 0,
                    img: "https://fridayphotos.s3.eu-central-1.amazonaws.com/test_photoset/0005.JPG",
                    text: "test",
                    hotspots: [
                        {
                            type: "custom",
                            text: "Kitchen",
                            pitch: 174.74930458511992,
                            yaw: 21.631147406159144,
                            link: 1,
                        },
                    ],
                },
                {
                    id: 1,
                    img: "https://fridayphotos.s3.eu-central-1.amazonaws.com/test_photoset/0005.JPG",
                    text: "nit",
                    hotspots: [
                        {
                            type: "custom",
                            text: "Kitchen",
                            pitch: 0.09009231299632514,
                            yaw: 10.723411299831989,
                            link: 0,
                        },
                    ],
                },
            ],
        },
    ]);

    const fetchData = async () => {
        try {
            const res = await axios("http://localhost:3000/api/properties");
            const data = res.data;
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        // fetchData()
    }, []);

    useEffect(() => {
        // check for window
        if (typeof window !== "undefined") {
            window.location.href.substr(window.location.href.length - 24);
        }

        socket = io(CONNECTION_PORT);
        socket.emit(
            "join_room",
            window.location.href.substr(window.location.href.length - 24)
        );
    }, [CONNECTION_PORT]);

    useEffect(() => {
        socket.once("connectToRoom", (data: any) => {
            console.log(data);
            setUserCount(data.userCount);
            setPrice(data.price);
            setBidAmt(data.price + 100);
            setBidList(data.history);
        });
        return () => socket.off("connectToRoom");
    });

    useEffect(() => {
        socket.once("receive_message", (data: any) => {
            const temp = messageList;
            temp.push(data);
            setMessageList(temp);
            update(Math.random());
        });
        return () => socket.off("receive_message");
    });

    useEffect(() => {
        socket.on("recieve_bid", (data: any) => {
            console.log(data);
            setUserCount(data.userCount);
            setPrice(Number(data.price));
            console.table(bidList);
            setBidList(data.history);
            console.table(bidList);
        });
    });

    const sendBid = (amount: number) => {
        const messageContent = {
            room: room,
            content: {
                date: Date.now(),
                amount: amount,
                name: user?.firstName + " " + user?.lastName,
            },
            reverse: props.product.category === "Government",
        };
        socket.emit("bid", messageContent);
        setPrice(amount);
    };

    return (
        <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4 font-Roboto">
            <div className="flex justify-center items-center md:items-stretch lg:flex-row flex-col gap-8">
                {/* <!-- Description Div --> */}

                <div className="w-full sm:w-96 md:w-8/12 lg:w-6/12 items-center">
                    {/* <p className=" focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 font-normal text-base leading-4 text-gray-600">Mobile</p> */}
                    <h2 className="font-semibold lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-800 mt-4">
                        {props?.product?.name}
                    </h2>
                    <hr className=" bg-gray-200 w-full mt-4" />

                    <div className="flex flex-row space-x-2 items-center mt-2">
                        <div className="flex -space-x-4">
                            {props?.product?.images &&
                                props.product.images.length > 0 && (
                                    <>
                                        <img
                                            className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
                                            src={props?.product?.images[0]}
                                            alt=""
                                        />
                                        <img
                                            className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
                                            src={
                                                props?.product?.images
                                                    ?.length >= 1
                                                    ? props.product.images[1]
                                                    : TempImg.src
                                            }
                                            alt=""
                                        />
                                        <img
                                            className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
                                            src={
                                                props?.product?.images
                                                    ?.length >= 2
                                                    ? props?.product?.images[2]
                                                    : TempImg.src
                                            }
                                            alt=""
                                        />
                                        <a
                                            className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800"
                                            href="#"
                                        >
                                            +{userCount}
                                        </a>
                                    </>
                                )}
                        </div>
                        <p className="text-xl"> Users are bidding.</p>
                    </div>

                    <hr className=" bg-gray-200 w-full mt-4" />
                    <div className="flex flex-col md:flex-row md:justify-between">
                        <p className="font-light">
                            Auctioneer :{" "}
                            <span className="font-bold">
                                {props?.product?.seller}
                            </span>
                        </p>
                        <p className="font-light">
                            Category :{" "}
                            <span className="font-bold">
                                {props?.product?.category}
                            </span>
                        </p>
                    </div>

                    <p className=" font-normal text-base leading-6 text-gray-600 mt-7">
                        {props?.product?.description}
                    </p>
                    <div className="flex flex-row gap-2 flex-wrap">
                        {props?.product?.tags &&
                            props.product.tags?.map(
                                (tag: string, index: number) => {
                                    return index % 2 === 0 ? (
                                        <div className="border-1 border-green-600 px-4 py-1 bg-green-100 text-green-600 text-md md:text-lg w-fit rounded-full mt-2">
                                            {tag}
                                        </div>
                                    ) : (
                                        <div className="border-1 border-mobile px-4 py-1 bg-mobile-light text-mobile text-md md:text-lg w-fit rounded-full mt-2">
                                            {tag}
                                        </div>
                                    );
                                }
                            )}
                    </div>
                    <p className=" font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 mt-6 text-mobile">
                        <span className="text-black">Current Bid: </span>₹
                        {price}
                    </p>

                    <hr className=" bg-gray-200 w-full mt-4" />
                    {/* <p className="font-light">Status : <span className="font-bold">Available</span></p> */}
                    <div className="flex flex-row space-x-2 items-center">
                        <div className="px-6 py-2 bg-green-100 text-green-600 text-md md:text-lg w-fit rounded-md mt-2">
                            Available{" "}
                        </div>
                        <div className="px-6 py-2 bg-red-100 text-red-600 text-md md:text-lg w-fit rounded-md mt-2">
                            Ends on{" "}
                            <span className="font-bold">
                                {props?.product?.soldDate &&
                                    new Date(
                                        // @ts-ignore
                                        props.product.soldDate.$date
                                    ).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                        hour: "numeric",
                                        minute: "numeric",
                                        hour12: true,
                                    })}
                                {/* June 30, 2023 12:00 am */}
                            </span>
                        </div>
                    </div>
                    {/* <p className="font-light">Aucion ends : <span className="font-bold">June 30, 2023 12:00 am</span></p> */}
                    {/* <p className="font-light">Bids : <span className="font-bold">23</span></p> */}
                    {/*  timer */}
                    <div className="flex flex-row justify-between items-center mt-6">
                        {props.product?.soldDate && (
                            <Counter endDate={props.product?.soldDate as any} />
                        )}
                    </div>

                    <div className="flex flex-row justify-start space-x-2 mt-8">
                        <div className="flex">
                            <span
                                // onClick={minusCount}
                                onClick={() => {
                                    if (
                                        props?.product?.category != "Government"
                                    ) {
                                        alert(
                                            "You cannot decrease bid on products"
                                        );
                                    } else {
                                        setBidAmt(bidAmt - 100);
                                    }
                                }}
                                className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-9 rounded-l cursor-pointer outline-none flex items-center justify-center font-bold"
                            >
                                -
                            </span>
                            <input
                                id="counter"
                                aria-label="input"
                                className="px-2 border border-gray-300 h-full text-center w-[50%] min-w-fit bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 font-extrabold"
                                type="text"
                                placeholder={bidAmt.toString()}
                                onChange={(e: any) => setBidAmt(e.target.value)}
                                value={bidAmt}
                            />
                            <span
                                // onClick={addCount}
                                onClick={() => {
                                    if (
                                        props?.product?.category ===
                                        "Government"
                                    ) {
                                        alert(
                                            "You cannot increase bid on government tenders"
                                        );
                                    } else {
                                        setBidAmt(bidAmt + 100);
                                    }
                                }}
                                className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-9 rounded-r cursor-pointer outline-none flex items-center justify-center font-bold"
                            >
                                +
                            </span>
                        </div>
                        <button
                            className="focus:outline-none hover:bg-[#ede9fe] hover:text-[#8249ef] font-medium text-white bg-[#8249ef] px-6 py-2"
                            onClick={() => sendBid(bidAmt)}
                        >
                            Bid
                        </button>
                        {/* Bookmark icon */}
                        <BsBookmark className="h-6 w-6 self-center" />
                    </div>

                    <div
                        className={`${
                            isModalOpen ? "" : "hidden"
                        } z-20 absolute top-0 overflow-hidden bottom-0 left-0 right-0 bg-[rgb(0,0,0,0.5)] flex items-center justify-center`}
                    >
                        <div
                            id="info-popup"
                            className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 md:h-full flex justify-center items-center"
                        >
                            <div className="relative p-4 w-full max-w-lg h-full md:h-auto">
                                <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 md:p-8">
                                    <div className="mb-4 text-sm font-light text-gray-500 dark:text-gray-400">
                                        <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
                                            Autobidding
                                        </h3>
                                        <div className="flex flex-col space-y-2 items-center">
                                            <div className="flex flex-row justify-start space-x-2 mt-2 w-full">
                                                <button className="focus:outline-none hover:bg-black font-medium text-white bg-gray-800 px-6 py-2 whitespace-nowrap">
                                                    Limit
                                                </button>
                                                <div className="flex w-full">
                                                    <span
                                                        onClick={minusCount}
                                                        className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-9 rounded-l cursor-pointer outline-none flex items-center justify-center font-bold"
                                                    >
                                                        -
                                                    </span>
                                                    <input
                                                        id="counter"
                                                        aria-label="input"
                                                        className="w-full px-2 border border-gray-300 h-full text-center min-w-fit bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 font-extrabold"
                                                        type="text"
                                                        value={count}
                                                        onChange={(e) =>
                                                            e.target.value
                                                        }
                                                    />
                                                    <span
                                                        onClick={addCount}
                                                        className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-9 rounded-r cursor-pointer outline-none flex items-center justify-center font-bold"
                                                    >
                                                        +
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex flex-row justify-start space-x-2 mt-2 w-full">
                                                <button className="focus:outline-none hover:bg-black font-medium text-white bg-gray-800 px-6 py-2 whitespace-nowrap">
                                                    Increment
                                                </button>
                                                <div className="flex w-full">
                                                    <span
                                                        onClick={minusCount}
                                                        className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-9 rounded-l cursor-pointer outline-none flex items-center justify-center font-bold"
                                                    >
                                                        -
                                                    </span>
                                                    <input
                                                        id="counter"
                                                        aria-label="input"
                                                        className="w-full px-2 border border-gray-300 h-full text-center min-w-fit bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 font-extrabold"
                                                        type="text"
                                                        value={count}
                                                        onChange={(e) =>
                                                            e.target.value
                                                        }
                                                    />
                                                    <span
                                                        onClick={addCount}
                                                        className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-9 rounded-r cursor-pointer outline-none flex items-center justify-center font-bold"
                                                    >
                                                        +
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex flex-row justify-start space-x-2 mt-2 w-full">
                                                <button className="focus:outline-none hover:bg-black font-medium text-white bg-gray-800 px-6 py-2 whitespace-nowrap ">
                                                    Time Gap
                                                </button>
                                                <div className="flex w-full">
                                                    <span
                                                        onClick={minusCount}
                                                        className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-9 rounded-l cursor-pointer outline-none flex items-center justify-center font-bold"
                                                    >
                                                        -
                                                    </span>
                                                    <input
                                                        id="counter"
                                                        aria-label="input"
                                                        className="w-full px-2 border border-gray-300 h-full text-center min-w-fit bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 font-extrabold"
                                                        type="text"
                                                        value={count}
                                                        onChange={(e) =>
                                                            e.target.value
                                                        }
                                                    />
                                                    <span
                                                        onClick={addCount}
                                                        className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-9 rounded-r cursor-pointer outline-none flex items-center justify-center font-bold"
                                                    >
                                                        +
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="justify-between items-center pt-0 space-y-4 sm:flex sm:space-y-0">
                                        <a
                                            href="#"
                                            className="font-medium text-primary-600 dark:text-primary-500 hover:underline"
                                        >
                                            Learn more about autobidding
                                        </a>
                                        <div className="items-center space-y-4 sm:space-x-4 sm:flex sm:space-y-0">
                                            <button
                                                onClick={() =>
                                                    setIsModalOpen(false)
                                                }
                                                id="close-modal"
                                                type="button"
                                                className="py-2 px-4 w-full text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 sm:w-auto hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                id="confirm-button"
                                                type="button"
                                                className="py-2 px-4 w-full text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-auto hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                            >
                                                Confirm
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <RxCross2
                            onClick={() => {
                                setIsModalOpen(false);
                            }}
                            className="z-[51] w-8 h-8 text-white fixed right-2 top-2 cursor-pointer"
                        />
                    </div>
                </div>

                {/* <!-- Preview Images Div For larger Screen--> */}

                <div className="w-full sm:w-96 md:w-8/12  lg:w-6/12 flex lg:flex-row flex-col lg:gap-8 sm:gap-6 gap-4">
                    {props?.product?.images.length >= 0 && (
                        <Pannellum
                            ref={panRef}
                            width="200%"
                            height="100%"
                            image={Test.src}
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
                            onLoad={() => {
                                console.log("panorama loaded");
                            }}
                            onScenechange={(id: any) => {
                                console.log("Scene has change on " + id);
                            }}
                            onScenechangefadedone={() => {
                                console.log("panorama loaded");
                            }}
                            onError={(err: any) => {
                                console.log("Error", err);
                            }}
                            onErrorcleared={() => {
                                console.log("Error Cleared");
                            }}
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
                            }
                        </Pannellum>
                    )}
                </div>
            </div>
            {/* extra tabs section */}
            <div className="flex items-center flex-col md:flex-row gap-8 mt-6 md:mt-12">
                {/* <AuctionHistory product={props?.product} />
                {props?.product?.specs && (
                    <Specs specifications={props?.product?.specs} />
                )} */}
                {/* <Table data={bidList} /> */}
                <AuctionHistory />
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
    );
};

export default MainAuctionPage;
