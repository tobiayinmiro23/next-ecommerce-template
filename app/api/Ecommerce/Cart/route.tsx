import { connectToDB } from "@/databaseConfig/ecommerceDB";
import { Cart, User } from "@/models/ecommerce";
import { response } from "@/utils/response";

import { NextRequest, NextResponse } from "next/server";
const POST = async (req: NextRequest) => {
    try {
        await connectToDB()
        const data = await req.json()
        const { productId, userId } = data
        console.log(productId, userId)
        const allCart = await Cart.find({ userId }).where({ productId })
        if (allCart.length !== 0) return NextResponse.json(response(true, 'product successfully added to cart'))
        let newCart = await Cart.create({ userId, productId }).then(async (res) => {
            let updatedUser = await User.findByIdAndUpdate(userId, { $addToSet: { cart: res._id } })
        })
        return NextResponse.json(response(true, 'product successfully added to cart'))
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
        const allCart = await Cart.find({ userId }).populate('productId').exec()
        return NextResponse.json(response(true, allCart))
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
        console.log(_id, userId, 'uid')
        const deletedCart = await Cart.findByIdAndDelete(_id).where({ userId })
        let updatedUser = await User.findByIdAndUpdate(userId, { $pull: { cart: _id } })
        console.log(deletedCart)
        if (deletedCart._id) return NextResponse.json(response(true, 'product successfully removed from cart'))
        else return NextResponse.json(response(false, 'unable to remove product from cart'))
    } catch (error) {
        console.log(error)
        return NextResponse.json(response(false, error || 'an error occured'))
    }
}
export { POST, PUT, DELETE }
