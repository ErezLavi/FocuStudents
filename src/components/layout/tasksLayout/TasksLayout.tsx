import * as React from "react";
import classes from "./TasksLayout.module.css";

type LayoutProps = {
  children: React.ReactNode;
};

const TasksLayout = (props: LayoutProps) => {
  return <main className={classes.main}>{props.children}</main>;
};

export default TasksLayout;
