'use client'

import { useEffect } from 'react'
import ImageModal from '@/components/ImageModal'
import { Scene } from '@/types/MainTypes'
import React from 'react'
import { RxCross2 } from 'react-icons/rx'

type Props = {}

const CreateProperty = (props: Props) => {

    const [title, setTitle] = React.useState("");

    const [loading, setLoading] = React.useState(false);

    const [scenes, setScenes] = React.useState<Scene[]>([]);

    const [showImageModal, setShowImageModal] = React.useState(false);

    const [selectedScene, setSelectedScene] = React.useState<Scene | null>(null);
    
    useEffect(()=>{
        console.log("scene updated", scenes);
    }, [scenes])

    return (
        <section>

            {
                showImageModal && selectedScene && (
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
                )
            }

            <div
                className='flex flex-col justify-center items-center h-screen w-screen bg-gray-100'
            >
                <h1 className='text-4xl font-bold'>Create Property</h1>
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
                                    {
                                        scenes?.length != 0 && (
                                            <div className="flex gap-2 flex-wrap">
                                                {scenes.map((scene, index) => {
                                                    return (
                                                        <div key={index} className="relative w-32 h-32 rounded-lg shadow-md">
                                                            <img
                                                                onClick={() => {
                                                                    setSelectedScene(scene);
                                                                    setShowImageModal(true);
                                                                }}
                                                                className="w-full h-full object-cover rounded-xl"
                                                                src={!scene.img ? "" : (scene.img instanceof File ? URL.createObjectURL(scene.img) : scene.img)}
                                                                alt="Image"
                                                            />
                                                            <button
                                                                className="absolute top-0 right-0 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center"
                                                                onClick={() => {
                                                                    setScenes((prev) => prev.filter((t, i) => i !== index));
                                                                }}
                                                            >
                                                                <RxCross2 className="w-4 h-4 text-white" />
                                                            </button>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        )
                                    }

                                    {scenes.length < 6 && (
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
                                                    <span className="font-semibold">Click to upload</span>{" "}
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
                                                                img: e.target.files ? e.target.files[0] : "",
                                                                text: e.target.files ? e.target.files[0].name : "",
                                                                hotspots: []
                                                            }
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
                            className={`${loading && "opacity-80"
                                } text-white text-center text-lg fundo-button w-full py-3 rounded-xl`}
                        >
                            {loading ? "Creating..." : "Create"}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default CreateProperty