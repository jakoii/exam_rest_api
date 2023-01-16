import Customer from '../models/Customer.js'
import bcryptjs from 'bcryptjs'

export const getCustomers = async (req, res) => {
    try {
        const customers = await Customer.find()
        if (customers.length !==0)
            res.status(200).json(customers)
        else
            res.status(204).send()
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const getCustomer = async (req, res) => {
    try {
        const { id } = req.params
        const customer = await Customer.findById(id)
        if (customer)
            res.status(200).json(customer)
        else
            res.status(404).json({ error: 'resource not found' })
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
}

export const deleteCustomer = async (req, res) => {
    try {
        await Customer.deleteOne({_id: req.params.id })
        res.status(204).send()
    } catch (err) {
        console.log(err)
        res.status(404).json({ error: err.message })
    }
}

export const updateCustomer = async (req, res) => {
    try {
        const filter = {_id: req.params.id }
        const { firstName, lastName, email, password } = req.body
        const salt = await bcryptjs.gensalt()
        const encryptedPassword = await bcryptjs.hash(password, salt)
        
        const update = {
            firstName,
            lastName,
            email,
            password: encryptedPassword
        }
      
        await Customer.findOneAndUpdate(filter. update)
        res.status(204).send()
    } catch (err) {
        console.log(err)
        res.status(404).json({ error: err.message })
    }
}
