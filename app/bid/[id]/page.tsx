import MainAuctionPage from '@/components/auctionPage/MainAuctionPage'
import { Product } from '@/types/MainTypes'
import React from 'react'
import products from '@/assets/realestate.json'

type Props = {}



const BidPage = (props: Props) => {

    // const moreProducts: Product[] = [
    //     {
    //         _id: 1,
    //         name: 'Test Product',
    //         brand: 'Test Brand',
    //         description: 'Test Description',
    //         price: 100,
    //         images: ['https://picsum.photos/200'],
    //         createDate: new Date(),
    //         seller: 'Test Seller',
    //         category: 'Test Category',
    //     },
    //     {
    //         _id: 2,
    //         name: 'Test Product',
    //         brand: 'Test Brand',
    //         description: 'Test Description',
    //         price: 100,
    //         images: ['https://picsum.photos/200'],
    //         createDate: new Date(),
    //         seller: 'Test Seller',
    //         category: 'Test Category',
    //     }
    // ]

    return (
        <div>
            <MainAuctionPage
                // type={product?.category}
                // color={colors[product?.category]}
                product={products[0]}
                moreProducts={products}
            />
            {/* <LatestProducts latestProducts={products.slice(0, 4)} /> */}
        </div>
    )
}

export default BidPage