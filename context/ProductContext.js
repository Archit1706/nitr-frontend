"use client";
import { createContext, useState } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {

    const [products, setProducts] = useState([]);

    const [product, setProduct] = useState({});
    const [realestates, setRealestates] = useState([]);

    const getRealestates = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/product/get-properties`);
        const data = await res.json();
        if (data.success) setRealestates(data.message);
    }

    const getLaptops = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/product/get-laptops`);
        const data = await res.json();
        if (data.success) setLaptops(data.message);
    }

    const getAllProducts = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/product/get`);
        const data = await res.json();
        if (data.success) setProducts(data.message);
    }

    return (
        <ProductContext.Provider value={{
            product,
            realestates,
            products,
            setProduct,
            setRealestates,
            getRealestates,
            getAllProducts,

        }}>
            {children}
        </ProductContext.Provider>
    )
}