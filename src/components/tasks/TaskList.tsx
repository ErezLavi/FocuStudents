import TaskItem from "./taskItem/TaskItem";
import Task from "../../models/Task";

const TaskList = ({ tasks }: { tasks: Task[] }) => {
  return (
    <div>
      {tasks.map((taskItem) => (
        <TaskItem task={taskItem} key={taskItem.id} />
      ))}
    </div>
  );
};

export default TaskList;
