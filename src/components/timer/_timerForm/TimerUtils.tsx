import { timerActions } from "../../../store/timer-slice";
import { coursesActions } from "../../../store/courses-slice";
import {updateTimer} from "../../../store/timer-slice";
import { updateGoal } from "../../../store/goal-slice";
import timerAlarm from "../../../sound/switchModeAlarm.mp3";
import { setInterval } from "worker-timers";
import Goal from "../../../models/Goal";
import Timer from "../../../models/Timer";
import Task from "../../../models/Task";

export const startTimer = (
  dispatch: any,
  timerState: Timer,
  goalState: Goal,
  tasksState: Task[]
) => {
  const chosenTask = tasksState.find((task) => task.isChosen);
  return setInterval(() => {
    if (timerState.isPaused) {
      return;
    }
    if (timerState.secondsLeft === 0) {
      return switchMode(dispatch, timerState, goalState);
    }
    dispatch(
      timerActions.decrement({
        secondsLeft: timerState.secondsLeft,
        totalTimeCounter: timerState.totalTimeCounter,
      })
    );
    if (chosenTask && timerState.timerMode === "focus") {
      const currentCourseId = chosenTask.courseId;
      dispatch(coursesActions.incrementTimeCounter(currentCourseId));
    }
  }, 1000);
};

const switchMode = (dispatch: any, timerState: Timer, goalState: Goal) => {
  const audio = new Audio(timerAlarm);
  audio.play();
  if (
    timerState.timerMode === "focus" &&
    goalState.numOfCompletedIntervals < goalState.numOfIntervals &&
    goalState.isGoal
  ) {
    const updatedGoal = {
      ...goalState,
      numOfCompletedIntervals: goalState.numOfCompletedIntervals + 1,
      isCompleted:
        goalState.numOfCompletedIntervals + 1 === goalState.numOfIntervals,
    };
    dispatch(updateGoal(updatedGoal));
  }

  const nextMode = timerState.timerMode === "focus" ? "break" : "focus";
  const nextSeconds =
    (nextMode === "focus" ? timerState.focusTime : timerState.breakTime) * 60;
  dispatch(
    updateTimer({
      ...timerState,
      timerMode: nextMode,
      secondsLeft: nextSeconds,
    })
  );
};
