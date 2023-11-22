import Task from "../../../models/Task";

const TaskLabel = ({ tasksArr }: { tasksArr: Task[] }) => {
  return (
    <label style={{ fontSize: 18 ,textAlign:"center"}}>
      {tasksArr.length > 0
        ? tasksArr.some((task) => task.isChosen)
          ? tasksArr.map((task) =>
              task.isChosen && !task.isCompleted ? task.name : null
            )
          : "Choose a task :)"
        : null}
    </label>
  );
};

export default TaskLabel;