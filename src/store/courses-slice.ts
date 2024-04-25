import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { queryUserInFirestore } from "../components/auth/AuthUtils";
import { updateDoc, arrayRemove, arrayUnion } from "firebase/firestore";
import Course from "../models/Course";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialCourses: Course[] = [];
const intialCoursesState = { courses: initialCourses };

// Firestore Functions
export const addCourseToUserInFirestore = async (course: Course) => {
  try {
    const userSnapshot = await queryUserInFirestore();
    if (!userSnapshot) return;
    const docRef = userSnapshot.docs[0].ref;
    // Add course to user in Firestore
    await updateDoc(docRef, {
      courses: arrayUnion(course),
    });
    console.log(course.name, ": added to Firestore");
  } catch (error) {
    console.error("Error adding course to Firestore: ", error);
  }
};

export const removeCourseFromUserInFirestore = async (course: Course) => {
  try {
    const userSnapshot = await queryUserInFirestore();
    if (!userSnapshot) return;
    const docRef = userSnapshot.docs[0].ref;
    // Remove course from user in Firestore
    await updateDoc(docRef, {
      courses: arrayRemove(course),
    });
    console.log(course.name, "removed from Firestore");
  } catch (error) {
    console.error("Error removing course from Firestore: ", error);
  }
};

export const editCourseInFirestore = async (course: Course) => {
  try {
    // Query for the user in Firestore
    const userSnapshot = await queryUserInFirestore();
    if (!userSnapshot) return;

    const userDoc = userSnapshot.docs[0];
    const userData = userDoc.data();
    // Find course in user's courses array
    const courses = userData.courses;
    const courseIndex = courses.findIndex((c: Course) => c.id === course.id);
    if (courseIndex === -1) {
      console.log("Course not found in user's courses array");
      return;
    }
    // Update course in user's courses array
    const updatedCourses = [...courses];
    updatedCourses[courseIndex] = {
      ...updatedCourses[courseIndex],
      name: course.name,
    };
    await updateDoc(userDoc.ref, { courses: updatedCourses });
    console.log(course.name, ": edited in Firestore");
  } catch (error) {
    console.error("Error editing course in Firestore: ", error);
  }
};

export const updateCourseTimeCounterInFirestore = async (course: Course) => {
  try {
    // Query for the user in Firestore
    const userSnapshot = await queryUserInFirestore();
    if (!userSnapshot) return;
    const userDoc = userSnapshot.docs[0];
    const userData = userDoc.data();
    // Find course in user's courses array
    const courses = userData.courses;
    const courseIndex = courses.findIndex((c: Course) => c.id === course.id);
    // Update course time counter in Firestore
    const updatedCourses = [...courses];
    updatedCourses[courseIndex] = {
      ...updatedCourses[courseIndex],
      timeCounter: course.timeCounter,
    };
    await updateDoc(userDoc.ref, { courses: updatedCourses });
  } catch (error) {
    console.error("Error updating course time counter in Firestore: ", error);
  }
};

export const resetTimeCounterInFirestore = async () => {
  try {
    // Query for the user in Firestore
    const userSnapshot = await queryUserInFirestore();
    if (!userSnapshot) return;
    const userDoc = userSnapshot.docs[0];
    const userData = userDoc.data();
    // Reset time counter for all courses in Firestore
    const updatedCourses = userData.courses.map((course: Course) => ({
      ...course,
      timeCounter: 0,
    }));
    await updateDoc(userDoc.ref, { courses: updatedCourses });
  } catch (error) {
    console.error("Error resetting time counter in Firestore: ", error);
  }
}

// Async Thunks
export const addCourse = createAsyncThunk(
  "courses/addCourse",
  async (course: Course, { dispatch }) => {
    dispatch(coursesActions.addCourse(course));
    await addCourseToUserInFirestore(course);
    return course;
  }
);

export const removeCourse = createAsyncThunk(
  "courses/removeCourse",
  async (course: Course, { dispatch }) => {
    dispatch(coursesActions.removeCourseById(course.id));
    await removeCourseFromUserInFirestore(course);
    return course;
  }
);

export const editCourse = createAsyncThunk(
  "courses/editCourse",
  async (course: Course, { dispatch }) => {
    dispatch(coursesActions.editCourse(course));
    await editCourseInFirestore(course);
    return course;
  }
);

export const updateCourseTimeCounter = createAsyncThunk(
  "courses/updateCourseTimeCounter",
  async (course: Course) => {
    await updateCourseTimeCounterInFirestore(course);
    return course;
  }
);

export const resetTimeCounter = createAsyncThunk(
  "courses/resetTimeCounter",
  async (_, { dispatch }) => {
    dispatch(coursesActions.resetTimeCounter());
    await resetTimeCounterInFirestore();
  }
);

// Slice and Reducers
const coursesSlice = createSlice({
  name: "course",
  initialState: intialCoursesState,
  reducers: {
    addCourse(state, action: PayloadAction<Course>) {
      const newCourse = action.payload;
      state.courses.push(newCourse);
    },

    removeCourseById(state, action: PayloadAction<string>) {
      state.courses = state.courses.filter(
        (course) => course.id !== action.payload
      );
    },

    editCourse(state, action: PayloadAction<{ id: string; name: string }>) {
      const { id, name } = action.payload;
      state.courses = state.courses.map((course) =>
        course.id === id ? { ...course, name } : course
      );
    },

    incrementTimeCounter(state, action: PayloadAction<string>) {
      state.courses = state.courses.map((course) =>
        course.id === action.payload
          ? { ...course, timeCounter: (course.timeCounter || 0) + 1 }
          : course
      );
    },
    resetTimeCounter(state) {
      state.courses = state.courses.map((course) => ({
        ...course,
        timeCounter: 0,
      }));
    },
    fetchCourses(state, action: PayloadAction<Course[]>) {
      state.courses = action.payload;
    },
  },
});

export { coursesSlice };

export const coursesActions = coursesSlice.actions;
export default coursesSlice.reducer;
