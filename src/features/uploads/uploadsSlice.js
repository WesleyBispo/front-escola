import { createSlice } from '@reduxjs/toolkit';
export const filesSlice = createSlice({
    name: 'files',
    initialState: {
        value: [],
    },
    reducers: {
        addFile: (state, { payload }) => {
            state.value = [...state.value, payload];
            console.log(state.value);
        },
    },
});

export const { addFile } = filesSlice.actions;
export default filesSlice.reducer;
