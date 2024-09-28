"use client"
import React, { useEffect, useState } from 'react'
import { usersData } from '@/data'

type Icard = {
    productName: string,
    productPrice: number,
    productInfo: string,
    productImage1: string,
    productImage2: string,
    processorName: string,
    processorType: string,
    brand: string,
    ram: string,
    rom: string,
    windowVersion: string,
    color: string,
    netWeight: string,
    inch: string,
    quantity?: number,
    gamingGraphics: string,
    productReview: string[],
    __v: number,
    _id: string
}
type Icard1 = [{
    productId: Icard
    __v: number,
    userId: string,
    _id: string
}]

const page = () => {
    const [loading, setloading] = useState(false)
    const [productInformation, setproductInformation] = useState<Icard1 | []>([])
    const [loadingBtn, setloadingBtn] = useState(false)
    const [showOrder, setshowOrder] = useState(false)
    const [address, setaddress] = useState('')
    useEffect(() => {
        // if (usersData.userName === '') return
        getProductInformation()
    }, [])

    const getProductInformation = () => {
        setloadingBtn(true)
        fetch('http://localhost:3000/api/Ecommerce/Cart', {
            headers: { 'Content-type': 'application/json' },
            method: 'put',
            cache: "no-store",
            body: JSON.stringify({
                userId: usersData._id,
            })
        }).then(res => res.json())
            .then(res => {
                // res.message.productId.quantity = 1
                setloadingBtn(false)
                // console.log(res.message)
                if (res.status) setproductInformation(res.message)
                else alert(res.message)
            })
            .catch(err => {
                console.log(err)
                setloadingBtn(false)
                alert(err)
            })
    }


    const deleteCart = (_id: string) => {
        console.log(usersData._id, _id)
        setloadingBtn(true)
        fetch('http://localhost:3000/api/Ecommerce/Cart', {
            headers: { 'Content-type': 'application/json' },
            method: 'delete',
            cache: "no-store",
            body: JSON.stringify({
                _id,
                userId: usersData._id,
            })
        }).then(res => res.json())
            .then(res => {
                setloadingBtn(false)
                console.log(res.message)
                if (res.status) {
                    let newProductInformation = productInformation.filter((item) => item._id !== '66ec24d3ec97341589ead73d')
                    setproductInformation(newProductInformation)
                    console.log(newProductInformation)
                }
            })
            .catch(err => {
                setloadingBtn(false)
                alert(err)
            })
    }

    const placeOrder = () => {
        // console.log(productInformation)
        let productsData = productInformation.map(item => {
            if (item.productId.quantity === undefined) item.productId.quantity = 1
            let ProductData = {
                userId: item.userId,
                productId: item.productId._id,
                quantity: item.productId.quantity
            }
            return ProductData
        })
        console.log(productsData)
        let orderDate = new Date()
        let deliveryDate = new Date(new Date().setDate(new Date().getDate() + 3))
        console.log(orderDate, deliveryDate)
        setloadingBtn(true)
        fetch('http://localhost:3000/api/Ecommerce/Order', {
            headers: { 'Content-type': 'application/json' },
            method: 'post',
            cache: "no-store",
            body: JSON.stringify({
                productsData,
                userId: usersData._id,
                orderDate,
                deliveryDate,
                address
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
    // console.log(productInformation)
    const del = () => {
        let newProductInformation = productInformation.filter((item) => item._id !== '66f132cc7ed66bc24563417d')
        console.log(newProductInformation)
        setproductInformation(newProductInformation)
    }
    return (
        <div>
            <button onClick={del}>del</button>
            <div>
                <div className=" w-[fit-content] rounded-[0.3rem] px-[0.6rem] py-[0.5rem] bg-[orange] cursor-pointer m-[2rem]" >
                    <h4 className='text-white' onClick={() => setshowOrder(true)}>proceed to order</h4>
                </div>
            </div>
            <div>
                {
                    showOrder &&
                    <div>
                        <textarea className='w-[19rem] h-[9rem] border-[grey] border-[1px] ml-[2rem] rounded-md p-[0.5rem]' placeholder='address' value={address} onChange={(e) => setaddress(e.target.value)}></textarea>
                        <div className=" w-[fit-content] rounded-[0.3rem] px-[0.6rem] py-[0.5rem] bg-[orange] cursor-pointer m-[2rem]" >
                            <button className='text-white' onClick={placeOrder}>Place Order</button>
                        </div>
                    </div>
                }
            </div>
            <div className='mt-[4rem] w-[100%] m-[auto] max-[855px]:pb-[7rem] max-[855px]:h-[80vh] max-[855px]:overflow-auto'>
                {
                    productInformation.map(cid => {
                        return <div key={cid._id}>
                            <div style={{ boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.378)' }} className='flex item-start w-[45rem] mb-[1.3rem] mx-[4rem] bg-[#faebd788] p-[1rem]  max-[1125px]:w-[38rem] max-[1033px]:w-[36rem] max-[1033px]:mb-[2rem] max-[1033px]:ml-[2rem] max-[1033px]:mr-[1rem] max-[898px]:w-[35rem] max-[898px]:mx-[1rem] max-[898px]:mb-[1rem] max-[855px]:w-[85%] max-[855px]:m-[auto] max-[855px]:my-[2rem] max-[743px]:w-[90%] max-[535px]:w-[95%]'>
                                <div className='one'>
                                    <div className="flex item-start">
                                        <div ><img className='w-[8rem] h-[6rem]  max-[655px]:w-[7.3rem] max-[655px]:h-[5.3rem] max-[430px]:mr-[2rem] max-[381px]:w-[6rem] max-[381px]:h-[5rem] max-[341px]:w-[7rem] max-[381px]:h-[4.7rem]' src={cid.productId.productImage1} alt="" /></div>
                                        <h2 className='ml-[1rem] text-[1.35rem] font-bold max-[655px]:text-[1.18rem] max-[535px]:ml-[0.5rem] max-[436px]:text-[1.12rem] max-[381px]:text-[1rem]'>{cid.productId.productName}</h2>
                                    </div>
                                    <div onClick={() => deleteCart(cid._id)} className=" w-[fit-content] rounded-[0.3rem] px-[0.6rem] py-[0.5rem] bg-[red] cursor-pointer mt-[1rem] hover:bg-[#e41717]" >
                                        <h4 className='text-white'>delete</h4>
                                    </div>
                                </div>
                                <div className='ml-[auto] mr-[1rem]  max-[655px]:mr-[0.5rem] max-[358px]:mr-[0rem] '>
                                    <span className='flex mb-[2rem] ml-[2rem] productinfo text-[1.1rem] max-[381px]:text-[0.95rem]'><h3>&#8358;</h3> <h3>{cid.productId.productPrice.toLocaleString()}</h3></span>
                                    <div className="qtyContainer ">
                                        <input className='w-[2.4rem] border-[grey] border-[1px]' min={0} max={100} type="number" onChange={(e) => cid.productId.quantity = Number(e.target.value)} name="" id="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    })
                }

            </div>
        </div>
    )
}

export default page