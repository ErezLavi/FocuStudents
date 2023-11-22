import classes from "./AddTaskBtn.module.css";

const AddTaskBtn: React.FC<{
  onAddCourseBtn: (event: React.FormEvent) => void;
}> = (props) => {
  return (
    <button className={classes.button} onClick={props.onAddCourseBtn}>
      Add New Task +
    </button>
  );
};

export default AddTaskBtn;
