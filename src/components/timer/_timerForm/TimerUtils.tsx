import { timerActions } from "../../../store/timer-slice";
import { goalActions } from "../../../store/goal-slice";
import { coursesActions } from "../../../store/courses-slice";
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
      const chosenCourseId = chosenTask.courseId;
      dispatch(coursesActions.incrementTimeCounter(chosenCourseId));
    }
  }, 1000);
};

const switchMode = (dispatch: any, timerState: Timer, goalState: Goal) => {
  const audio = new Audio(timerAlarm);
  audio.play();
  if (
    timerState.timerMode === "focus" &&
    goalState.numOfCompletedIntervals < goalState.numOfIntervals
  ) {
    dispatch(
      goalActions.updateGoal({
        ...goalState,
        numOfCompletedIntervals: goalState.numOfCompletedIntervals + 1,
      })
    );
  }

  const nextMode = timerState.timerMode === "focus" ? "break" : "focus";
  const nextSeconds =
    (nextMode === "focus" ? timerState.focusTime : timerState.breakTime) * 60;
  dispatch(
    timerActions.updateTimer({
      ...timerState,
      timerMode: nextMode,
      secondsLeft: nextSeconds,
    })
  );
};
