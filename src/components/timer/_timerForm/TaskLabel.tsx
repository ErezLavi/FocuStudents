import { useAppSelector } from "../../../store/hooks";

const TaskLabel = () => {
  const tasksArr = useAppSelector((state) => state.tasks.tasks);

  return (
    <label style={{ fontSize: "1.2rem", textAlign: "center" }}>
      {tasksArr.length > 0
        ? tasksArr.map((task) =>
            task.isChosen && !task.isCompleted ? task.name : null
          )
        : null}
    </label>
  );
};

export default TaskLabel;
