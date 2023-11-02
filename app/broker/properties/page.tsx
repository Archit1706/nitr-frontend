'use client'

import CurrencyFormat from 'react-currency-format'
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import { useRouter } from 'next/navigation'

import { useEffect, useState } from 'react'
import ImageModal from '@/components/ImageModal'
import { PropertyType, Scene } from '@/types/MainTypes'
import React from 'react'
import { RxCross2 } from 'react-icons/rx'
import Card from "@/components/ui/Card";
import { FaHouseCircleCheck } from 'react-icons/fa6';
import axios from "axios";

type Props = {}

const CreateProperty = (props: Props) => {

    const router = useRouter()

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

    const [properties, setProperties] = useState<PropertyType[]>([]);


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


    const fetchAll = async () => {
        try {
            const res = await axios("https://09ad-14-139-61-195.ngrok-free.app" + "/properties", {
                headers: {
                    "ngrok-skip-browser-warning": "69420",
                },
            })
            const data = res.data
            console.log(data)
            setProperties(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchAll()
    }, [])


    useEffect(() => {
        console.log("scene updated", scenes);
    }, [scenes])

    return (
        <section className='flex w-full'>

            <div
                className='flex flex-col justify-center items-center w-full bg-gray-200 p-4 md:p-8'
            >
                <div
                    className='flex justify-between items-center w-full'
                >
                    <h1 className='text-3xl font-semibold self-start text-gray-800 mb-3'>Your Properties</h1>
                    <button
                    onClick={()=>{
                        router.push("/broker/create")
                    }}
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                    >
                        Create
                    </button>
                </div>
                <div className=" bg-white rounded-[10px] flex flex-col w-full items-center justify-between md:p-10 max-h-screen overflow-y-scroll noscr">
                    <div className="container mx-auto px-4 sm:px-8">
                        <div className="py-8">
                            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                                    <table className="min-w-full leading-normal">
                                        <thead>
                                            <tr>
                                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                    Name
                                                </th>
                                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                    Location
                                                </th>
                                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                    Area (sqft)
                                                </th>
                                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                    Type
                                                </th>
                                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                    Price
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                properties?.map((property, i) => {
                                                    return (
                                                        <tr key={i}>
                                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                <div className="flex items-center">
                                                                    <div className="flex-shrink-0 w-6 h-6">
                                                                        <FaHouseCircleCheck className="w-full h-full rounded-full" />
                                                                    </div>
                                                                    <div className="ml-3 cursor-pointer font-semibold"
                                                                        onClick={() => {
                                                                            router.push(`/client/properties/${property._id}`)
                                                                        }}
                                                                    >
                                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                                            {property.title}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                <p className="text-gray-900 whitespace-no-wrap">{property?.location}</p>
                                                            </td>
                                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                <p className="text-gray-900 whitespace-no-wrap">{property?.prop_size}</p>
                                                            </td>
                                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                {
                                                                    property?.typeOfProperty === "bid" ? (
                                                                        <span className="relative inline-block px-3 py-1 font-semibold text-yellow-900 leading-tight">
                                                                            <span className="relative">Bid</span>
                                                                        </span>
                                                                    ) : (
                                                                        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                                                            <span className="relative">
                                                                                {
                                                                                    property?.typeOfProperty === "rent" ? "Rent" : "Sale"
                                                                                }
                                                                            </span>
                                                                        </span>
                                                                    )
                                                                }
                                                            </td>
                                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                <p className="text-gray-900 whitespace-no-wrap">
                                                                    <CurrencyFormat value={property?.price} displayType={'text'} thousandSeparator={true} prefix={'Rs.'} />
                                                                </p>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default CreateProperty