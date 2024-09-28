"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { usersData } from '@/data'

type Icard = [{
    productName: string,
    productPrice: number,
    productInfo: string,
    productImage1: string,
    productImage2: string,
    processorinterface: string,
    processorName: string,
    processorType: string,
    brand: string,
    ram: string,
    rom: string,
    windowVersion: string,
    color: string,
    netWeight: string,
    inch: string,
    gamingGraphics: string,
    productReview: string | null,
    __v: number,
    _id: string
}]
interface Icard1 {
    allProduct: Icard | []
}


// type Icard = {
//     allProduct: [
//         {
//             productName: string,
//             productPrice: number,
//             productInfo: string,
//             productImage1: string,
//             productImage2: string,
//             processorType: string,
//             processorName: string,
//             brand: string,
//             ram: string,
//             rom: string,
//             windowVersion: string,
//             color: string,
//             netWeight: string,
//             inch: string,
//             gamingGraphics: string,
//             productReview: string | null,
//             __v: number,
//             _id: string
//         }
//     ]
// }
console.log(usersData)
const Card = ({ allProduct }: Icard1) => {
    const [loadingBtn, setloadingBtn] = useState(false)

    const addToCart = (id: string) => {
        setloadingBtn(true)
        fetch('http://localhost:3000/api/Ecommerce/Cart', {
            headers: { 'Content-type': 'application/json' },
            method: 'post',
            cache: "no-store",
            body: JSON.stringify({
                productId: id,
                userId: usersData._id,
            })
        }).then(res => res.json())
            .then(res => {
                setloadingBtn(false)
                console.log(res.message)
                if (res.status) alert('product added to cart')
                else alert(res.message)
            })
            .catch(err => {
                console.log(err)
                setloadingBtn(false)
                alert(err)
            })
    }
    return (
        <div className='flex item-center flex-wrap'>
            {
                allProduct?.map(item => {
                    return <div className="w-[13rem] mx-[1rem] my-[1rem]" key={item._id}>
                        <Link href={`/Product/${item._id}`} className='text-black'>
                            <div className="w-[100%] h-[9rem]"><img src={item.productImage1} alt="" /></div>
                            <h5 className=''>{item.productName}</h5>
                            <p>{item.productPrice.toLocaleString()}</p>
                        </Link>
                        <button type="submit" onClick={() => addToCart(item._id)} className="block bg-[#19afe0] py-[0.4rem] rounded-md text-white font-bold w-[85%]" >add to cart</button>
                    </div>
                })
            }
        </div>
    )
}

export default Card