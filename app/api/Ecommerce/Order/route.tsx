import { connectToDB } from "@/databaseConfig/ecommerceDB";
import { Order, User } from "@/models/ecommerce";
import { response } from "@/utils/response";
interface IproductsData {
    userId: string,
    productId: string,
    quantity: number
}
import { NextRequest, NextResponse } from "next/server";
const POST = async (req: NextRequest) => {
    try {
        await connectToDB()
        const data = await req.json()
        const { productsData, userId, orderDate, deliveryDate, address } = data
        // console.log(productId, userId)
        // console.log(data)
        productsData.map(async (item: IproductsData) => {
            let newOder = await Order.create({ userId, productId: item.productId, quantity: item.quantity, orderDate, deliveryDate, address }).then(async (res) => {
                let updatedUser = await User.findByIdAndUpdate(userId, { $addToSet: { order: res._id } })
                console.log(updatedUser)
            })
            console.log(newOder)

            // const allOder = await Order.find({ userId }).where({ productId })

        })
        // if (allOder.length !== 0) return NextResponse.json(response(true, 'order successfully placed'))
        // let newOder = await Order.create({ userId, productId, quantity, orderDate, deliveryDate, address }).then(async (res) => {
        //     let updatedUser = await User.findByIdAndUpdate(userId, { $addToSet: { order: res._id } })
        // })
        return NextResponse.json(response(true, 'order successfully placed'))
    } catch (error) {
        console.log(error)
        return NextResponse.json(response(false, 'an error occured'))
    }
}

const PUT = async (req: NextRequest) => {
    try {
        await connectToDB()
        const data = await req.json()
        const { userId } = data
        const allOrder = await Order.find({ userId }).populate('productId').exec()
        return NextResponse.json(response(true, allOrder))
    } catch (error) {
        console.log(error)
        return NextResponse.json(response(false, error || 'an error occured'))
    }
}
const DELETE = async (req: NextRequest) => {
    try {
        await connectToDB()
        const data = await req.json()
        const { _id, userId } = data
        console.log(_id)
        const deletedCart = await Order.findByIdAndDelete(_id).where({ userId })
        let updatedUser = await User.findByIdAndUpdate(userId, { $pull: { order: _id } })
        console.log(updatedUser)
        if (deletedCart._id) return NextResponse.json(response(true, 'order deleted successfully'))
        else return NextResponse.json(response(false, 'unable to delete order'))
    } catch (error) {
        console.log(error)
        return NextResponse.json(response(false, error || 'an error occured'))
    }
}
export { POST, PUT, DELETE }
