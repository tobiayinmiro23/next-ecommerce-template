
import mongoose from "mongoose";
let isConnected = false
let uri = 'mongodb://127.0.0.1:27017/'

export const connectToDB = async () => {
    console.log(isConnected)
    mongoose.set('strictQuery', true)
    if (isConnected) {
        console.log('connection currently running //userRegistration')
        return
    }
    try {
        await mongoose.connect(uri, {
            dbName: 'userRegistration',
        })
        isConnected = true
        console.log('database connected //userRegistration')
    } catch (error) {
        console.log(error)
    }
}