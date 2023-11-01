"use client";

import { useRef, useState } from "react";
import { FC } from "react";
import { RxCross2 } from "react-icons/rx";
import { Pannellum } from "pannellum-react";
import IMG from "assets/test.jpg";

interface Props {
    toggleCreateModal: () => void;
    image: File;
}

const ImageModal: FC<Props> = ({
    toggleCreateModal,
    image
}: Props) => {

    const panImage = useRef<any>();

    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState<File[]>([]);

    const [hotSpot, setHotSpot] = useState({
        pitch: 10,
        yaw: 180,
        type: "info",
        text: "Info Hotspot Text",
        URL: "https://www.google.com",
    });

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

    return (
        <>
            <div className="z-[999] absolute transform top-5 bottom-5 left-1/2 -translate-x-1/2 w-[90%] bg-white rounded-[10px] flex flex-col items-center justify-between p-5 max-h-screen overflow-y-scroll noscr">
                <div
                    className="w-full flex"
                >
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold">{image.name}</h1>
                    </div>
                    <div className="flex-1 flex justify-end">
                        <button
                            onClick={toggleCreateModal}
                            className="text-3xl text-gray-400 hover:text-gray-600"
                        >
                            <RxCross2 />
                        </button>
                    </div>
                </div>

                <div>
                    <Pannellum
                        ref={panImage}
                        width="800px"
                        height="400px"
                        image={IMG.src}
                        pitch={10}
                        yaw={180}
                        hfov={500}
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
                            // setPitch(
                            //     panImage.current.getViewer().mouseEventToCoords(event)[0]
                            // );
                            console.log("Mouse Up", panImage.current.getViewer().mouseEventToCoords(event)[0]);
                            // setYaw(panImage.current.getViewer().mouseEventToCoords(event)[1]);
                            console.log("Mouse Up", panImage.current.getViewer().mouseEventToCoords(event)[1]);

                            setHotSpot({
                                ...hotSpot,
                                pitch: panImage.current.getViewer().mouseEventToCoords(event)[0],
                                yaw: panImage.current.getViewer().mouseEventToCoords(event)[1],
                            });


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
                            hotSpot && (
                                <Pannellum.Hotspot
                                    type="custom"
                                    pitch={hotSpot.pitch}
                                    yaw={hotSpot.yaw}
                                    tooltip={hotspotIcon}
                                    handleClick={(evt: any, name: string) => { }
                                        // setCurrentScene(hotSpot.transition)
                                    }
                                    name="image info"
                                />
                            )
                        }
                    </Pannellum>

                </div>
            </div>

            <div
                onClick={toggleCreateModal}
                className="fixed top-0 left-0 z-[998] w-screen h-screen bg-black/60 flex items-center justify-center"
            ></div>
        </>
    );
};

export default ImageModal;
