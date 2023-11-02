"use client";

import ImageModal from "@/components/ImageModal";

import React, { useState, useEffect } from "react";
import { BiMessageDetail } from "react-icons/bi";
import { BsFillSendFill } from "react-icons/bs";
import {
    AiOutlineMenuUnfold,
    AiOutlineMenuFold,
    AiFillRobot,
} from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { TbPhotoSearch, TbArrowBack } from "react-icons/tb";
import { Chat, Thread } from "@/types/MainTypes";
import { Slider } from "@/components/slider";
import { FiUser } from "react-icons/fi";

type Props = {};

const mainChat = () => {
    const [open, setOpen] = useState(true); // sidebar open state
    const [file, setFile] = useState(true);
    const [chats, setChats] = useState<Thread[]>([
        // {
        //     id: 1,
        //     prompt: "Give me suggestions based on Rajasthani styled architecture for my Bedroom. Use Aesthetic look and color palette.",
        // },
    ]);

    const [title, setTitle] = useState("");

    const [loading, setLoading] = useState(false);

    // const [images, setImages] = useState<File[]>([]);

    const [showImageModal, setShowImageModal] = useState(false);

    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const [outfitPrompt, setOutfitPrompt] = useState("");
    const [chat, setChat] = useState([
        {
            id: 1,
            prompt: "Give me suggestions based on Rajasthani styled architecture for my Bedroom. Use Aesthetic look and color palette.",
            output: [
                "https://replicate.delivery/pbxt/Z6YKFv7QSlYOPJ9U2JpgoiuZPdeXohnaIWcEfwaeaqfrz3QHB/out-0.png",
                "https://replicate.delivery/pbxt/Z6YKFv7QSlYOPJ9U2JpgoiuZPdeXohnaIWcEfwaeaqfrz3QHB/out-0.png",
            ],
        },
        // {
        //     id: 2,
        //     prompt: "Give me some ideas for my living room. I want to use a modern look and feel.",
        //     output: [
        //         "https://picsum.photos/id/23/300/300",
        //         "https://picsum.photos/id/2/300/300",
        //     ],
        // },
        // {
        //     id: 3,
        //     prompt: "",
        //     output: ["", ""],
        // },
        // {
        //     id: 4,
        //     prompt: "",
        //     output: ["", ""],
        // },
    ]);
    const [message, setMessage] = useState({
        id: 1,
        prompt: "Give me suggestions based on Rajasthani styled architecture for my Bedroom. Use Aesthetic look and color palette.",
        output: [
            "https://replicate.delivery/pbxt/Z6YKFv7QSlYOPJ9U2JpgoiuZPdeXohnaIWcEfwaeaqfrz3QHB/out-0.png",
            "https://replicate.delivery/pbxt/Z6YKFv7QSlYOPJ9U2JpgoiuZPdeXohnaIWcEfwaeaqfrz3QHB/out-0.png",
        ],
    });

    const [images, setImages] = useState([]);

    // send prompt to the backend api in body and get the response and store it in message.response
    const handleSubmit = () => {
        fetch(`${process.env.NEXT_PUBLIC_NGROK}/chat?prompt=${outfitPrompt}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: outfitPrompt }),
        })
            .then((res) => {
                res.json().then((data) => {
                    console.log(data.output);
                    // setChat((prev) => [...prev, data]);
                    setMessage({
                        id: 1,
                        prompt: outfitPrompt,
                        output: data.output,
                    });
                    setImages(data.output);
                    // setChat((prev) => [...prev, message]);
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <main className="w-full flex justify-center items-start relative gap-4 p-4 ">
            <div className="w-1/5">
                <div
                    className={`w-full flex flex-col justify-start items-start ${
                        !open ? "hidden" : "block"
                    }`}
                >
                    <div className="w-full h-1/4 flex flex-row justify-start items-center">
                        <button className="bg-teal-800/80 text-gray-300 hover:bg-teal-800 hover:text-gray-200 rounded-md border border-dashed cursor-pointer p-4 ">
                            + New Chat
                        </button>
                        <button
                            className="bg-teal-800/80 text-gray-300 hover:bg-teal-800 hover:text-gray-200 rounded-md border border-dashed cursor-pointer p-4 ml-4 transition-all duration-500"
                            onClick={() => setOpen(!open)}
                        >
                            <AiOutlineMenuFold className="" />
                        </button>
                    </div>
                    {Array.isArray(chats) && chats.length > 0 ? (
                        chat.map((chaty, index) => (
                            <div
                                key={index}
                                className="flex w-full flex-row justify-start items-center hover:bg-teal-900 hover:text-gray-200 rounded-md p-4 mt-2"
                            >
                                <div className="w-1/4 h-1/4 flex flex-col justify-center items-center">
                                    <BiMessageDetail className="w-6 h-6" />
                                </div>
                                <div className="w-3/4 h-3/4 flex flex-col justify-center items-start">
                                    <h1>Chat {chaty.id}</h1>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-row justify-center items-center">
                            <h1>No chats yet</h1>
                        </div>
                    )}
                </div>
                <div
                    className={`w-full flex flex-col justify-start items-start ${
                        !open ? "block" : "hidden"
                    }`}
                >
                    <button
                        className="bg-teal-800/80 text-gray-300 hover:bg-teal-800 hover:text-gray-200 rounded-md border border-dashed cursor-pointer p-4 ml-4 transition-all duration-500 "
                        onClick={() => setOpen(!open)}
                    >
                        <AiOutlineMenuUnfold className="" />
                    </button>
                </div>
            </div>
            <div
                className={`flex flex-col justify-center items-center transition-all duration-300 rounded-xl bg-white/60 hover:bg-white/70 shadow-gray-300 shadow-lg p-4 text-gray-600 h-fit relative overflow-y-auto mt-20 ${
                    open ? "w-4/5" : "w-full"
                }`}
            >
                <h1 className="text-4xl font-bold">Chat with AI</h1>

                {/* if chat is not an empty array then show the threads by mapping over the array else show nothing  */}
                {outfitPrompt && images && images.length > 0 && (
                    <div className="w-full flex flex-col justify-start gap-4">
                        <h3 className="font-bold text-lg flex justify-start items-center gap-4">
                            <div className="bg-teal-800/80 text-gray-300 hover:bg-teal-800 hover:text-gray-200 rounded-md border border-dashed cursor-pointer p-4 ml-4 transition-all duration-500">
                                <FiUser className="" />
                            </div>
                            {outfitPrompt}
                        </h3>
                        <div className="flex justify-start items-center gap-2 bg-gray-200 h-fit p-4 rounded-md">
                            {/* {thread?.output?.map((img, index) => {
                                        return (
                                            <img
                                                className="self-start w-1/2 rounded-md"
                                                src={img}
                                                alt="image"
                                            />
                                        );
                                    })} */}

                            {images.map((img, index) => {
                                return (
                                    <img
                                        className="self-start w-1/2 rounded-md"
                                        src={img}
                                        alt="image"
                                    />
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* <form className="w-full max-w-lg"> */}
                {/* <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3 mb-2">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                Scenes
                            </label>
                            <div className="flex flex-col items-center justify-center w-full space-y-4">
                                {images?.length != 0 && (
                                    <div className="flex gap-2 flex-wrap">
                                        {images.map((img, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className="relative w-32 h-32 rounded-lg shadow-md"
                                                >
                                                    <img
                                                        onClick={() => {
                                                            setSelectedImage(
                                                                img
                                                            );
                                                            setShowImageModal(
                                                                true
                                                            );
                                                        }}
                                                        className="w-full h-full object-cover rounded-xl"
                                                        src={
                                                            !img
                                                                ? ""
                                                                : img instanceof
                                                                  File
                                                                ? URL.createObjectURL(
                                                                      img
                                                                  )
                                                                : img
                                                        }
                                                        alt="Image"
                                                    />
                                                    <button
                                                        className="absolute top-0 right-0 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center"
                                                        onClick={() => {
                                                            setImages((prev) =>
                                                                prev.filter(
                                                                    (t, i) =>
                                                                        i !==
                                                                        index
                                                                )
                                                            );
                                                        }}
                                                    >
                                                        <RxCross2 className="w-4 h-4 text-white" />
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}

                                {images.length < 6 && (
                                    <label
                                        htmlFor="dropzone-file"
                                        className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                                    >
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg
                                                className="w-10 h-10 mb-3 text-gray-400"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                                ></path>
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500">
                                                <span className="font-semibold">
                                                    Click to upload
                                                </span>{" "}
                                                or drag and drop
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                SVG, PNG, JPG or Webp
                                            </p>
                                        </div>
                                        <input
                                            onChange={(e: any) => {
                                                if (e.target.files) {
                                                    // @ts-ignore
                                                    setImages((prev) => [
                                                        ...prev,
                                                        e.target.files[0],
                                                    ]);
                                                }
                                            }}
                                            id="dropzone-file"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                        />
                                    </label>
                                )}
                            </div>
                        </div>
                    </div> */}

                {/* <button
                        disabled={loading}
                        type="submit"
                        className={`${
                            loading && "opacity-80"
                        } text-white text-center text-lg fundo-button w-full py-3 rounded-xl`}
                    >
                        {loading ? "Creating..." : "Create"}
                    </button> */}
                {/* </form> */}

                {/* <div className="w-full rounded-xl bg-white/60 hover:bg-white/70 shadow-gray-300 shadow-lg p-4 text-gray-200 relative min-w-80 max-w-3xl">
                    <div className="relative">
                        <input
                            type="text"
                            className="w-full pl-3 pr-10 py-2 border-2 border-gray-200 rounded-xl hover:border-gray-300 focus:outline-none text-gray-600 focus:border-blue-500 transition-colors"
                            placeholder="Prompt here..."
                            onChange={(e) => {
                                setOutfitPrompt(e.target.value);
                            }}
                        />
                        <label htmlFor="fileInput" className="cursor-pointer">
                            <button className="block w-7 h-7 text-center text-xl leading-0 absolute top-2 right-14 text-gray-400 focus:outline-none hover:text-gray-600 transition-colors">
                                <TbPhotoSearch className="w-full h-full" />
                            </button>
                            <input
                                type="file"
                                id="fileInput"
                                className="hidden"
                                onChange={(e) => {
                                    // Handle file upload here
                                    // You can access the selected file from e.target.files
                                }}
                            />
                        </label>

                        <button className="block w-7 h-7 text-center text-xl leading-0 absolute top-2 right-2 text-gray-400 focus:outline-none hover:text-gray-600 transition-colors">
                            <BsFillSendFill className="w-full h-full" />
                        </button>
                    </div>
                </div> */}
                <div className="w-full rounded-xl bg-white/60 hover:bg-white/70 shadow-gray-300 shadow-lg p-4 text-gray-200 relative min-w-80 max-w-3xl">
                    <div className="relative">
                        <input
                            type="text"
                            className="w-full pl-3 pr-10 py-2 border-2 border-gray-200 rounded-xl hover:border-gray-300 focus:outline-none text-gray-600 focus:border-blue-500 transition-colors"
                            placeholder="Prompt here..."
                            onChange={(e) => {
                                setOutfitPrompt(e.target.value);
                            }}
                        />
                        <label htmlFor="fileInput" className="cursor-pointer">
                            <button className="block w-7 h-7 text-center text-xl leading-0 absolute top-2 right-14 text-gray-400 focus:outline-none hover:text-gray-600 transition-colors">
                                <TbPhotoSearch className="w-full h-full" />
                            </button>
                            <input
                                type="file"
                                id="fileInput"
                                className="hidden"
                                onChange={(e) => {
                                    setFile(e.target.files[0]);
                                    // Handle file upload here
                                    // You can access the selected file from e.target.files
                                }}
                                style={{ display: "none" }}
                                // onChange={handleImageChange}
                            />
                        </label>
                        <button
                            className="block w-7 h-7 text-center text-xl leading-0 absolute top-2 right-2 text-gray-400 focus:outline-none hover:text-gray-600 transition-colors"
                            onClick={handleSubmit}
                        >
                            <BsFillSendFill className="w-full h-full" />
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default mainChat;
