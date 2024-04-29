import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { queryUserInFirestore } from "../components/auth/AuthUtils";
import { updateDoc, arrayRemove, arrayUnion } from "firebase/firestore";
import Task from "../models/Task";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialTasks: Task[] = [];
const initialTasksState = { tasks: initialTasks };

//firestore functions
export const addTaskToUserInFirestore = async (task: Task) => {
  try {
    const userSnapshot = await queryUserInFirestore();
    if (!userSnapshot) return;
    const docRef = userSnapshot.docs[0].ref;
    // Add task to user in Firestore
    await updateDoc(docRef, {
      tasks: arrayUnion(task),
    });
    console.log(task.name, ": added to Firestore");
  } catch (error) {
    console.error("Error adding task to Firestore: ", error);
  }
};

export const removeTaskFromUserInFirestore = async (task: Task) => {
  try {
    const userSnapshot = await queryUserInFirestore();
    if (!userSnapshot) return; // No user logged in or found
    const docRef = userSnapshot.docs[0].ref;
    await updateDoc(docRef, {
      tasks: arrayRemove(task),
    });
    console.log(task.name, "removed from Firestore");
  } catch (error) {
    console.error("Error removing task from Firestore: ", error);
  }
};

export const removeTasksByCourseIdFromFirestore = async (courseId: string) => {
  try {
    const userSnapshot = await queryUserInFirestore();
    if (!userSnapshot) return;
    const userDoc = userSnapshot.docs[0];
    const userData = userDoc.data();
    const tasks = userData.tasks;
    const updatedTasks = tasks.filter(
      (task: Task) => task.courseId !== courseId
    );
    await updateDoc(userDoc.ref, { tasks: updatedTasks });
  } catch (error) {
    console.error("Error removing tasks from Firestore: ", error);
  }
};

export const editTaskInFirestore = async (task: Task) => {
  try {
    // Query for the user in Firestore
    const userSnapshot = await queryUserInFirestore();
    if (!userSnapshot) return;
    const userDoc = userSnapshot.docs[0];
    const userData = userDoc.data();
    const tasks = userData.tasks;
    // Find task in user's tasks array
    const taskIndex = tasks.findIndex((c: Task) => c.id === task.id);
    if (taskIndex === -1) {
      console.log("task not found in user's tasks array");
      return;
    }
    // Update task in user's tasks array
    const updateTasks = [...tasks];
    updateTasks[taskIndex] = {
      ...updateTasks[taskIndex],
      name: task.name,
      description: task.description,
      date: task.date,
      isCompleted: task.isCompleted,
    };
    await updateDoc(userDoc.ref, { tasks: updateTasks });
    console.log(task.name, ": edited in Firestore");
  } catch (error) {
    console.error("Error editing task in Firestore: ", error);
  }
};

const editTasksInFirestore = async (tasks: Task[]) => {
  try {
    const userSnapshot = await queryUserInFirestore();
    if (!userSnapshot) return;
    const userDoc = userSnapshot.docs[0];
    await updateDoc(userDoc.ref, { tasks: tasks });
  } catch (error) {
    console.error("Error editing tasks in Firestore: ", error);
  }
};

//Async Thunks
export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (task: Task, { dispatch }) => {
    dispatch(tasksActions.addTask(task));
    await addTaskToUserInFirestore(task);
    return task;
  }
);

export const removeTask = createAsyncThunk(
  "tasks/removeTask",
  async (task: Task, { dispatch }) => {
    dispatch(tasksActions.removeTaskById(task.id));
    await removeTaskFromUserInFirestore(task);
    return task;
  }
);

export const removeTasksByCourseId = createAsyncThunk(
  "tasks/removeTasksByCourseId",
  async (courseId: string, { dispatch }) => {
    dispatch(tasksActions.removeTasksByCourseId(courseId));
    await removeTasksByCourseIdFromFirestore(courseId);
    return courseId;
  }
);

export const editTask = createAsyncThunk(
  "tasks/editTask",
  async (task: Task, { dispatch }) => {
    dispatch(tasksActions.editTask(task));
    await editTaskInFirestore(task);
    return task;
  }
);

export const editTasks = createAsyncThunk(
  "tasks/editTasks",
  async (tasks: Task[], { dispatch }) => {
    dispatch(tasksActions.editTasks(tasks));
    await editTasksInFirestore(tasks);
    return tasks;
  }
);

const tasksSlice = createSlice({
  name: "task",
  initialState: initialTasksState,
  reducers: {
    addTask(state, action: PayloadAction<Task>) {
      const newTask = action.payload;
      state.tasks.push(newTask);
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
    fetchTasks(state, action: PayloadAction<Task[]>) {
      state.tasks = action.payload;
    },
  },
});

export { tasksSlice };

export const tasksActions = tasksSlice.actions;
export default tasksSlice.reducer;
