'use client'

import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import axios from 'axios'

import { useEffect } from 'react'
import ImageModal from '@/components/ImageModal'
import { PropertyType, Scene } from '@/types/MainTypes'
import React from 'react'
import { RxCross2 } from 'react-icons/rx'
import Card from "@/components/ui/Card";

type Props = {}

const CreateProperty = (props: Props) => {

    const [properties, setProperties] = React.useState<PropertyType[]>([
        {
            "title": "Ramnivas",
            "location": "Malad, Mumbai",
            "bedrooms": "2",
            "prop_size": "600",
            "price": "2000000",
            "desc": "New property on sale!",
            "typeOfProperty": "rent",
            "amenities": [
                "A/C",
                "Pool",
                "Sea View"
            ],
            "scenes": [
                {
                    "id": 0,
                    "img": "https://fridayphotos.s3.eu-central-1.amazonaws.com/test_photoset/0005.JPG",
                    "text": "test",
                    "hotspots": [
                        {
                            "type": "custom",
                            "text": "Kitchen",
                            "pitch": 174.74930458511992,
                            "yaw": 21.631147406159144,
                            "link": 1
                        }
                    ]
                },
                {
                    "id": 1,
                    "img": "https://fridayphotos.s3.eu-central-1.amazonaws.com/test_photoset/0005.JPG",
                    "text": "nit",
                    "hotspots": [
                        {
                            "type": "custom",
                            "text": "Kitchen",
                            "pitch": 0.09009231299632514,
                            "yaw": 10.723411299831989,
                            "link": 0
                        }
                    ]
                }
            ]
        },
        {
            "title": "Ramnivas 2",
            "location": "Malad, Mumbai",
            "bedrooms": "2",
            "prop_size": "600",
            "price": "2000000",
            "desc": "New property on sale!",
            "typeOfProperty": "sale",
            "amenities": [
                "A/C",
                "Pool",
                "Sea View"
            ],
            "scenes": [
                {
                    "id": 0,
                    "img": "https://fridayphotos.s3.eu-central-1.amazonaws.com/test_photoset/0005.JPG",
                    "text": "test",
                    "hotspots": [
                        {
                            "type": "custom",
                            "text": "Kitchen",
                            "pitch": 174.74930458511992,
                            "yaw": 21.631147406159144,
                            "link": 1
                        }
                    ]
                },
                {
                    "id": 1,
                    "img": "https://fridayphotos.s3.eu-central-1.amazonaws.com/test_photoset/0005.JPG",
                    "text": "nit",
                    "hotspots": [
                        {
                            "type": "custom",
                            "text": "Kitchen",
                            "pitch": 0.09009231299632514,
                            "yaw": 10.723411299831989,
                            "link": 0
                        }
                    ]
                }
            ]
        },
        {
            "title": "Ramnivas 3",
            "location": "Malad, Mumbai",
            "bedrooms": "2",
            "prop_size": "600",
            "price": "2000000",
            "desc": "New property on sale!",
            "typeOfProperty": "bid",
            "amenities": [
                "A/C",
                "Pool",
                "Sea View"
            ],
            "scenes": [
                {
                    "id": 0,
                    "img": "https://fridayphotos.s3.eu-central-1.amazonaws.com/test_photoset/0005.JPG",
                    "text": "test",
                    "hotspots": [
                        {
                            "type": "custom",
                            "text": "Kitchen",
                            "pitch": 174.74930458511992,
                            "yaw": 21.631147406159144,
                            "link": 1
                        }
                    ]
                },
                {
                    "id": 1,
                    "img": "https://fridayphotos.s3.eu-central-1.amazonaws.com/test_photoset/0005.JPG",
                    "text": "nit",
                    "hotspots": [
                        {
                            "type": "custom",
                            "text": "Kitchen",
                            "pitch": 0.09009231299632514,
                            "yaw": 10.723411299831989,
                            "link": 0
                        }
                    ]
                }
            ]
        },
    ]);

    const data = [
        {
            label: "All",
            value: "all",
            desc: <Card properties={properties} />,
        },
        {
            label: "For Sale",
            value: "sale",
            desc: <Card properties={properties.filter(obj => {
                return obj.typeOfProperty === 'sale'
            })} />,
        },
        {
            label: "For Rent",
            value: "rent",
            desc: <Card properties={properties.filter(obj => {
                return obj.typeOfProperty === 'rent'
            })} />,
        },
        {
            label: "Bid",
            value: "bid",
            desc: <Card properties={properties.filter(obj => {
                return obj.typeOfProperty === 'bid'
            })} />,
        }
    ];

    const fetchData = async () => {
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
        fetchData()
    }, [])

    return (
        <section className='flex w-full'>

            <div
                className='flex flex-col justify-center items-center w-full bg-gray-200 p-4 md:p-8'
            >
                <h1 className='text-3xl font-semibold self-start text-gray-800 mb-3'>Properties</h1>
                <div className=" bg-white rounded-[10px] flex flex-col w-full items-center justify-between p-10 max-h-screen overflow-y-scroll noscr">
                    <Tabs value="all"
                        style={{ width: "100%", minHeight: "100vh", overflowY: 'scroll' }}
                        className="noscr"
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