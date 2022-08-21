import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    input: ''
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        updateEmployees: (state, action) => {
            state.input = action.payload;
        }
    }
});

const {reducer, actions} = searchSlice;

export default reducer;

export const {
    updateEmployees
} = actions;