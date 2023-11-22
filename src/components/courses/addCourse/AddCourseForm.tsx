import * as React from "react";
import classes from "./AddCourseForm.module.css";
import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { coursesActions } from "../../../store/courses-slice";
import Course from "../../../models/Course";

const AddCourseForm: React.FC<{
  onCancel: (event: React.FormEvent) => void;
}> = (props) => {
  const colorDots = [
    { id: 1, text: "#186F65" },
    { id: 2, text: "#040D12" },
    { id: 3, text: "#451952" },
    { id: 4, text: "#A76F6F" },
    { id: 5, text: "#5C5470" },
    { id: 6, text: "#94A684" },
    { id: 7, text: "#088395" },
    { id: 8, text: "#AE445A" },
    { id: 9, text: "#C08261" },
  ];

  const [activeId, setActiveId] = useState<number>(1);
  const courseTextInputRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredName = courseTextInputRef.current!.value;
    const enteredColor = colorDots[activeId - 1].text;
    const newCourse = new Course(enteredName, enteredColor);

    if (enteredName.trim().length === 0) {
      setErrorMessage("*Empty name field..");
      return;
    }
    setErrorMessage("");
    dispatch(coursesActions.addCourse(newCourse));
    courseTextInputRef.current!.value = "";
  };

  useEffect(() => {
    if (courseTextInputRef.current) {
      courseTextInputRef.current.focus();
    }
  }, []);

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <label htmlFor="text">Course Name</label>
      <input type="text" id="text" ref={courseTextInputRef}></input>
      <span style={{ color: "#860A35" }}>{errorMessage}</span>
      <label htmlFor="text">Color</label>
      <div className={classes.colordot}>
        {colorDots.map((val) => (
          <div onClick={() => setActiveId(val.id)} key={val.id}>
            <div
              className={activeId === val.id ? `${classes.active}` : ""}
              style={{ backgroundColor: val.text }}
            >
              {activeId === val.id ? `✔` : ""}
            </div>
          </div>
        ))}
      </div>
      <div>
        <button type="submit">Add</button>
        <button type="button" onClick={props.onCancel}>
          Close
        </button>
      </div>
    </form>
  );
};

export default AddCourseForm;
