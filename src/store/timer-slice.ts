import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Timer from "../models/Timer";

const initialTimer: Timer = {
  isPaused: true,
  timerMode: "focus",
  secondsLeft: 30 * 60,
  focusTime: 30,
  breakTime: 5,
  totalTimeCounter: 0,
};

const initialTimerState = { entity: initialTimer };

const timerSlice = createSlice({
  name: "timer",
  initialState: initialTimerState,
  reducers: {
    updateTimer: (state, action: PayloadAction<Timer>) => {
      return {
        ...state,
        entity: {
          ...action.payload,
        },
      };
    },
    decrement: (
      state,
      action: PayloadAction<{ secondsLeft: number; totalTimeCounter: number }>
    ) => {
      const { secondsLeft, totalTimeCounter } = action.payload;
      const newSecondsLeft = Math.max(0, secondsLeft - 1);
      let newTimeCounter = totalTimeCounter;
      if (state.entity.timerMode === "focus") {
        newTimeCounter = totalTimeCounter + 1;
      }
      return {
        ...state,
        entity: {
          ...state.entity,
          secondsLeft: newSecondsLeft,
          totalTimeCounter: newTimeCounter,
        },
      };
    },

    changeFocusTime: (state, action: PayloadAction<{ focusTime: number }>) => {
      const { focusTime } = action.payload;
      const timeDifference = (focusTime - state.entity.focusTime) * 60;
      const newSecondsLeft =
        state.entity.timerMode === "focus"
          ? Math.max(state.entity.secondsLeft + timeDifference, 0)
          : state.entity.secondsLeft;

      return {
        ...state,
        entity: {
          ...state.entity,
          focusTime,
          secondsLeft: newSecondsLeft,
        },
      };
    },
    changeBreakTime: (state, action: PayloadAction<{ breakTime: number }>) => {
      const { breakTime } = action.payload;
      const timeDifference = (breakTime - state.entity.breakTime) * 60;
      const newSecondsLeft =
        state.entity.timerMode === "break"
          ? Math.max(state.entity.secondsLeft + timeDifference, 0)
          : state.entity.secondsLeft;

      return {
        ...state,
        entity: {
          ...state.entity,
          breakTime,
          secondsLeft: newSecondsLeft,
        },
      };
    },
    resetTotalCounter: (
      state
    ) => {
      return {
        ...state,
        entity: {
          ...state.entity,
          totalTimeCounter: 0,
        },
      };
    },
    fetchTimer: (state, action: PayloadAction<Timer>) => {
      return {
        ...state,
        entity: {
          ...action.payload,
        },
      };
    }
  },
});

export { timerSlice };
export const timerActions = timerSlice.actions;
export default timerSlice.reducer;
