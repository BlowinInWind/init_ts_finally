import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const counterSlice = createSlice({
    name: 'counter',
    initialState: 0,
    reducers: {
        increment: state => state + 1,
        decrement: state => state - 1,
        addCount: (state, action: PayloadAction<number>) => {
            return state + action.payload;
        }
    }
});

export const { increment, decrement, addCount } = counterSlice.actions;

export default counterSlice.reducer;
