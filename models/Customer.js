import mongoose from 'mongoose'

const CustomerSchema = new mongoose.Schema(
    {
         firstName: { type: String, required: true },
         lastName: { type: String, required: true},
         email: { type: String, required: true, unique: true},
         password: { type: String, required: true}
    },
    { timestamps: true }
)

const Customer = mongoose.model('Customer', CustomerSchema)
export default Customer
