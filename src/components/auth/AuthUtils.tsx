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

export const queryUserInFirestore = async () => {
  const currentUser = auth.currentUser;
  try {
    if (currentUser) {
      const querySnapshot = await getDocs(
        query(collection(db, "users"), where("email", "==", currentUser.email))
      );
      if (querySnapshot.empty) {
        console.log("No user found in Firestore");
        return;
      }
      return querySnapshot;
    } else {
      return;
    }
  } catch (error) {
    console.error("Error querying user in Firestore: ", error);
  }
};

// Sign up function
export async function signUpUser(
  email: string,
  password: string,
  tasks: any,
  courses: any,
  timer: any,
  goal: any,
  navigate: any,
  setError: (error: string) => void
) {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    await addDoc(collection(db, "users"), {
      email: email,
      tasks: tasks,
      courses: courses,
      timer: timer,
      goal: goal,
    });

    // Navigate to the Tasks page
    navigate("/Tasks");
  } catch (error: any) {
    console.log("Error signing up: ", error.code);

    // Handle specific error cases
    if (error.code == "auth/weak-password") {
      setError("Password is min 6 characters. Please try again.");
    }
    if (error.code === "auth/email-already-exists") {
      setError("Email already in use. Please try logging in.");
    } else {
      setError("An unexpected error occurred. Please try again.");
    }
  }
}

// Login function
export async function loginUser(
  email: string,
  password: string,
  dispatch: any,
  navigate: any,
  setError: (error: string) => void
) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
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
    // Navigate to the Tasks page
    navigate("/Tasks");
  } catch (error: any) {
    // Handle specific error cases
    if (error.code === "auth/invalid-credential") {
      setError("Invalid email or password. Please try again.");
    } else {
      setError("An unexpected error occurred. Please try again.");
    }
  }
}
