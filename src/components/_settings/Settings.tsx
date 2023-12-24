import ReactSlider from "react-slider";
import classes from "./Settings.module.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { timerActions } from "../../store/timer-slice";
import { coursesActions } from "../../store/courses-slice";
import { IconRefresh } from "@tabler/icons-react";

const Settings = () => {
  const dispatch = useAppDispatch();
  const timerState = useAppSelector((state) => state.timer.entity);
  const resetDataHandler = () => {
    dispatch(timerActions.resetTotalCounter());
    dispatch(coursesActions.resetTimeCounter());
  };
  return (
    <div className={classes.slider}>
      <label style={{ textDecoration: "underline", fontSize: "1.8rem" }}>
        Timer Settings
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
        max={60}
      />
      <div className={classes.resetDiv}>
        <hr></hr>
        <label style={{ textDecoration: "underline", fontSize: "1.8rem" }}>
          Data Settings
        </label>
        <div>
          <label style={{ margin: 0 }}>Reset Time Data:</label>
          <button onClick={resetDataHandler}>
            {" "}
            <IconRefresh color="#071952" height="1rem" width="1.2rem" />
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
