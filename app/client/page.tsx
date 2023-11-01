'use client'

import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";

import { useEffect } from 'react'
import ImageModal from '@/components/ImageModal'
import { Scene } from '@/types/MainTypes'
import React from 'react'
import { RxCross2 } from 'react-icons/rx'
import Card from "@/components/ui/Card";

type Props = {}

const CreateProperty = (props: Props) => {

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

    const [selectedScene, setSelectedScene] = React.useState<Scene | null>(null);

    const data = [
        {
            label: "All",
            value: "all",
            desc: <Card />,
        },
        {
            label: "For Sale",
            value: "sale",
            desc: <Card />,
        },
        {
            label: "For Rent",
            value: "rent",
            desc: `We're not always in the position that we want to be at.
          We're constantly growing. We're constantly making mistakes. We're
          constantly trying to express ourselves and actualize our dreams.`,
        },
        {
            label: "Bid",
            value: "bid",
            desc: <Card />,
        }
    ];


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (scenes.length == 0) {
            alert("Please add at least one scene");
            return;
        }


        setLoading(true);
        const formData = new FormData();
        formData.append("title", title);
        formData.append("location", location);
        formData.append("bedrooms", bedrooms);
        formData.append("prop_size", prop_size);
        formData.append("price", price);
        formData.append("desc", desc);
        formData.append("amenities", JSON.stringify(amenities));
        formData.append("scenes", JSON.stringify(scenes));
        // const res = await fetch("/api/property/create", {
        //     method: "POST",
        //     body: formData
        // });
        // const data = await res.json();
        // if (data.success) {
        //     console.log(data);
        //     window.location.href = "/broker/properties";
        // } else {
        //     console.log(data);
        // }
        setLoading(false);
    }


    useEffect(() => {
        console.log("scene updated", scenes);
    }, [scenes])

    return (
        <section className='flex w-full'>

            <div
                className='flex flex-col justify-center items-center w-full bg-gray-200 p-4 md:p-8'
            >
                <h1 className='text-3xl font-semibold self-start text-gray-800 mb-3'>Properties</h1>
                <div className=" bg-white rounded-[10px] flex flex-col w-full items-center justify-between p-10 max-h-screen overflow-y-scroll noscr">
                    <Tabs value="html"
                        style={{ width: "100%", minHeight: "100vh" }}
                    >
                        <TabsHeader>
                            {data.map(({ label, value }) => (
                                <Tab key={value} value={value}>
                                    {label}
                                </Tab>
                            ))}
                        </TabsHeader>
                        <TabsBody>
                            {data.map(({ value, desc }) => (
                                <TabPanel key={value} value={value}>
                                    {desc}
                                </TabPanel>
                            ))}
                        </TabsBody>
                    </Tabs>
                </div>
            </div>
        </section>
    )
}

export default CreateProperty