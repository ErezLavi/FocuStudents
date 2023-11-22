import { configureStore } from "@reduxjs/toolkit";
import { timerSlice } from "./timer-slice";
import { coursesSlice, coursesActions } from "./courses-slice";
import { tasksSlice } from "./tasks-slice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfigTasks = {
  key: "tasks",
  storage,
};

const persistConfigCourses = {
  key: "courses",
  storage,
};

const persistConfigTimer = {
  key: "timer",
  storage,
};

const persistedTasks = persistReducer(persistConfigTasks, tasksSlice.reducer);
const persistedCourses = persistReducer(
  persistConfigCourses,
  coursesSlice.reducer
);
const persistedTimer = persistReducer(persistConfigTimer, timerSlice.reducer);

const store = configureStore({
  reducer: {
    tasks: persistedTasks,
    courses: persistedCourses,
    timer: persistedTimer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "course/addCourse", "task/addTask"],
      },
    }),
});

const persistor = persistStore(store);
export { persistor };
export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
