import React from 'react';
import { IconEdit } from '@tabler/icons-react'; // Import your IconEdit component
import classes from "./CourseItem.module.css";
import Course from "../../../models/Course";

interface CourseHeaderProps {
  course: Course;
  onEditClick: () => void;
}

const CourseHeader: React.FC<CourseHeaderProps> = ({ course, onEditClick }) => (
  <header style={{ backgroundColor: course.color }}>
    <label>{course.name}</label>
    <IconEdit className={classes.iconEdit} onClick={onEditClick} />
  </header>
);

export default CourseHeader;