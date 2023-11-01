"use client";

import React, { useState, useEffect } from "react";
import { BiMessageDetail } from "react-icons/bi";
import { AiOutlineMenuUnfold, AiOutlineMenuFold } from "react-icons/ai";

const Sidebar = () => {
    const [open, setOpen] = useState(true); // sidebar open state
    const [chats, setChats] = useState([
        {
            name: "ChatGPT",
            lastMessage: "Hello, I'm ChatGPT!",
        },
        {
            name: "ChatGPT",
            lastMessage: "Hello, I'm ChatGPT!",
        },
        {
            name: "ChatGPT",
            lastMessage: "Hello, I'm ChatGPT!",
        },
    ]);

    useEffect(() => {
        console.log("chats", open);
    }, [open]);

    return (
        <section className="relative w-1/5">
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
                    chats.map((chat) => (
                        <div className="flex flex-row justify-start items-center hover:bg-teal-900 hover:text-gray-200 rounded-md pb-2">
                            <div className="w-1/4 h-1/4 flex flex-col justify-center items-center">
                                <BiMessageDetail className="w-6 h-6" />
                            </div>
                            <div className="w-3/4 h-3/4 flex flex-col justify-center items-start">
                                <h1>{chat.name}</h1>
                                <h2>{chat.lastMessage}</h2>
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
        </section>
    );
};

export default Sidebar;
