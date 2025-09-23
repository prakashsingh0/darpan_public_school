import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  students: [],
  newstudents: [],
  rejectedStudent: [],
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
    getRejectedStudent(state, action) {
      state.loading = false;
      state.rejectedStudent = action.payload.rejectedStudent || [];
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

export const { getFailure, getStart, getStudents, getNewStudents,getRejectedStudent } = studentSlice.actions;
export default studentSlice.reducer;
