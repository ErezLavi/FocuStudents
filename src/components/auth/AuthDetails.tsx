import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { IconUser } from "@tabler/icons-react";
import { auth } from "./firebase";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { authActions } from "../../store/auth-slice";

const AuthDetails: React.FC = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        dispatch(authActions.login());
      } else {
        setUser(null);
        dispatch(authActions.logout());
      }
    });
    return () => {
      listen();
    };
  }, [dispatch]);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out Successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {isLoggedIn && (
        <li>
          <IconUser />
          <button onClick={userSignOut}>Logout</button>
        </li>
      )}
    </>
  );
};

export default AuthDetails;
