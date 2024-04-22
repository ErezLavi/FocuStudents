import classes from "./Goal.module.css";
import { Line } from "rc-progress";
import {
  IconRefresh,
  IconCircleCheckFilled,
  IconTargetArrow,
} from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { goalActions } from "../../store/goal-slice";

const Goal = () => {
  const dispatch = useAppDispatch();
  const goalState = useAppSelector((state) => state.goal.entity);
  const [inputValue, setInputValue] = useState<string>("1");

  useEffect(() => {
    if (!goalState.isCompleted) {
      dispatch(
        goalActions.setGoalCompleted({ ...goalState, isCompleted: true })
      );
    }
  }, [dispatch, goalState]);

  const myGoalHandler = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(
      goalActions.updateGoal({
        ...goalState,
        isGoal: true,
        numOfIntervals: Number(inputValue),
        numOfCompletedIntervals: 0,
      })
    );
  };

  const resetGoalHandler = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(
      goalActions.updateGoal({
        ...goalState,
        isGoal: false,
        isCompleted: false,
      })
    );
  };

  return (
    <div
      className={classes.div}
      style={{ backgroundColor: goalState.isCompleted ? "#f4e0b9" : "" }}
    >
      <header>
        {goalState.isCompleted ? (
          <>
            <section>Goal Completed!</section>
            <IconCircleCheckFilled className={classes.checkIcon} />
          </>
        ) : (
          <>
            <section> My Goal</section>
            <IconTargetArrow />
          </>
        )}
      </header>
      {!goalState.isGoal ? (
        <>
          <div>
            <input
              type="number"
              id="tasks"
              defaultValue={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              min="1"
              max="100"
            />
            <section>Focus Intervals</section>
          </div>

          <button onClick={myGoalHandler}>Set A Goal</button>
        </>
      ) : (
        <>
          <Line
            className={classes.ProgressBar}
            percent={
              (goalState.numOfCompletedIntervals / goalState.numOfIntervals) *
              100
            }
            strokeWidth={4}
            strokeColor="#071952"
          />
          <div>
            <section>
              {goalState.numOfCompletedIntervals} / {goalState.numOfIntervals}
            </section>
            <section>Completed</section>
          </div>
          <button onClick={resetGoalHandler}>
            <IconRefresh color="#071952" height="1rem" width="1rem" />
            Reset
          </button>
        </>
      )}
    </div>
  );
};

export default Goal;
