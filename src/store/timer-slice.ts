import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Timer from "../models/Timer";
import { queryUserInFirestore } from "../components/auth/AuthUtils";
import { RootState } from "../store";
import { updateDoc } from "firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialTimer: Timer = {
  isPaused: true,
  timerMode: "focus",
  secondsLeft: 30 * 60,
  focusTime: 30,
  breakTime: 5,
  totalTimeCounter: 0,
};

const initialTimerState = { entity: initialTimer };

const calculateNewSecondsLeft = (
  state: any,
  newTime: number,
  oldTime: number,
  timerMode: string
) => {
  const timeDifference = (newTime - oldTime) * 60;
  const newSecondsLeft =
    state.entity.timerMode === timerMode
      ? Math.max(state.entity.secondsLeft + timeDifference, 0)
      : state.entity.secondsLeft;
  return newSecondsLeft;
};

// Firestore Functions
export const changeFocusTimeInFirestore = async (
  focusTime: number,
  secondsLeft: number
) => {
  try {
    const userSnapshot = await queryUserInFirestore();
    if (!userSnapshot) return;
    const docRef = userSnapshot.docs[0].ref;
    await updateDoc(docRef, {
      "timer.entity.focusTime": focusTime,
      "timer.entity.secondsLeft": secondsLeft,
    });
  } catch (error) {
    console.error("Error changing focus time in Firestore: ", error);
  }
};

export const changeBreakTimeInFirestore = async (
  breakTime: number,
  secondsLeft: number
) => {
  try {
    const userSnapshot = await queryUserInFirestore();
    if (!userSnapshot) return;
    const docRef = userSnapshot.docs[0].ref;
    await updateDoc(docRef, {
      "timer.entity.breakTime": breakTime,
      "timer.entity.secondsLeft": secondsLeft,
    });
  } catch (error) {
    console.error("Error changing break time in Firestore: ", error);
  }
};

export const updateTimerInFirestore = async (timer: Timer) => {
  try {
    const userSnapshot = await queryUserInFirestore();
    if (!userSnapshot) return;
    const docRef = userSnapshot.docs[0].ref;
    await updateDoc(docRef, {
      "timer.entity": timer,
    });
  } catch (error) {
    console.error("Error updating timer in Firestore: ", error);
  }
};

// Async Thunks
export const changeFocusTime = createAsyncThunk(
  "timer/changeFocusTime",
  async (focusTime: number, { dispatch, getState }) => {
    const state = getState() as RootState;
    const secondsLeft = calculateNewSecondsLeft(
      state.timer,
      focusTime,
      state.timer.entity.focusTime,
      "focus"
    );
    dispatch(timerActions.changeFocusTime({ focusTime, secondsLeft }));
    await changeFocusTimeInFirestore(focusTime, secondsLeft);
    return focusTime;
  }
);

export const changeBreakTime = createAsyncThunk(
  "timer/changeBreakTime",
  async (breakTime: number, { dispatch, getState }) => {
    const state = getState() as RootState;
    const secondsLeft = calculateNewSecondsLeft(
      state.timer,
      breakTime,
      state.timer.entity.breakTime,
      "break"
    );
    dispatch(timerActions.changeBreakTime({ breakTime, secondsLeft }));
    await changeBreakTimeInFirestore(breakTime, secondsLeft);
    return breakTime;
  }
);

export const updateTimer = createAsyncThunk(
  "timer/updateTimer",
  async (timer: Timer, { dispatch }) => {
    dispatch(timerActions.updateTimer(timer));
    await updateTimerInFirestore(timer);
    return timer;
  }
);

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
    changeFocusTime: (
      state,
      action: PayloadAction<{ focusTime: number; secondsLeft: number }>
    ) => {
      const { focusTime, secondsLeft } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          focusTime,
          secondsLeft: secondsLeft,
        },
      };
    },
    changeBreakTime: (
      state,
      action: PayloadAction<{ breakTime: number; secondsLeft: number }>
    ) => {
      const { breakTime, secondsLeft } = action.payload;

      return {
        ...state,
        entity: {
          ...state.entity,
          breakTime,
          secondsLeft: secondsLeft,
        },
      };
    },
    resetTotalCounter: (state) => {
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
    },
  },
});

export { timerSlice };
export const timerActions = timerSlice.actions;
export default timerSlice.reducer;
