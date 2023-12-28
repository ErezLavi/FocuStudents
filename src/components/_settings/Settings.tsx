import ReactSlider from "react-slider";
import classes from "./Settings.module.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { timerActions } from "../../store/timer-slice";
import { coursesActions } from "../../store/courses-slice";

const Settings = () => {
  const dispatch = useAppDispatch();
  const timerState = useAppSelector((state) => state.timer.entity);

  return (
    <div>
      <div className={classes.slider}>
        <label
          style={{
            textDecoration: "underline",
            fontSize: "1.6rem",
          }}
        >
          Timer
        </label>
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
          max={180}
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
          max={30}
        />
      </div>
    </div>
  );
};

export default Settings;
