import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema(
    {
        menu: { type: String, required: true },
        amount: { type: Number, required: true}
    },
    { timestamps: true }
)

const Order = mongoose.model('Order', OrderSchema)
export default Order
