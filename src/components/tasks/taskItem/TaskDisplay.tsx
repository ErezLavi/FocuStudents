import React from "react";
import { IconTrash, IconEdit } from "@tabler/icons-react";
import classes from "./TaskItem.module.css";

interface TaskDisplayProps {
  editedTask: {
    id: string;
    name: string;
    description: string;
    isCompleted: boolean;
    date: string | null;
  };
  deleteTaskHandler: (event: React.FormEvent) => void;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  checkBoxToggle: () => void;
}

const TaskDisplay: React.FC<TaskDisplayProps> = ({
  editedTask,
  deleteTaskHandler,
  setIsEdit,
  checkBoxToggle,
}) => {
  return (
    <div>
      <label
        style={{
          textDecoration: editedTask.isCompleted ? "line-through" : "none",
          color: editedTask.isCompleted ? "#666666" : "#000",
        }}
      >
        {editedTask.name}
      </label>
      <section>
        <label
          style={{
            fontWeight: "350",
            textDecoration: editedTask.isCompleted ? "line-through" : "none",
            color: editedTask.isCompleted ? "#666666" : "#000",
          }}
        >
          {editedTask.description}
        </label>
      </section>
      <section
        style={{
          marginTop: "0.5rem",
          fontSize: "0.9rem",
          textDecoration: editedTask.isCompleted ? "line-through" : "none",
          color: editedTask.isCompleted ? "#666666" : "#000",
        }}
      >
        <label>{editedTask.date}</label>
      </section>
      <div>
        <IconTrash onClick={deleteTaskHandler} className={classes.trash} />
        <IconEdit
          className={classes.iconEdit}
          onClick={() => {
            setIsEdit(true);
          }}
        />
        <input
          className={classes.checkBox}
          type="checkbox"
          checked={editedTask.isCompleted}
          onChange={checkBoxToggle}
        />
      </div>
    </div>
  );
};

export default TaskDisplay;
