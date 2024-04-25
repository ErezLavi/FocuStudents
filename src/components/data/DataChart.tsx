import classes from "./DataChart.module.css";
import { useState } from "react";
import { PieChart } from "react-minimal-pie-chart";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { timerActions } from "../../store/timer-slice";
import { resetTimeCounter } from "../../store/courses-slice";
import { IconRefresh } from "@tabler/icons-react";

const DataChart = () => {
  const [resetClicked, setResetClicked] = useState(false);
  const dispatch = useAppDispatch();
  const timerState = useAppSelector((state) => state.timer.entity);
  const coursesState = useAppSelector((state) => state.courses.courses);
  const totalTime = !isNaN(timerState.totalTimeCounter)
    ? timerState.totalTimeCounter
    : 0;
  const coursesData = coursesState.map((course) => ({
    value:
      totalTime !== 0
        ? Math.floor(
            (100 * (!isNaN(course.timeCounter) ? course.timeCounter : 0)) /
              totalTime
          )
        : 1,
    color: course.color,
  }));

  const formatTime = (time: number): string => {
    const hours = Math.floor(time / 3600);
    const remainingTimeAfterHours = time - hours * 3600;

    const minutes = Math.floor(remainingTimeAfterHours / 60);
    const seconds = remainingTimeAfterHours % 60;

    return `${hours < 10 ? `0${hours}` : hours}:${
      minutes < 10 ? `0${minutes}` : minutes
    }:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const resetDataHandler = () => {
    setResetClicked(false);
    dispatch(timerActions.resetTotalCounter());
    dispatch(resetTimeCounter());
  };

  return (
    <div className={classes.div}>
      <section>Courses Focus Time</section>
      <div>
        <PieChart
          data={coursesData}
          style={{ marginTop: "1.5rem", width: "18rem" }}
          animate
          lineWidth={55}
        />
        <ul>
          {coursesState.map((course) => (
            <li key={course.id}>
              <div style={{ backgroundColor: course.color }}></div>
              {course.name}
              {" " +
                (totalTime !== 0
                  ? (
                      (100 *
                        (!isNaN(course.timeCounter) ? course.timeCounter : 0)) /
                      totalTime
                    ).toFixed(1)
                  : 0) +
                "%"}
            </li>
          ))}
        </ul>
      </div>
      <section>
        <section style={{ fontSize: "0.8rem" }}>Total Study Time</section>
        <section>{formatTime(totalTime)}</section>
      </section>
      <div className={classes.resetDiv}>
        <div>
          {!resetClicked ? (
            <button onClick={() => setResetClicked(true)}>
              <IconRefresh color="#071952" height="1rem" width="1.2rem" />
              Reset All Time Data
            </button>
          ) : (
            <div>
              <label>⚠️Are you sure?</label>
              <div>
                <button onClick={resetDataHandler}>Yes</button>
                <button onClick={() => setResetClicked(false)}>No</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataChart;
