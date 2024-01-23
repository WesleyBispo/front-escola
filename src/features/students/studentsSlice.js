import { createSlice } from '@reduxjs/toolkit';

export const studentSlice = createSlice({
    name: 'students',
    initialState: {
        value: [],
        status: 'Pending',
    },
    reducers: {
        getStudentsFetch: (state) => {
            state.status = 'Pending';
        },
        getStudentSuccess: (state, action) => {
            state.value = action.payload;
            state.status = 'Resolved';
        },
        getStudentsFailure: (state) => {
            state.status = 'Rejected';
        },
    },
});

export const { getStudentsFetch, getStudentSuccess, getStudentFailure } =
    studentSlice.actions;
export default studentSlice.reducer;
