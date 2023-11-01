"use client";

import ImageModal from "@/components/ImageModal";
import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { TbPhotoSearch, TbArrowBack } from "react-icons/tb";

type Props = {};

const mainChat = () => {
    const [title, setTitle] = useState("");

    const [loading, setLoading] = useState(false);

    const [images, setImages] = useState<File[]>([]);

    const [showImageModal, setShowImageModal] = useState(false);

    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const [outfitPrompt, setOutfitPrompt] = useState("");

    return (
        <div className="flex flex-col justify-center items-center h-screen w-screen bg-gray-100">
            <h1 className="text-4xl font-bold">Create Property</h1>
            <div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-[40%] left-1/2 sm:w-[650px] max-sm:w-[90%] bg-white rounded-[10px] flex flex-col items-center justify-between p-10 max-h-screen overflow-y-scroll noscr">
                <form className="w-full max-w-lg">
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3 mb-6 md:mb-0">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="title"
                            >
                                Title
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                id="topic"
                                type="text"
                                placeholder="property name"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
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
                    </div>

                    <button
                        disabled={loading}
                        type="submit"
                        className={`${
                            loading && "opacity-80"
                        } text-white text-center text-lg fundo-button w-full py-3 rounded-xl`}
                    >
                        {loading ? "Creating..." : "Create"}
                    </button>
                </form>

                <div className="w-full rounded-xl bg-white/60 hover:bg-white/70 shadow-gray-300 shadow-lg p-4 text-gray-200 relative min-w-80 max-w-3xl">
                    <div className="relative">
                        <input
                            type="text"
                            id="password"
                            className="w-full pl-3 pr-10 py-2 border-2 border-gray-200 rounded-xl hover:border-gray-300 focus:outline-none focus:border-blue-500 transition-colors"
                            placeholder="Prompt here..."
                            onChange={(e) => {
                                setOutfitPrompt(e.target.value);
                            }}
                        />
                        <button className="block w-7 h-7 text-center text-xl leading-0 absolute top-2 right-2 text-gray-400 focus:outline-none hover:text-gray-200 transition-colors">
                            <TbPhotoSearch className="w-full h-full" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default mainChat;
