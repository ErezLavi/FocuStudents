import { Routes, Route, Navigate} from "react-router-dom";
import TasksPage from "./pages/TasksPage";
import TimerPage from "./pages/TimerPage";
import DataPage from './pages/DataPage';
import SettingsPage from "./pages/SettingsPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./components/layout/Layout";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./components/auth/firebase";
import { useDispatch } from "react-redux";
import { queryUserInFirestore } from "./components/auth/AuthUtils";
import { coursesActions } from "./store/courses-slice";
import { tasksActions } from "./store/tasks-slice";
import { timerActions } from "./store/timer-slice";
import { goalActions } from "./store/goal-slice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Fetch user data from Firestore
          const userSnapshot = await queryUserInFirestore();
          if (!userSnapshot) return;
          const doc = userSnapshot.docs[0];
          const data = doc.data();

          // Dispatch user data to Redux store
          dispatch(coursesActions.fetchCourses(data.courses));
          dispatch(tasksActions.fetchTasks(data.tasks));
          dispatch(timerActions.fetchTimer(data.timer.entity));
          dispatch(goalActions.fetchGoal(data.goal.entity));
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [dispatch]);
  return (
    <div>
      <Layout >
        <Routes>
          <Route path="/Tasks" element={<TasksPage />}></Route>
          <Route path="/Timer" element={<TimerPage />}></Route>
          <Route path="/Data" element={<DataPage />}></Route>
          <Route path="/Settings" element={<SettingsPage />}></Route>
          <Route path="/login" element ={<LoginPage />}></Route>
          <Route path="*" element={<Navigate to="/Tasks" replace />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
