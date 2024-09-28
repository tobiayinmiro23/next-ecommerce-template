import { connectToDB } from "@/databaseConfig/ecommerceDB";
import { User } from "@/models/ecommerce";
import { response } from "@/utils/response";

import { NextRequest, NextResponse } from "next/server";
const POST = async (req: NextRequest) => {
    try {
        await connectToDB()
        const data = await req.json()
        const { userName, password } = data
        let userExists = await User.find({ userName })
        console.log(userExists)
        if (userExists.length === 0) return NextResponse.json(response(false, 'user does not exist'))
        if (userExists[0].password === password) return NextResponse.json(response(true, userExists[0]))
        else return NextResponse.json(response(false, 'incorrect username or password'))
    } catch (error) {
        console.log(error)
        return NextResponse.json(response(false, 'an error occured'))
    }
}

export { POST }
