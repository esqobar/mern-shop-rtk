//helper function
export const addDecimals = (num) => {
    return(Math.round(num * 100) / 100).toFixed(2)
}

export const updateCart = (state) => {
    //calculate the items price
    state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));
    //calculate the shipping price(if order is over $100 then free shipping, else $10 shipping)
    state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);
    //calculate the tax price(its 15% tax)
    state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));
    //calculate the total price
    state.totalPrice = (Number(state.itemsPrice)
        + Number(state.shippingPrice) + Number(state.taxPrice)).toFixed(2);

    localStorage.setItem('cart', JSON.stringify(state))
}