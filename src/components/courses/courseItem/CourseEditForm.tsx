import React from "react";
import Course from "../../../models/Course";
import classes from "./CourseItem.module.css";
import { IconTrash } from "@tabler/icons-react";

interface CourseEditFormProps {
  course: Course;
  editedCourseName: string;
  errorMessage: string;
  backgroundcolor: React.CSSProperties;
  onEditHandler: (event: React.FormEvent) => void;
  onDeleteHandler: (event: React.FormEvent) => void;
  onCancelEdit: () => void;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CourseEditForm: React.FC<CourseEditFormProps> = ({
  course,
  editedCourseName,
  errorMessage,
  backgroundcolor,
  onEditHandler,
  onDeleteHandler,
  onCancelEdit,
  onNameChange,
}) => {
  return (
    <form
      className={classes.form}
      id={course.id}
      style={backgroundcolor}
      onSubmit={onEditHandler}
      key={course.id}
    >
      <input
        type="text"
        defaultValue={editedCourseName}
        onChange={onNameChange}
      ></input>
      <span style={{ color: "#860A35" }}>{errorMessage}</span>
      <div>
        <IconTrash onClick={onDeleteHandler} className={classes.trash} />
        <button type="button" style={backgroundcolor} onClick={onCancelEdit}>
          Cancel
        </button>
        <button type="submit" style={backgroundcolor}>
          Save
        </button>
      </div>
    </form>
  );
};

export default CourseEditForm;
