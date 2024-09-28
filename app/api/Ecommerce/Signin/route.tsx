import { connectToDB } from "@/databaseConfig/ecommerceDB";
import { User } from "@/models/ecommerce";
import { response } from "@/utils/response";

import { NextRequest, NextResponse } from "next/server";
const POST = async (req: NextRequest) => {
    try {
        await connectToDB()
        const data = await req.json()
        const { userName, password } = data
        console.log(userName, password)
        let userExists = await User.find({ userName })
        console.log(userExists)
        if (userExists.length === 0) {
            let newUser = await User.create({ userName, password })
            console.log(newUser)
            return NextResponse.json(response(true, 'user successfully added'))
        } else return NextResponse.json(response(false, 'user already exist'))
    } catch (error) {
        console.log(error)
        return NextResponse.json(response(false, 'an error occured'))
    }
}


export { POST, }
