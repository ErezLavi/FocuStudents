import React, { useState } from "react";
import LoginForm from "../components/auth/LoginForm";
import TasksLayout from "../components/layout/tasksLayout/TasksLayout";

const LoginPage: React.FC = () => {

  return (
    <TasksLayout>
      <LoginForm />
    </TasksLayout>
  );
};

export default LoginPage;
