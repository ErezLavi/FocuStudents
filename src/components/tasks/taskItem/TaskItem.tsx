import classes from "./TaskItem.module.css";
import React, { useState } from "react";
import Task from "../../../models/Task";
import TaskEditForm from "./TaskEditForm";
import TaskDisplay from "./TaskDisplay";
import { useAppDispatch } from "../../../store/hooks";
import { removeTask, editTask } from '../../../store/tasks-slice';

const TaskItem = ({ task }: { task: Task }) => {
  const dispatch = useAppDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [editedTask, setEditedTask] = useState(task);
  const [errorMessage, setErrorMessage] = useState("");
  const [editedTaskName, setEditedTaskName] = useState(editedTask.name);
  const [editedTaskDescription, setEditedTaskDescription] = useState(
    editedTask.description
  );
  const [editedTaskDate, setEditedTaskDate] = useState(editedTask.date);

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
      date: editedTaskDate
    };
    dispatch(editTask(updatedTask));
    setEditedTask(updatedTask);
    setIsEdit(false);
  };

  const deleteTaskHandler = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(removeTask(task));
  };

  const checkBoxToggle = () => {
    const updatedTask = {
      ...editedTask,
      isCompleted: !editedTask.isCompleted,
    };
    dispatch(editTask(updatedTask));
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
          editedTaskDate={editedTaskDate}
          setEditedTaskDate={setEditedTaskDate}
        />
      )}
    </section>
  );
};

export default TaskItem;
