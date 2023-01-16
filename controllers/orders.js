import Order from '../models/Order.js'

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find()
        if (orders.length !==0)
            res.status(200).json(orders)
        else
            res.status(204).send()
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const getOrder = async (req, res) => {
    try {
        const { id } = req.params
        const order = await Order.findById(id)
        if (order)
            res.status(200).json(order)
        else
            res.status(404).json({ error: 'resource not found' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const addOrder = async (req, res) => {
    try {
        const { menu, amount } = req.body
        const newOrder = await Order.create({
          menu,
          amount
        })
        const savedOrder = await newOrder.save()
        res.status(201).json({ id: savedOrder._id})
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const deleteOrder = async (req, res) => {
    try {
        await Order.deleteOne({_id: req.params.id })
        res.status(204).send()
    } catch (err) {
        console.log(err)
        res.status(404).json({ error: err.message })
    }
}

export const updateOrder = async (req, res) => {
    try {
        const filter = { _id: req.params.id }
        const { menu, amount } = req.body
        const update = {
            menu: menu,
            amount: amount
        }
      
        await Order.findOneAndUpdate(filter, update)
        res.status(204).send()
    } catch (err) {
      console.log(err)
      res.status(404).json({ error: err.message })
    }
}
