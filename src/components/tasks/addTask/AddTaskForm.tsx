import classes from "./AddTaskForm.module.css";
import React, { useState, useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { addTask } from "../../../store/tasks-slice";

const NewTaskForm: React.FC<{
  onCancel: (event: React.FormEvent) => void;
  getCurrentCourseId: () => string;
}> = (props) => {
  const dispatch = useAppDispatch();
  const tasksArr = useAppSelector((state) => state.tasks.tasks);
  const taskNameInputRef = useRef<HTMLInputElement>(null);
  const taskDescriptionInputRef = useRef<HTMLInputElement>(null);
  const taskDateInputRef = useRef<HTMLInputElement>(null);
  const [nameErrorMessage, setNameErrorMessage] = useState("");

  const createTask = (
    name: string,
    description: string,
    courseId: string,
    selectedDate: string
  ) => {
    return {
      id: new Date().toISOString(),
      name: name,
      description: description,
      courseId: courseId,
      isCompleted: false,
      isChosen: tasksArr.length === 0,
      date: formatDate(selectedDate),
    };
  };

  const formatDate = (selectedDate: string) => {
    if (!selectedDate) {
      return "";
    }
    const [year, month, day] = selectedDate.split("-");
    return `${day}/${month}/${year.slice(2)}`;
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const selectedDate = taskDateInputRef.current!.value;
    const enteredName = taskNameInputRef.current!.value;
    const enteredDescription = taskDescriptionInputRef.current!.value;

    if (enteredName.trim().length === 0) {
      setNameErrorMessage("*Empty name field..");
      return;
    }
    const currentCourseId = props.getCurrentCourseId();
    const newTask = createTask(
      enteredName,
      enteredDescription,
      currentCourseId,
      selectedDate
    );

    dispatch(addTask(newTask));
    taskNameInputRef.current!.value = "";
  };

  useEffect(() => {
    if (taskNameInputRef.current) {
      taskNameInputRef.current.focus();
    }
  }, []);

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div>
        <label>Name</label>
      </div>
      <input type="text" id="name" ref={taskNameInputRef}></input>
      <label style={{ color: "#860A35" }}>{nameErrorMessage}</label>
      <div>
        <label>Description</label>
      </div>
      <input type="text" id="description" ref={taskDescriptionInputRef}></input>
      <div>
        <label>Date</label>
      </div>
      <input type="date" id="dateInput" ref={taskDateInputRef}></input>
      <div>
        <button type="button" onClick={props.onCancel}>
          Close
        </button>
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

export default NewTaskForm;
