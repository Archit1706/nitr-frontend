"use client";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { FC } from "react";
import { RxCross2 } from "react-icons/rx";
import { Pannellum } from "pannellum-react";
import IMG from "assets/test.jpg";
import { MdOutlineMyLocation } from "react-icons/md";
import { Hotspot, Scene } from "@/types/MainTypes";



interface Props {
    toggleCreateModal: Dispatch<SetStateAction<boolean>>;
    selectedScene: Scene;
    scenes: Scene[];
    setSelectedScene: Dispatch<React.SetStateAction<Scene | null>>
}

const LinkSceneModal: FC<Props> = ({
    toggleCreateModal,
    selectedScene,
    scenes,
    setSelectedScene

}: Props) => {

    const [loading, setLoading] = useState(false);

    const [choice, setChoice] = useState('0');

    return (
        <>
            <div className="z-[999] absolute transform top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[90%] md:w-auto bg-white rounded-[10px] flex flex-col items-center justify-between p-5 max-h-screen overflow-y-scroll noscr">
                <div
                    className="w-full flex gap-10"
                >
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold whitespace-nowrap">Connect with a scene</h1>
                    </div>
                    <div className="flex-1 flex justify-end">
                        <button
                            onClick={() => {
                                setSelectedScene((prev) => {
                                    if (!prev) return null;
                                    return {
                                        ...prev,
                                        hotspots: prev.hotspots.slice(0, -1)
                                    }
                                })
                                toggleCreateModal(false);
                            }}
                            className="text-3xl text-gray-400 hover:text-gray-600"
                        >
                            <RxCross2 />
                        </button>
                    </div>
                </div>

                <div className="flex flex-col w-full items-start gap-4">
                    <div className="w-full max-w-lg">
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3 mb-6 md:mb-0">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="scene"
                                >
                                    Scene
                                </label>
                                <select
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                    value={choice}
                                    onChange={(e) => {
                                        // setScenes((prev: Scene[]) => {
                                        //     return (
                                        //         prev.map((scene: Scene) => {
                                        //             if (scene.id === selectedScene.id) {
                                        //                 return {
                                        //                     ...scene,
                                        //                     hotspots: [
                                        //                         ...scene.hotspots.slice(0, -1),
                                        //                         {
                                        //                             ...scene.hotspots[scene.hotspots.length - 1],
                                        //                             link: parseInt(e.target.value)
                                        //                         }
                                        //                     ]
                                        //                 }
                                        //             }
                                        //             return scene;
                                        //         })
                                        //     )
                                        // })

                                        // let tempHot = selectedScene.hotspots[-1]
                                        // tempHot.link = parseInt(e.target.value);
                                        // setSelectedScene(prev => {
                                        //     if (!prev) return null;
                                        //     return {
                                        //         ...prev,
                                        //         hotspots: [
                                        //             ...prev.hotspots.slice(0, -1),
                                        //             tempHot
                                        //         ]
                                        //     }
                                        // })

                                        setChoice(e.target.value)
                                    }}
                                    id="scene"
                                    required
                                >
                                    {scenes.map((scene, index: number) => (
                                        <option key={index} value={index}>
                                            {scene.text}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <button
                            disabled={loading}
                            onClick={(e) => {
                                e.preventDefault()
                                // check if linked or not
                                if (!choice) {
                                    alert("Link to a scene OR cancel.")
                                    return;
                                } else {
                                    setSelectedScene(prev => {
                                        if (!prev) return null;
                                        return {
                                            ...prev,
                                            hotspots: [
                                                ...prev.hotspots.slice(0, -1),
                                                {
                                                    ...prev.hotspots[prev.hotspots.length - 1],
                                                    link: parseInt(choice)
                                                }
                                            ]
                                        }
                                    })
                                    toggleCreateModal(false);
                                }
                            }}
                            type="submit"
                            className={`${loading && "opacity-80"
                                } text-white text-center text-lg bg-black w-full py-3 rounded-xl`}
                        >
                            {loading ? "Creating..." : "Create"}
                        </button>
                    </div>
                </div>
            </div>

            <div
                onClick={() => {
                    setSelectedScene((prev) => {
                        if (!prev) return null;
                        return {
                            ...prev,
                            hotspots: prev.hotspots.slice(0, -1)
                        }
                    })
                    toggleCreateModal(false);
                }}
                className="fixed top-0 left-0 z-[998] w-screen h-screen bg-black/60 flex items-center justify-center"
            ></div>
        </>
    );
};

export default LinkSceneModal;
