import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Goal from "../models/Goal";

const initialGoal: Goal = {
  isGoal: false,
  numOfIntervals: 1,
  numOfCompletedIntervals: 0,
  isCompleted: false,
};

const initialGoalState = { entity: initialGoal };

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
    setGoalCompleted: (state, action: PayloadAction<Goal>) => {
      const { isCompleted, isGoal, numOfIntervals, numOfCompletedIntervals } =
        action.payload;
      if (isGoal && numOfCompletedIntervals === numOfIntervals) {
        return {
          ...state,
          entity: {
            ...state.entity,
            isCompleted: isCompleted,
          },
        };
      } else {
        return state;
      }
    },
  },
});

export { goalSlice };
export const goalActions = goalSlice.actions;
export default goalSlice.reducer;
