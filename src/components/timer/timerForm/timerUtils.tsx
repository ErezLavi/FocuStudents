import { timerActions } from "../../../store/timer-slice";
import timerAlarm from '../../../sound/switchModeAlarm.mp3'

export const startTimer = (dispatch:any, timerState:any) => {
    return setInterval(() => {
      if (timerState.isPaused) {
        return;
      }
      if (timerState.secondsLeft === 0) {
        return switchMode(dispatch, timerState);
      }
      dispatch(timerActions.decrement({ secondsLeft: timerState.secondsLeft}));
    }, 1000);
  };
  
  const switchMode = (dispatch:any, timerState:any) => {
    const audio = new Audio(timerAlarm);
    audio.play();
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