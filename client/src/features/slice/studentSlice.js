import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  students: [],
  newstudents: [],
  loading: false,
  error: null,
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    getStart(state) {
      state.loading = true;
      state.error = null;
    },
    getNewStudents(state, action) {
      state.loading = false;
      state.newstudents = action.payload.newstudents || [];
      
    },
    getStudents(state, action) {
      state.loading = false;
     
      state.students = action.payload.student || [];
    },
    getFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  }
});

export const { getFailure, getStart, getStudents,getNewStudents } = studentSlice.actions;
export default studentSlice.reducer;
