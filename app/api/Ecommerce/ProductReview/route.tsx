import { connectToDB } from "@/databaseConfig/ecommerceDB";
import { ProductReview, Product } from "@/models/ecommerce";
import { response } from "@/utils/response";

import { NextRequest, NextResponse } from "next/server";
const POST = async (req: NextRequest) => {
    try {
        await connectToDB()
        const data = await req.json()
        const { productId, review, date, userName } = data
        console.log(productId, review, date, userName)
        let Review = await ProductReview.create({ productId, review, date, userName })
        let proreview = await Product.findByIdAndUpdate(productId, { $push: { productReview: Review._id } })
        console.log('proreview', proreview)
        return NextResponse.json(response(true, Review))
    } catch (error) {
        console.log(error)
        return NextResponse.json(response(false, 'an error occured'))
    }
}

export { POST }
