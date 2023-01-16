import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Customer from '../models/Customer.js'

export const register = async (req, res) => {
    try { 
        const { firstName, lastName, email, password } = req.body
        const salt = await bcryptjs.genSalt()
        const encryptedPassword = await bcryptjs.hash(password, salt)
        const newCustomer = await Customer.create({
            firstName,
            lastName,
            email,
            password: encryptedPassword
        })
        const savedCustomer = await newCustomer.save()
        res.status(201).json(savedCustomer)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        
        const customer = await Customer.findOne({
          email: email
        })
        
        if (!customer) return res.status(400).json({msg: 'invalid email/password'})
        
        const isPasswordValid = await bcryptjs.compare(password, customer.password)
        
        if (isPasswordValid) {
            const token = jwt.sign({ id: customer._id }, process.env.JWT_SECRET)
            customer.password = '***'
            res.status(200).json({token, customer})
        } else {
            res.status(400).json({msg: 'invalid credentials'})
        }
    } catch (error) {
        res.status(500).json({ error: err.message })
    }
}
