import CourseList from "../components/courses/CourseList";
import TasksLayout from "../components/layout/tasksLayout/TasksLayout";
import { useAppSelector } from "../store/hooks";
const AllTasks = () => {
  const coursesArr = useAppSelector((state) => state.courses.courses);
  return (
    <TasksLayout>
      <CourseList courses={coursesArr} />
    </TasksLayout>
  );
};

export default AllTasks;
