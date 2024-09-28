import { Schema, model, models } from "mongoose";
const UserSchema = new Schema({
    userName: {
        type: String,
        unique: true
    },
    password: String,
    cart: [{ type: Schema.Types.ObjectId, ref: 'Cart' }],
    order: [{ type: Schema.Types.ObjectId, ref: 'Order' }]
})

const CartSchema = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: 'Product' },
    userId: String,
})
const OrderSchema = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: 'Product' },
    userId: String,
    quantity: String,
    orderDate: String,
    deliveryDate: String,
    address: String
})
const ProductReviewSchema = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: 'Product' },
    review: String,
    date: String,
    userName: String,
})
const ProductSchema = new Schema({
    productName: String,
    productPrice: Number,
    productInfo: String,
    productImage1: String,
    productImage2: String,
    processorType: String,
    processorName: String,
    brand: String,
    ram: String,
    rom: String,
    windowVersion: String,
    color: String,
    netWeight: String,
    inch: String,
    gamingGraphics: String,
    productReview: [{ type: Schema.Types.ObjectId, ref: 'ProductReview' }],

})


export const User = models?.Users || model('Users', UserSchema)
export const Cart = models?.Cart || model('Cart', CartSchema)
export const Order = models?.Order || model('Order', OrderSchema)
export const Product = models?.Product || model('Product', ProductSchema)
export const ProductReview = models?.ProductReview || model('ProductReview', ProductReviewSchema)
