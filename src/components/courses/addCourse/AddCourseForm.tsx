import * as React from "react";
import classes from "./AddCourseForm.module.css";
import { useRef, useState, useEffect } from "react";
import { useAppDispatch } from "../../../store/hooks";
import { addCourse } from "../../../store/courses-slice";

const AddCourseForm: React.FC<{
  onCancel: (event: React.FormEvent) => void;
}> = (props) => {
  const colorDots = [
    { id: 1, text: "#186F65" },
    { id: 2, text: "#092635" },
    { id: 3, text: "#040D12" },
    { id: 4, text: "#6A2135" },
    { id: 5, text: "#5C5470" },
    { id: 6, text: "#176B87" },
    { id: 7, text: "#A76F6F" },
    { id: 8, text: "#94A684" },
    { id: 9, text: "#C08261" },
  ];

  const [activeId, setActiveId] = useState<number>(1);
  const courseTextInputRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useAppDispatch();

  const createCourse = (
    courseText: string,
    color: string,
    timeCounter: number
  ) => {
    return {
      id: new Date().toISOString(),
      name: courseText,
      color: color,
      timeCounter: timeCounter,
    };
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredName = courseTextInputRef.current!.value;
    const enteredColor = colorDots[activeId - 1].text;
    const newCourse = createCourse(enteredName, enteredColor, 0);

    if (enteredName.trim().length === 0) {
      setErrorMessage("*Empty name field..");
      return;
    }
    setErrorMessage("");
    dispatch(addCourse(newCourse));
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
      <span style={{ color: "#860A35", fontSize: "0.9rem" }}>
        {errorMessage}
      </span>
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
        <button type="button" onClick={props.onCancel}>
          Close
        </button>
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

export default AddCourseForm;
