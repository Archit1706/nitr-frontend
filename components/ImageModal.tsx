"use client";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { FC } from "react";
import { RxCross2 } from "react-icons/rx";
import { Pannellum } from "pannellum-react";
import IMG from "assets/test.jpg";
import { MdOutlineMyLocation } from "react-icons/md";
import { Hotspot, Scene } from "@/types/MainTypes";
import LinkSceneModal from "./LinkSceneModal";

interface Props {
    toggleCreateModal: () => void;
    selectedScene: Scene;
    scenes: Scene[];
    setScenes: Dispatch<SetStateAction<Scene[]>>;
    setSelectedScene: Dispatch<React.SetStateAction<Scene | null>>
}

const ImageModal: FC<Props> = ({
    toggleCreateModal,
    selectedScene,
    scenes,
    setScenes,
    setSelectedScene
}: Props) => {

    const panImage = useRef<any>();

    // const [marking, setMarking] = useState(false);
    const marking = useRef(false);

    const [linkSceneModal, setLinkSceneModal] = useState(false);

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

    console.log("selected scenes in modal", selectedScene)

    return (
        <>
            {
                linkSceneModal && <LinkSceneModal scenes={scenes} selectedScene={selectedScene} setSelectedScene={setSelectedScene} toggleCreateModal={setLinkSceneModal} />
            }
            <div className="z-[100] absolute transform top-5 bottom-5 left-1/2 -translate-x-1/2 w-[90%] md:w-[70%] bg-white rounded-[10px] flex flex-col items-center justify-between p-5 max-h-screen overflow-y-scroll noscr">
                <div
                    className="w-full flex"
                >
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold">{selectedScene.text}</h1>
                    </div>
                    <div className="flex-1 flex justify-end">
                        <button
                            onClick={() => {
                                setScenes((prev) => {
                                    return prev.map((scene) => {
                                        if (scene.id === selectedScene.id) {
                                            return selectedScene
                                        }
                                        return scene
                                    })
                                })
                                toggleCreateModal()
                            }}
                            className="text-3xl text-gray-400 hover:text-gray-600"
                        >
                            <RxCross2 />
                        </button>
                    </div>
                </div>

                <div className="flex flex-col w-full items-start gap-4">

                    <button
                        onClick={() => {
                            console.log("marking", marking);
                            // setMarking(!marking);
                            marking.current = !marking.current;
                        }}
                        className={`btn-sm text-gray-200 bg-gray-900 hover:bg-gray-700`}>
                        {
                            <>
                                <span>Mark</span>
                                <MdOutlineMyLocation className="w-5 h-5 ml-2" />
                            </>
                        }
                    </button>
                    <div
                        className="w-full aspect-video"
                    >
                        <Pannellum
                            ref={panImage}
                            width="100%"
                            height="100%"
                            image={!selectedScene.img ? "" : (selectedScene.img instanceof File ? URL.createObjectURL(selectedScene.img) : selectedScene.img)}
                            pitch={10}
                            yaw={180}
                            hfov={700}
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
                            // onMousedown={(evt : any) => { console.log("Mouse Down", evt); }}
                            // onMouseup={(evt : any) => { console.log("Mouse Up", evt); }}
                            // onTouchstart={(evt : any) => { console.log("Touch Start", evt); }}
                            // onTouchend={(evt : any) => { console.log("Touch End", evt); }}
                            // identify click action
                            onMouseup={(event: any) => {
                                if (marking.current) {
                                    console.log("marking now");
                                    // setScenes((prev) => {
                                    //     return prev.map((scene, index) => {
                                    //         return scene.id === selectedScene.id ? {
                                    //             ...scene,
                                    //             hotspots: [
                                    //                 ...scene.hotspots,
                                    //                 {
                                    //                     type: "scene",
                                    //                     text: "some text",
                                    //                     pitch: panImage.current.getViewer().mouseEventToCoords(event)[1],
                                    //                     yaw: panImage.current.getViewer().mouseEventToCoords(event)[0],
                                    //                     link: -1,
                                    //                 }
                                    //             ]
                                    //         } : scene
                                    //     })
                                    // })

                                    setSelectedScene((scene) => {
                                        if (!scene) return null;
                                        return {
                                            ...scene,
                                            hotspots: [...scene.hotspots, {
                                                type: "custom",
                                                text: "Kitchen",
                                                pitch: panImage.current.getViewer().mouseEventToCoords(event)[1],
                                                yaw: panImage.current.getViewer().mouseEventToCoords(event)[0],
                                                link: -1,
                                            }]
                                        }
                                    })

                                    setLinkSceneModal(true)
                                    marking.current = false
                                }
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
                                selectedScene?.hotspots.map((hotSpot, index) => (
                                    <Pannellum.Hotspot
                                        key={index}
                                        type={hotSpot.type === "custom" ? "custom" : "info"}
                                        pitch={hotSpot.pitch}
                                        yaw={hotSpot.yaw}
                                        text={hotSpot.text}
                                        handleClick={(evt: any) => {
                                            console.log("Hotspot clicked!", evt);
                                            setSelectedScene(
                                                scenes.find((scene) => scene.id === hotSpot.link) || null
                                            )
                                        }}
                                        createTooltipFunc={(hotSpotDiv: HTMLDivElement, args: any) => {
                                            hotspotIcon(hotSpotDiv);
                                        }}
                                    />
                                ))
                            }
                        </Pannellum>
                    </div>
                </div>
            </div>

            <div
                onClick={toggleCreateModal}
                className="fixed top-0 left-0 w-screen h-screen bg-black/60 flex items-center justify-center"
            ></div>
        </>
    );
};

export default ImageModal;
