import React from "react";
import classes from "./AddCourseBtn.module.css";

const AddCourseBtn: React.FC<{
  onAddCourseBtn: (event: React.FormEvent) => void;
}> = (props) => {
  return (
    <button onClick={props.onAddCourseBtn} className={classes.button}>
      Add Course
    </button>
  );
};

export default AddCourseBtn;
