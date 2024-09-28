"use client"
import React, { useEffect, useState } from 'react'
import { usersData } from '@/data'

interface productId {
    params: {
        id: string
    }
}
interface IproductReview {
    date: string,
    productId: string,
    review: string,
    userName: string,
    _id: string
}
type product = {
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
    productReview: IproductReview[] | [],
    __v: number,
    _id: string
}
console.log(usersData)
const page = ({ params: { id } }: productId) => {
    const [productInformation, setproductInformation] = useState<product>({
        productName: '',
        productPrice: 0,
        productInfo: '',
        productImage1: '',
        productImage2: '',
        processorinterface: '',
        processorName: '',
        processorType: '',
        brand: '',
        ram: '',
        rom: '',
        windowVersion: '',
        color: '',
        netWeight: '',
        inch: '',
        gamingGraphics: '',
        productReview: [],
        __v: 0,
        _id: ''
    })
    const [loading, setloading] = useState<boolean>(true)
    const [reviewText, setreviewText] = useState<string>('')
    const [loadingBtn, setloadingBtn] = useState<boolean>(false)
    useEffect(() => {
        // if (usersData.userName === '') return
        getProductInformation()
    }, [])
    const getProductInformation = () => {
        fetch('http://localhost:3000/api/Ecommerce/Product', {
            headers: { 'Content-type': 'application/json' },
            method: 'post',
            cache: "no-store",
            body: JSON.stringify({
                _id: id
            })
        }).then(res => res.json())
            .then(res => {
                setloading(false)
                setproductInformation(res.message)
                console.log(res.message)
            })
            .catch(err => {
                setloading(false)
                alert(err)
            })
    }


    const addReview = () => {
        if (reviewText === '') return
        setloadingBtn(true)
        let date = new Date().getDate()
        let year = new Date().getFullYear()
        let month = new Date().getMonth() + 1
        let hour = new Date().getHours()
        let min = new Date().getMinutes()
        let minute = min < 10 ? `0${min}` : min
        let fullDate = `${year}/${month}/${date}  ${hour}:${minute}`
        fetch('http://localhost:3000/api/Ecommerce/ProductReview', {
            headers: { 'Content-type': 'application/json' },
            method: 'post',
            cache: "no-store",
            body: JSON.stringify({
                productId: id,
                review: reviewText,
                date: fullDate,
                userName: usersData.userName,
            })
        }).then(res => res.json())
            .then(res => {
                setloadingBtn(false)
                console.log(res.message)
            })
            .catch(err => {
                setloadingBtn(false)
                alert(err)
            })
    }
    return (
        <div>
            {loading ?
                <h1>loading...</h1>
                :
                <div>
                    <div className='w-[90%] pt-[5rem] m-[auto] pb-[1rem] max-[1111px]:w-[85%]'>
                        <div className='flex items-center flex-wrap'>
                            <div><img src={productInformation.productImage1} alt="" /></div>
                            <div><img src={productInformation.productImage2} alt="" /></div>
                        </div>
                    </div>
                    <div className="mt-[1.5rem]" >
                        <div className="flex font-semibold text-[1.3rem] productinfo py-[0.9rem] pl-[1.2rem] bg-[grey]">
                            <h4>product name:</h4>
                            <h4 className="ml-[2rem] max-[377px]:ml-[1rem]">{productInformation.productName}</h4>
                        </div>
                        <div className="flex font-semibold text-[1.3rem] productinfo py-[0.9rem] pl-[1.2rem] bg-[white]">
                            <h4>product price:</h4>
                            <div className="flex ml-[2rem]">
                                <span className="naira">&#8358;</span>
                                <h4 className="productprice  generalname max-[377px]:ml-[1rem]">{productInformation.productPrice}</h4>
                            </div>
                        </div>
                        <div className="flex font-semibold text-[1.3rem] productinfo py-[0.9rem] pl-[1.2rem] bg-[grey]">
                            <h4>core type :</h4>
                            <h4 className="ml-[2rem] max-[377px]:ml-[1rem]">{productInformation.processorType}</h4>
                        </div>
                        <div className="flex font-semibold text-[1.3rem] productinfo py-[0.9rem] pl-[1.2rem] bg-[white]">
                            <h4>core name:</h4>
                            <h4 className="ml-[2rem] max-[377px]:ml-[1rem]">{productInformation.processorName}</h4>
                        </div>

                        <div className="flex font-semibold text-[1.3rem] productinfo py-[0.9rem] pl-[1.2rem] bg-[grey]">
                            <h4>ram:</h4>
                            <h4 className="ml-[2rem] max-[377px]:ml-[1rem]">{productInformation.ram}</h4>
                        </div>
                        <div className="flex font-semibold text-[1.3rem] productinfo py-[0.9rem] pl-[1.2rem] bg-[white]">
                            <h4>rom:</h4>
                            <h4 className="ml-[2rem] max-[377px]:ml-[1rem]">{productInformation.rom}</h4>
                        </div>
                        <div className="flex font-semibold text-[1.3rem] productinfo py-[0.9rem] pl-[1.2rem] bg-[grey]">
                            <h4>operating system:</h4>
                            <h4 className="ml-[2rem] max-[377px]:ml-[1rem]">{productInformation.windowVersion}</h4>
                        </div>
                        <div className="flex font-semibold text-[1.3rem] productinfo py-[0.9rem] pl-[1.2rem] bg-[white]">
                            <h4>color:</h4>
                            <h4 className="ml-[2rem] max-[377px]:ml-[1rem]">{productInformation.color}</h4>
                        </div>
                        <div className="flex font-semibold text-[1.3rem] productinfo py-[0.9rem] pl-[1.2rem] bg-[grey]">
                            <h4>brand:</h4>
                            <h4 className="ml-[2rem] max-[377px]:ml-[1rem]">{productInformation.brand}</h4>
                        </div>
                        <div className="flex font-semibold text-[1.3rem] productinfo py-[0.9rem] pl-[1.2rem] bg-[white]">
                            <h4>weight:</h4>
                            <h4 className="ml-[2rem] max-[377px]:ml-[1rem]">{productInformation.netWeight}</h4>
                        </div>
                        <div className="flex font-semibold text-[1.3rem] productinfo py-[0.9rem] pl-[1.2rem] bg-[grey]">
                            <h4>screen inch:</h4>
                            <h4 className="ml-[2rem] max-[377px]:ml-[1rem]">{productInformation.inch}</h4>
                        </div>
                        <div className="flex font-semibold text-[1.3rem] productinfo py-[0.9rem] pl-[1.2rem] bg-[white]">
                            <h4>gaming graphics:</h4>
                            <h4 className="ml-[2rem] max-[377px]:ml-[1rem]">{productInformation.gamingGraphics}</h4>
                        </div>
                        <div className='ml-[2rem]'>
                            <h4>Product Review</h4>
                            <div>
                                {
                                    productInformation.productReview.map((Item) => {
                                        return <div key={Item._id}>
                                            <div className='flex items-center'>
                                                <h5 className='mr-[1rem] font-extrabold'>{Item.userName}</h5>
                                                <h5>{Item.review}</h5>
                                            </div>
                                            <p className=''>{Item.date}</p>
                                        </div>
                                    })
                                }
                            </div>
                            <div className='flex items-center justify-center w-[70%] m-[auto]'>
                                <input type="text" placeholder="add product review" className="block  p-[0.3rem] pl-[0.8rem] outline-none rounded-md border-[1px] border-[#c8c5c5] w-[85%]" value={reviewText} onChange={(e) => setreviewText(e.target.value)} />
                                {
                                    loadingBtn ?
                                        <button type="submit" className="block ml-3 bg-[#19afe0] py-[0.4rem] rounded-md text-white font-bold w-[25%]" >loading...</button>
                                        :
                                        <button type="submit" className="block ml-3 bg-[#19afe0] py-[0.4rem] rounded-md text-white font-bold w-[25%]" onClick={addReview}>add review</button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default page