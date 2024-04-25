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
      console.log("No user logged in");
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
  navigate: any
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
    // Navigate to the Tasks page
    navigate("/Tasks");
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
  } catch (e) {
    console.error("Error logging in user: ", e);
    throw e; // Re-throw the error for handling in the component
  }
}
