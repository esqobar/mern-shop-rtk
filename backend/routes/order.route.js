import express from "express";
import {
    addOrderItems,
    getMyOrders,
    getOrderById,
    getOrders,
    updateOrderToDeliver,
    updateOrderToPaid
} from "../resources/order.controller.js";
import {admin, protect} from "../middlewares/auth.middleware.js";

const router = express.Router()
router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
router.route('/mine').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, admin, updateOrderToDeliver)
// router.get('/', getProducts)
export default router