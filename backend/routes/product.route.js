import express from "express";
import {
 createProduct, createProductReview,
 deleteProduct,
 getProductById,
 getProducts, getTopProducts,
 updateProduct
} from "../resources/product.controller.js";
import {admin, protect} from "../middlewares/auth.middleware.js";

const router = express.Router()
 router.route('/').get(getProducts).post(protect, admin, createProduct)
 router.route('/top').get(getTopProducts)
 router.route('/:id').get(getProductById).put(protect, admin, updateProduct).delete(protect, admin, deleteProduct)
 router.route('/:id/review').post(protect, createProductReview)
// router.get('/', getProducts)
export default router