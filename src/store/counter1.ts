import { createSlice, PayloadAction, CaseReducer } from '@reduxjs/toolkit';

type State = number;

const increment: CaseReducer<State, PayloadAction<number>> = (state, action) =>
    state + action.payload;

const counterSlice = createSlice({
    name: 'counter1',
    initialState: 0,
    reducers: {
        increment
    }
});

export default counterSlice.reducer;
