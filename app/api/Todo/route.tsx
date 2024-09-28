import { connectToDB } from "@/utils/database";
import { Todo } from "@/models/todo";
import { response } from "@/utils/response";
import { NextRequest, NextResponse } from "next/server";
const GET = async () => {
    try {
        await connectToDB()
        const allTodo = (await Todo.find({})).reverse()
        return NextResponse.json(response(true, allTodo))
    } catch (error) {
        console.log(error)
        return NextResponse.json(response(false, error || 'an error occured'))
    }
}

const POST = async (req: NextRequest) => {
    try {
        await connectToDB()
        const data = await req.json()
        const { todo } = data
        const addTodo = await Todo.create({ todo })
        if (addTodo._id) return NextResponse.json(response(true, 'todo successfully added'))
        else return NextResponse.json(response(false, addTodo))
    } catch (error) {
        console.log(error)
        return NextResponse.json(response(false, error || 'an error occured'))
    }
}

const PUT = async (req: NextRequest) => {
    try {
        await connectToDB()
        const data = await req.json()
        const { id, todo } = data
        await Todo.findByIdAndUpdate(id, { todo })
        return NextResponse.json(response(true, 'todo successfully updated'))
    } catch (error) {
        console.log(error)
        return NextResponse.json(response(false, error || 'an error occured'))
    }
}

const DELETE = async (req: NextRequest) => {
    try {
        await connectToDB()
        const data = await req.json()
        const { todo } = data
        console.log(todo)
        const deleteTodo = await Todo.findByIdAndDelete(todo)
        if (deleteTodo._id) return NextResponse.json(response(true, 'todo successfully deleted'))
        else return NextResponse.json(response(false, deleteTodo))
    } catch (error) {
        console.log(error)
        return NextResponse.json(response(false, error || 'an error occured'))
    }
}
export { GET, POST, PUT, DELETE }