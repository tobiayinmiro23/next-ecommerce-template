import { connectToDB } from "@/databaseConfig/database2";
import { User, Todo } from "@/models/user";
import { response } from "@/utils/response";

import { NextRequest, NextResponse } from "next/server";
const POST = async (req: NextRequest) => {
    // try {
    //     // User.db.dropCollection('todos')
    //     await connectToDB()
    //     const data = await req.json()
    //     const { userName, password } = data
    //     console.log(userName, password)
    //     let userExists = await User.find({ userName })
    //     console.log(userExists)
    //     if (userExists.length === 0) {
    //         let newUser = await User.create({ userName, password })
    //         console.log(newUser)
    //         return NextResponse.json(response(true, 'user successfully added'))
    //     } else return NextResponse.json(response(false, 'user already exist'))
    // } catch (error) {
    //     console.log(error)
    // }
    // User.db.dropCollection('todos')
    await connectToDB()
    const data = await req.json()
    const { userName, password, todo } = data
    console.log(userName, password, todo)
    try {
        let newUser = await User.create({ userName, password })
        let newTodo = await Todo.create({ author: newUser._id, todo })
        // newUser.schedule.push('first push')
        // console.log(newTodo)
        console.log(newUser)
        return NextResponse.json({
            status: true,
            message: 'successfully added to the database',
            data: newUser
        })
    } catch (err) {
        return NextResponse.json(err || 'an error occured')
    }
}
const GET = async () => {
    await connectToDB()
    try {
        // const Users = await User.
        //     findOne({ todo: 'test1' }).
        //     populate('schedule').
        //     exec()
        const Todos = await Todo.
            find({}).
            populate('author').
            exec()
        // const Todos = await Todo.find({})
        // let status = Todo.populated('author')
        // console.log(status, 'status')
        return NextResponse.json({
            status: true,
            message: 'successfully added to the database',
            data: Todos
        })
    } catch (err) {
        return NextResponse.json(err || 'an error occured')
    }
}

export { POST, GET }
