"use client";

import { useEffect } from "react";
import ImageModal from "@/components/ImageModal";
import { Scene } from "@/types/MainTypes";
import React from "react";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { useRouter } from "next/navigation";
import Lottie from "react-lottie";
import * as animationData from "../../../assets/create-lottie.json";

type Props = {};

const CreateProperty = (props: Props) => {
    const router = useRouter();

    const [title, setTitle] = React.useState("");
    const [location, setLocation] = React.useState("");
    const [bedrooms, setBedrooms] = React.useState("");
    const [prop_size, setPropSize] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [desc, setDesc] = React.useState("");
    const [amenities, setAmenities] = React.useState<String[]>([]);
    const [newAmenity, setNewAmenity] = React.useState("");

    const [loading, setLoading] = React.useState(false);

    const [scenes, setScenes] = React.useState<Scene[]>([]);

    const [showImageModal, setShowImageModal] = React.useState(false);

    const [selectedScene, setSelectedScene] = React.useState<Scene | null>(
        null
    );

    const [typeOfProperty, setTypeOfProperty] = React.useState("sale");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (scenes.length == 0) {
            alert("Please add at least one scene");
            return;
        }

        console.log("data", {
            title,
            location,
            bedrooms,
            prop_size,
            price,
            desc,
            amenities,
            scenes,
            typeOfProperty,
        });

        setLoading(true);

        const scenesWithBase64 = await Promise.all(
            scenes.map(async (scene) => {
                const imgBase64 =
                    scene.img instanceof File
                        ? await readFileAsBase64(scene.img)
                        : scene.img;
                return {
                    ...scene,
                    img: imgBase64,
                };
            })
        );

        const body = {
            title,
            location,
            bedrooms,
            prop_size,
            price,
            desc,
            amenities,
            scenes: scenesWithBase64,
            typeOfProperty,
        };

        try {
            const res = await axios.post(
                "https://09ad-14-139-61-195.ngrok-free.app" + "/upload",
                body,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log("res", res);

            alert("Property created successfully!");
            router.push("/broker/properties");
        } catch (e) {
            console.log("error", e);
            alert("Something went wrong!");
        }

        setLoading(false);
    };

    const readFileAsBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    useEffect(() => {
        console.log("scene updated", scenes);
    }, [scenes]);

    return (
        <section className="flex w-full">
            {showImageModal && selectedScene && (
                <ImageModal
                    selectedScene={selectedScene}
                    setSelectedScene={setSelectedScene}
                    scenes={scenes}
                    setScenes={setScenes}
                    toggleCreateModal={() => {
                        setSelectedScene(null);
                        setShowImageModal(false);
                    }}
                />
            )}

            <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-gray-100">
                <h1 className="text-4xl font-bold">Create Property</h1>
                <div className="w-[90%] sm:w-[650px] max-sm:w-[90%] bg-gray-50 rounded-xl flex flex-col items-center justify-between p-10 max-h-screen overflow-y-scroll noscr">
                    <form onSubmit={handleSubmit} className="w-full max-w-lg">
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
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
                                    placeholder="Property Name"
                                    required
                                />
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="title"
                                >
                                    Address
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                    value={location}
                                    onChange={(e) =>
                                        setLocation(e.target.value)
                                    }
                                    id="address"
                                    type="text"
                                    placeholder="Property Address"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="property_size"
                                >
                                    Property Size
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                    value={prop_size}
                                    onChange={(e) =>
                                        setPropSize(e.target.value)
                                    }
                                    id="property_size"
                                    type="text"
                                    placeholder="Property Size (Sq. Ft.)"
                                    required
                                />
                            </div>
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="bedrooms"
                                >
                                    Bedrooms
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                    value={bedrooms}
                                    onChange={(e) =>
                                        setBedrooms(e.target.value)
                                    }
                                    id="bedrooms"
                                    type="text"
                                    placeholder="bedrooms"
                                    required
                                />
                            </div>
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="price"
                                >
                                    Price
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    id="price"
                                    type="text"
                                    placeholder="Property Price (₹)"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3 mb-6 md:mb-0">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="description"
                                >
                                    Description
                                </label>
                                <textarea
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                    value={desc}
                                    onChange={(e) => setDesc(e.target.value)}
                                    id="description"
                                    placeholder="Property Description"
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="amenities"
                                >
                                    Amenities
                                </label>
                                <div className="flex items-start text-sm space-x-2">
                                    <div className="w-full">
                                        <input
                                            id="amenities"
                                            minLength={3}
                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border  border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white peer"
                                            type="text"
                                            placeholder="A/C, Pool"
                                            value={newAmenity}
                                            onChange={(e) =>
                                                setNewAmenity(e.target.value)
                                            }
                                        />
                                        <p className="text-red-500 text-xs italic hidden peer-invalid:block">
                                            less than 3 characters
                                        </p>
                                    </div>
                                    <div
                                        className="text-center py-3 px-8 text-sm font-medium bg-peach-dark text-gray-100 rounded-2xl cursor-pointer sm:w-min hover:bg-peach hover:text-gray-50 bg-teal-400 hover:opacity-90"
                                        onClick={() => {
                                            if (newAmenity.length >= 3) {
                                                setAmenities((prev) => [
                                                    ...prev,
                                                    newAmenity,
                                                ]);
                                                setNewAmenity("");
                                            }
                                        }}
                                    >
                                        <span className="text-white">Add</span>
                                    </div>
                                </div>
                                <div className="flex flex-wrap -mx-1 overflow-hidden">
                                    {amenities.map((tag, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className="my-1 px-1 w-max overflow-hidden"
                                            >
                                                <div className="flex items-center justify-between px-2 py-1 bg-gray-200 rounded-full">
                                                    <span className="text-xs font-semibold text-gray-500">
                                                        {tag}
                                                    </span>
                                                    <button
                                                        className="text-gray-500 hover:text-gray-600 hover:opacity-70"
                                                        onClick={() => {
                                                            setAmenities(
                                                                (prev) =>
                                                                    prev.filter(
                                                                        (
                                                                            t,
                                                                            i
                                                                        ) =>
                                                                            i !==
                                                                            index
                                                                    )
                                                            );
                                                        }}
                                                    >
                                                        <RxCross2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
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
                                    {scenes?.length != 0 && (
                                        <div className="flex gap-2 flex-wrap">
                                            {scenes.map((scene, index) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className="relative w-32 rounded-lg shadow-md"
                                                    >
                                                        <img
                                                            onClick={() => {
                                                                setSelectedScene(
                                                                    scene
                                                                );
                                                                setShowImageModal(
                                                                    true
                                                                );
                                                            }}
                                                            className="w-32 h-32 object-cover rounded-xl"
                                                            src={
                                                                !scene.img
                                                                    ? ""
                                                                    : scene.img instanceof
                                                                      File
                                                                    ? URL.createObjectURL(
                                                                          scene.img
                                                                      )
                                                                    : scene.img
                                                            }
                                                            alt="Image"
                                                        />
                                                        <button
                                                            className="absolute top-0 right-0 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center"
                                                            onClick={() => {
                                                                setScenes(
                                                                    (prev) =>
                                                                        prev.filter(
                                                                            (
                                                                                t,
                                                                                i
                                                                            ) =>
                                                                                i !==
                                                                                index
                                                                        )
                                                                );
                                                            }}
                                                        >
                                                            <RxCross2 className="w-4 h-4 text-white" />
                                                        </button>
                                                        <input
                                                            type="text"
                                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-4 mt-3 leading-tight focus:outline-none focus:bg-white"
                                                        />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}

                                    {scenes.length < 20 && (
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
                                                onChange={(e) => {
                                                    if (e.target.files) {
                                                        setScenes((prev) => [
                                                            ...prev,
                                                            {
                                                                id: scenes.length,
                                                                img: e.target
                                                                    .files
                                                                    ? e.target
                                                                          .files[0]
                                                                    : "",
                                                                text: e.target
                                                                    .files
                                                                    ? e.target.files[0].name.split(
                                                                          "."
                                                                      )[0]
                                                                    : "",
                                                                hotspots: [],
                                                            },
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

                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3 mb-6 md:mb-0">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="type"
                                >
                                    Type
                                </label>
                                <select
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                    value={typeOfProperty}
                                    onChange={(e) =>
                                        setTypeOfProperty(e.target.value)
                                    }
                                    id="type"
                                    placeholder="Property Description"
                                >
                                    <option value="sale">Sale</option>
                                    <option value="rent">Rent</option>
                                    <option value="bid">Bid</option>
                                </select>
                            </div>
                        </div>

                        <button
                            disabled={loading}
                            type="submit"
                            className={`${
                                loading && "opacity-80"
                            } text-white text-center text-lg bg-teal-400 w-full py-3 rounded-xl`}
                        >
                            {loading ? "Creating..." : "Create"}
                        </button>
                    </form>
                </div>
            </div>

            <div className="hidden md:flex w-1/2 h-full items-center self-center justify-center">
                <Lottie options={defaultOptions} height={500} width={500} />
            </div>
        </section>
    );
};

export default CreateProperty;
