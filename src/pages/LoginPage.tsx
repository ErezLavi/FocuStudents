import React, { useState } from "react";
import LoginForm from "../components/auth/LoginForm";
import AuthDetails from "../components/auth/AuthDetails";
import TasksLayout from "../components/layout/tasksLayout/TasksLayout";

const LoginPage: React.FC = () => {

  return (
    <TasksLayout>
      <LoginForm />
      <AuthDetails />
    </TasksLayout>
  );
};

export default LoginPage;
