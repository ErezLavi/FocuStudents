import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { queryUserInFirestore } from "../components/auth/AuthUtils";
import { updateDoc } from "firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Goal from "../models/Goal";

const initialGoal: Goal = {
  isGoal: false,
  numOfIntervals: 1,
  numOfCompletedIntervals: 0,
  isCompleted: false,
};

const initialGoalState = { entity: initialGoal };

export const updateGoalInFirestore = async (goal: Goal) => {
  try {
    const userSnapshot = await queryUserInFirestore();
    if (!userSnapshot) return;
    const docRef = userSnapshot.docs[0].ref;
    await updateDoc(docRef, {
      "goal.entity": goal,
    });
  } catch (error) {
    console.error("Error updating goal in Firestore: ", error);
  }
};

export const updateGoal = createAsyncThunk(
  "goal/updateGoal",
  async (goal: Goal, { dispatch }) => {
    dispatch(goalActions.updateGoal(goal));
    await updateGoalInFirestore(goal);
  }
);

const goalSlice = createSlice({
  name: "goal",
  initialState: initialGoalState,
  reducers: {
    updateGoal: (state, action: PayloadAction<Goal>) => {
      return {
        ...state,
        entity: {
          ...action.payload,
        },
      };
    },
    fetchGoal: (state, action: PayloadAction<Goal>) => {
      return {
        ...state,
        entity: {
          ...action.payload,
        },
      };
    },
  },
});

export { goalSlice };
export const goalActions = goalSlice.actions;
export default goalSlice.reducer;
