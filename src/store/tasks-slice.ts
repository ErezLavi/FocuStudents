import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Task from "../models/Task";

const initialTasks: Task[] = [];
const initialTasksState = { tasks: initialTasks };

const tasksSlice = createSlice({
  name: "task",
  initialState: initialTasksState,
  reducers: {
    addTask(state, action: PayloadAction<Task>) {
      const newTask = action.payload;
      state.tasks = [...state.tasks, {
        courseId: newTask.courseId,
        id: newTask.id,
        name: newTask.name,
        description: newTask.description,
        isCompleted: newTask.isCompleted,
        isChosen: newTask.isChosen,
      }];
    },

    removeTaskById(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },

    removeTasksByCourseId(state, action: PayloadAction<string>) {
      const courseIdToRemove = action.payload;

      state.tasks = state.tasks.filter(
        (task) => task.courseId !== courseIdToRemove
      );
    },

    editTask(state, action: PayloadAction<any>) {
      const { id, name, isCompleted, isChosen, description } = action.payload;
      state.tasks = state.tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              isCompleted,
              isChosen,
              name,
              description
            }
          : task
      );
    },
    editTasks(state, action: PayloadAction<Task[]>) {
      state.tasks = action.payload;
    },
  },
});


export { tasksSlice };

export const tasksActions = tasksSlice.actions;
export default tasksSlice.reducer;
