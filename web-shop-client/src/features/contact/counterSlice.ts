import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
    data: number;
    title: string;
}

const initialState: CounterState = {
    data: 42,
    title: 'YARC (yet another redux counter with redux toolkit)'
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state, action) => {
            // it doesnot mutate the state but use Immer libary inside reducers
            state.data += action.payload
        },
        decrement: (state, action) => {
            // it doesnot mutate the state but use Immer libary inside reducers
            state.data -= action.payload
        }
    }
})

export const {increment, decrement} = counterSlice.actions;