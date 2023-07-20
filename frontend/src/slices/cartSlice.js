import {createSlice} from "@reduxjs/toolkit";
import {updateCart} from "../utils/cart.utils.js";

const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {cartItems: [],
shippingAddress: {}, paymentMethod: 'Paypal' }


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload

            //check if item already exists in the cart
            const itemExists = state.cartItems.find((x) => x._id === item._id)

            if(itemExists){
                //update the item if it exists in the cart
                state.cartItems = state.cartItems.map((x) => x._id === itemExists._id ? item : x)
            } else {
                //add the new item
                state.cartItems = [...state.cartItems, item]
            }

            return updateCart(state)
        },
        removeFromCart: (state, action) => {
            //returning all the cart items apart from the one to be deleted
            state.cartItems = state.cartItems.filter((x) => x._id !== action.payload)
            return updateCart(state)
        },
        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload
            return updateCart(state)
        },
        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload
            return updateCart(state)
        },
        clearCartItems: (state, actions) => {
            state.cartItems =[]
            return updateCart(state)
        }
    },
})

export const { addToCart , removeFromCart,
saveShippingAddress , savePaymentMethod,
clearCartItems} = cartSlice.actions

export default cartSlice.reducer