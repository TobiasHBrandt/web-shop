import { createSlice } from "@reduxjs/toolkit";
import { Basket } from "../../app/models/basket";

interface BasketState {
    basket: Basket | null
}

const initialState: BasketState = {
    basket: null
}

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        setBasket: (state, action) => {
            state.basket = action.payload
        },
        removeItem: (state, action) => {
            const {productId, quantity} = action.payload;
            // try to find itemIndex
            const itemIndex = state.basket?.items.findIndex(i => i.productId === productId);
            if (itemIndex === -1 || itemIndex === undefined)
            {
                return;
            }
            // find witch element in the array we are interested in
            state.basket!.items[itemIndex].quantity -= quantity;
            if (state.basket?.items[itemIndex].quantity === 0) 
            {
                state.basket.items.splice(itemIndex, 1)
            }
        }
    }
})

export const {setBasket, removeItem} = basketSlice.actions;