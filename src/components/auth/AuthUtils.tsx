import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "./firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { tasksActions } from "../../store/tasks-slice";
import { coursesActions } from "../../store/courses-slice";
import { timerActions } from "../../store/timer-slice";
import { goalActions } from "../../store/goal-slice";

// Sign up function
export async function signUpUser(
  email: string,
  password: string,
  tasks: any,
  courses: any,
  timer: any,
  goal: any
) {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    const userDocRef = await addDoc(collection(db, "users"), {
      email: email,
      tasks: tasks,
      courses: courses,
      timer: timer,
      goal: goal,
    });
    console.log("Document written with ID: ", userDocRef.id);
  } catch (e) {
    console.error("Error signing up user: ", e);
    throw e; // Re-throw the error for handling in the component
  }
}

// Login function
export async function loginUser(
  email: string,
  password: string,
  dispatch: any,
  navigate: any
) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    const user = auth.currentUser;
    if (user) {
      const userId = user.uid;
      const querySnapshot = await getDocs(
        query(collection(db, "users"), where("email", "==", email))
      );
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        dispatch(tasksActions.fetchTasks(data.tasks.tasks));
        dispatch(coursesActions.fetchCourses(data.courses.courses));
        dispatch(timerActions.fetchTimer(data.timer.entity));
        dispatch(goalActions.fetchGoal(data.goal.entity));
      });
      if (querySnapshot.empty) {
        console.log("No matching documents found for user:", userId);
      }
      navigate("/Tasks");
    } else {
      console.log("User Not Found.");
    }
  } catch (e) {
    console.error("Error logging in user: ", e);
    throw e; // Re-throw the error for handling in the component
  }
}
