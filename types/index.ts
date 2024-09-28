import { Dispatch, SetStateAction } from "react";

export interface input {
    todoText: string,
    settodoText: Dispatch<SetStateAction<string>>,
    addTodo: () => void
}

export interface Icard {
    productName: string,
    productPrice: number,
    productImage1: string,
}

export interface IallTodos {
    todo: string,
    __v: number
    _id: string,
}

export interface IeditTodo {
    todo: string,
    id: string,
    getTodo: () => void
}

export interface Ibutton {
    style: string
    handleButton: (id?: string) => void,
    text: string,
    id?: string
}
