import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Course from "../models/Course";

const initialCourses: Course[] = [];
const intialCoursesState = { courses: initialCourses };

const coursesSlice = createSlice({
  name: "course",
  initialState: intialCoursesState,
  reducers: {
    addCourse(state, action: PayloadAction<Course>) {
      const newCourse = action.payload;
      state.courses = [
        ...state.courses,
        {
          id: newCourse.id,
          name: newCourse.name,
          color: newCourse.color,
        },
      ];
    },
    removeCourseById(state, action: PayloadAction<string>) {
      state.courses = state.courses.filter(
        (course) => course.id !== action.payload
      );
    },

    editCourse(state, action: PayloadAction<any>) {
      const { id, name } = action.payload;
      state.courses = state.courses.map((course) =>
        course.id === id ? { ...course, name } : course
      );
    },
  },
});

export { coursesSlice };

export const coursesActions = coursesSlice.actions;
export default coursesSlice.reducer;
