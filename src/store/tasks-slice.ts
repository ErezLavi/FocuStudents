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
      state.tasks = [
        ...state.tasks,
        {
          courseId: newTask.courseId,
          id: newTask.id,
          name: newTask.name,
          description: newTask.description,
          isCompleted: newTask.isCompleted,
          isChosen: newTask.isChosen,
          date: newTask.date,
        },
      ];
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
      const { id, name, description, isCompleted, date } = action.payload;
      state.tasks = state.tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              name,
              description,
              isCompleted,
              date,
            }
          : task
      );
    },
    editTasks(state, action: PayloadAction<Task[]>) {
      state.tasks = action.payload;
    },

    setInitialChosen(state) {
      if (
        state.tasks.length > 0 &&
        !state.tasks.some((task) => task.isChosen)
      ) {
        for (let i = 0; i < state.tasks.length; i++) {
          if (!state.tasks[i].isChosen && !state.tasks[i].isCompleted) {
            const updatedTasks = [...state.tasks];
            updatedTasks[i] = { ...updatedTasks[i], isChosen: true };

            return {
              ...state,
              tasks: updatedTasks,
            };
          }
        }
      }
      return state;
    },
    fetchTasks(state, action: PayloadAction<Task[]>) {
      state.tasks = action.payload;
    }
  },
});

export { tasksSlice };

export const tasksActions = tasksSlice.actions;
export default tasksSlice.reducer;
