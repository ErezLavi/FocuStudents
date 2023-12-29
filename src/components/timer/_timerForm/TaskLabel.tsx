import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { tasksActions } from "../../../store/tasks-slice";
import { useEffect } from "react";

const TaskLabel = () => {
  const dispatch = useAppDispatch();
  const tasksArr = useAppSelector((state) => state.tasks.tasks);
  
  useEffect(() => {
    dispatch(tasksActions.setInitialChosen());
  }, [dispatch, tasksArr]);

  return (
    <label style={{ fontSize: '1.2rem', textAlign: "center" }}>
      {tasksArr.length > 0
        ? tasksArr.map((task) =>
            task.isChosen && !task.isCompleted ? task.name : null
          )
        : null}
    </label>
  );
};

export default TaskLabel;
