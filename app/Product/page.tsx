"use client"
import React, { useState, useEffect } from 'react'
import { allProd } from '@/models/database'
import { Card } from '@/components'
import Link from 'next/link'
import { usersData } from '@/data'


const page = () => {

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
        message: Icard,
        status: boolean
    }

    const [allProduct, setallProduct] = useState<Icard | []>([])
    // const [allProduct, setallProduct] = useState<String>('ppp')
    useEffect(() => {
        // if (usersData.userName === '') return
        getAllProducts()
    }, [])
    const getAllProducts = () => {
        fetch('http://localhost:3000/api/Ecommerce/Product',
            { cache: "no-store" }
        ).then(res => res.json())
            .then(res => {
                setallProduct(res.message)
            })
            .catch(err => console.log(err))
    }

    const AddProducts = () => {
        fetch('http://localhost:3000/api/Ecommerce/Product', {
            headers: { 'Content-type': 'application/json' },
            method: 'post',
            cache: "no-store",
            body: JSON.stringify(allProd)
        }).then(res => res.json())
            .then(res => {
                console.log(res)
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <h3 className='text-end m-2'><Link href='/Cart'>Cart</Link></h3>
            <h3 className='text-end m-2'><Link href='/Order'>Order</Link></h3>
            <button onClick={AddProducts}>add product</button>
            <div className=' mt-[5rem] mx-[2rem]'><Card allProduct={allProduct} /></div>
        </div>
    )
}

export default page