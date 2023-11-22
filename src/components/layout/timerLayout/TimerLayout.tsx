import * as React from "react";
import classes from "./TimerLayout.module.css";
import { useAppSelector } from "../../../store/hooks";

type LayoutProps = {
  children: React.ReactNode;
};

const TimerLayout = (props: LayoutProps) => {
  return <main className={classes.main}>{props.children}</main>;
};

export default TimerLayout;
