import classes from "./DataChart.module.css";
import { PieChart } from "react-minimal-pie-chart";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { timerActions } from "../../store/timer-slice";
import { coursesActions } from "../../store/courses-slice";
import { IconRefresh } from "@tabler/icons-react";

const DataChart = () => {
  const dispatch = useAppDispatch();
  const timerState = useAppSelector((state) => state.timer.entity);
  const coursesArr = useAppSelector((state) => state.courses.courses);
  const totalTime = !isNaN(timerState.totalTimeCounter)
    ? timerState.totalTimeCounter
    : 0;
  const coursesData = coursesArr.map((course) => ({
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
    dispatch(timerActions.resetTotalCounter());
    dispatch(coursesActions.resetTimeCounter());
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
          {coursesArr.map((course) => (
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
          {" "}
          <button onClick={resetDataHandler}>
            {" "}
            <IconRefresh color="#071952" height="1rem" width="1.2rem" />
            Reset Time Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataChart;
