
import mongoose from "mongoose";
let isConnected = false
const uri = 'mongodb://127.0.0.1:27017/'

export const connectToDB = async () => {
    console.log(isConnected)
    mongoose.set('strictQuery', true)
    if (isConnected) {
        console.log('connection currently running @ecommerce')
        return
    }
    try {
        await mongoose.connect(uri, {
            dbName: 'ecommerce',
        })
        isConnected = true
        console.log('ecommerce database connected')
    } catch (error) {
        console.log(error)
    }
}