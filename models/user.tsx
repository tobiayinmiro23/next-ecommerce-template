import { Schema, model, models } from "mongoose";
const UserSchema = new Schema({
    userName: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    // schedule: [{ type: Schema.Types.ObjectId, ref: 'Todos' }]
    schedule: [{ type: String, ref: 'Todos' }]

})

const TodoSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'Users' },
    todo: {
        type: String,
    },

})

export const User = models?.Users || model('Users', UserSchema)
export const Todo = models?.Todos || model('Todos', TodoSchema)
