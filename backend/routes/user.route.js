import express from "express";
import {
    deleteUser,
    getUserById,
    getUserProfile,
    getUsers,
    loginUser,
    logoutUser,
    registerUser, updateUser, updateUserProfile
} from "../resources/user.controller.js";
import { admin, protect } from "../middlewares/auth.middleware.js";

const router = express.Router()

router.route('/').post(registerUser).get(protect, admin, getUsers)

router.post('/login', loginUser)
router.post('/logout', logoutUser)

router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)

router.route('/:id')
    .get(protect, admin, getUserById)
    .delete(protect, admin, deleteUser)
    .put(protect, admin,updateUser)
export default router