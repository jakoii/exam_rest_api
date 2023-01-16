import express from 'express'
import { getCustomer, getCustomers, updateCustomer, deleteCustomer} from '../controllers/customers.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router();

router.get('/', verifyToken, getCustomers)
router.get('/:id', verifyToken, getCustomer)
router.put('/:id', verifyToken, updateCustomer)
router.delete('/:id', verifyToken, deleteCustomer)

export default router