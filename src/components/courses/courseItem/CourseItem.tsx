import React, { useState } from "react";
import classes from "./CourseItem.module.css";
import Course from "../../../models/Course";
import CourseHeader from "./CourseHeader";
import CourseEditForm from "./CourseEditForm";
import AddTaskBtn from "../../tasks/addTask/AddTaskBtn";
import AddTaskForm from "../../tasks/addTask/AddTaskForm";
import TaskList from "../../tasks/TaskList";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { coursesActions } from "../../../store/courses-slice";
import { tasksActions } from "../../../store/tasks-slice";
import { createSelector } from "@reduxjs/toolkit";

const CourseItem = ({ course }: { course: Course }) => {
  const dispatch = useAppDispatch();
  const [editedCourse, setEditedCourse] = useState({
    id: course.id,
    name: course.name,
    color: course.color,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [editedCourseName, setEditedCourseName] = useState(editedCourse.name);
  const [isEdit, setIsEdit] = useState(false);
  const [isClicked, setIsClicked] = React.useState<boolean>(false);

  const selectTasks = (state: any) => state.tasks.tasks;
  const selectCourseId = (_: any, courseId: string) => courseId;

  const selectFilteredTasks = createSelector(
    [selectTasks, selectCourseId],
    (tasks, courseId) => tasks.filter((task: any) => task.courseId === courseId)
  );
  const filteredTasks = useAppSelector((state) =>
    selectFilteredTasks(state, course.id)
  );
  const backgroundcolor = { backgroundColor: course.color };

  const editCourseHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (editedCourseName.trim().length === 0) {
      setErrorMessage("*Empty name field..");
      return;
    }
    setErrorMessage("");
    const updatedCourse = {
      ...editedCourse,
      name: editedCourseName,
    };
    dispatch(coursesActions.editCourse(updatedCourse));
    setEditedCourse(updatedCourse);
    setIsEdit(false);
  };

  const deleteCourseHandler = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(coursesActions.removeCourseById(course.id));
    dispatch(tasksActions.removeTasksByCourseId(course.id));
  };

  const getId = () => {
    setIsClicked((oldState) => !oldState);
    const courseId = course.id;
    return courseId;
  };

  const toggleAddTaskHandler = () => {
    setIsClicked((oldState) => !oldState);
  };

  return (
    <div className={classes.div} id={course.id} key={course.id}>
      {!isEdit ? (
        <CourseHeader course={course} onEditClick={() => setIsEdit(true)} />
      ) : (
        <CourseEditForm
        course={course}
        editedCourseName={editedCourseName}
        errorMessage={errorMessage}
        backgroundcolor={backgroundcolor}
        onEditHandler={editCourseHandler}
        onDeleteHandler={deleteCourseHandler}
        onCancelEdit={() => {
          setIsEdit(false);
          setErrorMessage('');
        }}
        onNameChange={(e) => setEditedCourseName(e.target.value)}
      />
    )}
      <div>
        <TaskList tasks={filteredTasks} />
        {!isClicked ? (
          <AddTaskBtn onAddCourseBtn={toggleAddTaskHandler} />
        ) : (
          <AddTaskForm
            onCancel={toggleAddTaskHandler}
            getCurrentCourseId={getId}
          />
        )}
      </div>
    </div>
  );
};

export default CourseItem;
