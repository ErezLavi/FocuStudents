import classes from "./TimerForm.module.css";
import TaskLabel from "./TaskLabel";
import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { IconChevronRightPipe } from "@tabler/icons-react";
import { timerActions } from "../../../store/timer-slice";
import { startTimer } from "./timerUtils";
import { clearInterval } from "worker-timers";
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
    event: React.MouseEvent<Element, MouseEvent>
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

  const iconClickHandler = (event: React.MouseEvent<Element, MouseEvent>) => {
    event.preventDefault();
    const nextMode = timerState.timerMode === "focus" ? "break" : "focus";
    modesButtonHandler(nextMode, event);
  };

  const activeModeStyle = (mode: string): string => {
    return timerState.timerMode === mode ? "#FFE3BB" : "#F4F2DE";
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

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
        {formatTime(timerState.secondsLeft)}
      </label>
      <section>
        <button
          className={classes.startButtonStyle}
          onClick={startButtonHandler}
        >
          {timerState.isPaused ? "Start" : "Pause"}
        </button>
        {!timerState.isPaused && (
          <IconChevronRightPipe
            size={45}
            className={classes.switchButton}
            onClick={(event) => iconClickHandler(event)}
          />
        )}
      </section>
      <TaskLabel tasksArr={tasksArr} />
    </form>
  );
};

export default TimerForm;
