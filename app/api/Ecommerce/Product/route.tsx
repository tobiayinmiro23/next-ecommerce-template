import { connectToDB } from "@/databaseConfig/ecommerceDB";
import { User, Product } from "@/models/ecommerce";
import { response } from "@/utils/response";

import { NextRequest, NextResponse } from "next/server";
const POST = async (req: NextRequest) => {
    try {
        await connectToDB()
        const data = await req.json()
        const { _id } = data
        let Productt = await Product.findById(_id).populate('productReview').exec()
        console.log(Productt)
        return NextResponse.json(response(true, Productt))
    } catch (error) {
        console.log(error)
        return NextResponse.json(response(false, 'an error occured'))
    }

}
const GET = async () => {
    try {
        await connectToDB()
        const allProduct = (await Product.find({}))
        return NextResponse.json(response(true, allProduct))
    } catch (error) {
        console.log(error)
        return NextResponse.json(response(false, error || 'an error occured'))
    }
}

export { POST, GET }

// const POST = async (req: NextRequest) => {
//     try {
//         await connectToDB()
//         const data = await req.json()
//         let Productt = await Product.insertMany(data)
//         return NextResponse.json(response(true, Productt))
//     } catch (error) {
//         console.log(error)
//         return NextResponse.json(response(false, 'an error occured'))
//     }
// }
