import ReactSlider from "react-slider";
import classes from "./settings.module.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { timerActions } from "../../store/timer-slice";

const Settings = () => {
  const dispatch = useAppDispatch();
  const timerState = useAppSelector((state) => state.timer.entity);
  return (
    <div className={classes.slider}>
      <label>Focus time: {timerState.focusTime}:00</label>
      <ReactSlider
        className={classes.sliderRed}
        thumbClassName={classes.sliderRedthumb}
        trackClassName={classes.track}
        value={timerState.focusTime}
        step={5}
        onChange={(newValue) =>
          dispatch(
            timerActions.changeFocusTime({
              focusTime: newValue,
            })
          )
        }
        min={0}
        max={120}
      />
      <label>Break time: {timerState.breakTime}:00</label>
      <ReactSlider
        className={classes.sliderGreen}
        thumbClassName={classes.sliderGreenThumb}
        trackClassName={classes.track}
        value={timerState.breakTime}
        onChange={(newValue) =>
          dispatch(
            timerActions.changeBreakTime({
              breakTime: newValue,
            })
          )
        }
        min={1}
        max={60}
      />
    </div>
  );
};

export default Settings;
