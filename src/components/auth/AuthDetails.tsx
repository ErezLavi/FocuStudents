import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { IconUser } from "@tabler/icons-react";
import { auth } from "./firebase";

interface AuthDetailsProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const AuthDetails: React.FC<AuthDetailsProps> = ({
  isLoggedIn,
  setIsLoggedIn,
}) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    });
    return () => {
      listen();
    };
  }, [setIsLoggedIn]);

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
