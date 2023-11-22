import classes from "./TimerForm.module.css";
import TaskLabel from "./TaskLabel";
import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { timerActions } from "../../../store/timer-slice";
import { startTimer } from "./timerUtils";
import buttonclickSound from "../../../sound/startClickButton.mp3";

const TimerForm = () => {
  const dispatch = useAppDispatch();
  const tasksArr = useAppSelector((state) => state.tasks.tasks);
  const timerState = useAppSelector((state) => state.timer.entity);

  useEffect(() => {
    const interval = startTimer(dispatch, timerState);
    return () => clearInterval(interval);
  }, [dispatch, timerState]);

  const startButtonHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const audio = new Audio(buttonclickSound);
    audio.play();
    dispatch(
      timerActions.updateTimer({
        ...timerState,
        isPaused: !timerState.isPaused,
      })
    );
  };

  const modesButtonHandler = (
    mode: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    if (timerState.timerMode === mode) {
      return;
    }
    const nextSeconds =
      (mode === "focus" ? timerState.focusTime : timerState.breakTime) * 60;

    dispatch(
      timerActions.updateTimer({
        ...timerState,
        timerMode: mode,
        secondsLeft: nextSeconds,
        isPaused: true,
      })
    );
  };

  const activeModeStyle = (mode: string): string => {
    return timerState.timerMode === mode ? "#FFE3BB" : "#F4F2DE";
  };

  const minutes = Math.floor(timerState.secondsLeft / 60);
  let seconds = timerState.secondsLeft % 60;

  return (
    <form className={classes.form}>
      <div>
        <button
          onClick={(event) => modesButtonHandler("focus", event)}
          style={{ backgroundColor: activeModeStyle("focus") }}
        >
          Focus
        </button>
        <button
          onClick={(event) => modesButtonHandler("break", event)}
          style={{ backgroundColor: activeModeStyle("break") }}
        >
          Break
        </button>
      </div>
      <label className={classes.clock}>
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </label>
      <button className={classes.startButtonStyle} onClick={startButtonHandler}>
        {timerState.isPaused ? "Start" : "Pause"}
      </button>
      <TaskLabel tasksArr={tasksArr} />
    </form>
  );
};

export default TimerForm;
