import React from "react";
import classes from "./CourseList.module.css";
import AddCourseBtn from "./addCourse/AddCourseBtn";
import AddCourseForm from "./addCourse/AddCourseForm";
import Course from "../../models/Course";
import CourseItem from "./courseItem/CourseItem";

const CourseList = ({ courses }: { courses: Course[] }) => {
  const [isClicked, setIsClicked] = React.useState<boolean>(false);

  const toggleAddCourseHandler = () => {
    setIsClicked((oldState) => !oldState);
  };
  return (
    <ul className={classes.ul}>
      {courses.map((courseItem) => (
        <CourseItem course={courseItem} key={courseItem.id} />
      ))}
      {!isClicked ? (
        <AddCourseBtn onAddCourseBtn={toggleAddCourseHandler} />
      ) : (
        <AddCourseForm onCancel={toggleAddCourseHandler} />
      )}
    </ul>
  );
};

export default CourseList;
