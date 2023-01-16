import express from 'express'
import { getOrder, getOrders, addOrder, updateOrder, deleteOrder } from '../controllers/orders.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router({mergeParams: true})

router.get('/', verifyToken, getOrders)
router.get('/:id', verifyToken, getOrder)
router.post('/', verifyToken, addOrder)
router.put('/:id', verifyToken, updateOrder)
router.delete('/:id', verifyToken, deleteOrder)

export default router
