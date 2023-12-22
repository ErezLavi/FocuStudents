import React, { useState, useEffect } from "react";
import classes from "./MainNavigation.module.css";
import { NavLink } from "react-router-dom";
import { Fade as Hamburger } from "hamburger-react";
import {
  IconListCheck,
  IconAlarm,
  IconSettings,
  IconChartPieFilled,
} from "@tabler/icons-react";

const MainNavigation: React.FC = () => {
  const [activeId, setActiveId] = useState<number | undefined>(1);
  const [isOpen, setOpen] = useState(false);
  const toggleBurger = () => {
    setOpen((oldState) => !oldState);
  };

  const navButtons = [
    { id: 1, text: "Tasks", icon: <IconListCheck /> },
    { id: 2, text: "Timer", icon: <IconAlarm /> },
    { id: 3, text: "Data", icon: <IconChartPieFilled /> },
    { id: 4, text: "Settings", icon: <IconSettings /> },
  ];

  useEffect(() => {
    const storedActiveId = localStorage.getItem("activeId");
    if (storedActiveId) {
      setActiveId(Number(storedActiveId));
    }
  }, []);

  const handleItemClick = (id: number) => {
    setActiveId(id);
    localStorage.setItem("activeId", String(id));
  };

  const items = navButtons.map((val) => (
    <li key={val.id} onClick={() => handleItemClick(val.id)}>
      <NavLink
        to={`/${val.text}`}
        className={activeId === val.id ? `${classes.active}` : ""}
      >
        {val.icon}
        {val.text}
      </NavLink>
    </li>
  ));

  return (
    <header
      className={!isOpen ? `${classes.header}` : `${classes.mobileHeader}`}
    >
      <section>
        <h1 className={classes.logo}>FocuStudents</h1>
        <Hamburger onToggle={toggleBurger} color="#f4e0b9" distance="sm" />
      </section>
      <nav className={!isOpen ? `${classes.nav}` : `${classes.mobileNav}`}>
        <ul>{items}</ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
