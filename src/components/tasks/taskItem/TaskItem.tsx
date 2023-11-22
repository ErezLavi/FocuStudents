import classes from "./TaskItem.module.css";
import React, { useState } from "react";
import Task from "../../../models/Task";
import TaskEditForm from "./TaskEditForm";
import TaskDisplay from "./TaskDisplay";
import { useAppDispatch } from "../../../store/hooks";
import { tasksActions } from "../../../store/tasks-slice";

const TaskItem = ({ task }: { task: Task }) => {
  const dispatch = useAppDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [editedTask, setEditedTask] = useState({
    id: task.id,
    name: task.name,
    description: task.description,
    isCompleted: task.isCompleted,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [editedTaskName, setEditedTaskName] = useState(editedTask.name);
  const [editedTaskDescription, setEditedTaskDescription] = useState(
    editedTask.description
  );

  const editTaskHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (editedTaskName.trim().length === 0) {
      setErrorMessage("*Empty name field..");
      return;
    }
    setErrorMessage("");
    const updatedTask = {
      ...editedTask,
      name: editedTaskName,
      description: editedTaskDescription,
    };
    dispatch(tasksActions.editTask(updatedTask));
    setEditedTask(updatedTask);
    setIsEdit(false);
  };

  const deleteTaskHandler = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(tasksActions.removeTaskById(task.id));
  };

  const checkBoxToggle = () => {
    const updatedTask = {
      ...editedTask,
      isCompleted: !editedTask.isCompleted,
    };
    dispatch(tasksActions.editTask(updatedTask));
    setEditedTask(updatedTask);
  };

  return (
    <section className={classes.section} id={task.id}>
      {!isEdit ? (
        <TaskDisplay
        editedTask={editedTask}
        deleteTaskHandler={deleteTaskHandler}
        setIsEdit={setIsEdit}
        checkBoxToggle={checkBoxToggle}
      />
      ) : (
        <TaskEditForm
          task={task}
          editTaskHandler={editTaskHandler}
          setIsEdit={setIsEdit}
          editedTaskName={editedTaskName}
          setEditedTaskName={setEditedTaskName}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          editedTaskDescription={editedTaskDescription}
          setEditedTaskDescription={setEditedTaskDescription}
        />
      )}
    </section>
  );
};

export default TaskItem;
