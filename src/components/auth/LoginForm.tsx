import classes from "./LoginForm.module.css";
import { IconMail, IconPassword } from "@tabler/icons-react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { signUpUser, loginUser } from "./AuthUtils";
import { useNavigate } from "react-router-dom";


const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tasks = useSelector((state: RootState) => state.tasks);
  const courses = useSelector((state: RootState) => state.courses);
  const timer = useSelector((state: RootState) => state.timer);
  const goal = useSelector((state: RootState) => state.goal);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (isLogin) {
        await loginUser(email, password, dispatch, navigate);
      } else {
        await signUpUser(email, password, tasks, courses, timer, goal);
      }
    } catch (error) {
      // Handle authentication errors here
      console.error("Authentication error: ", error);
    }
  };

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <form className={classes.form} onSubmit={handleAuth}>
      <label className={classes.header}>
        {isLogin ? "Login" : "Create an Account"}
      </label>
      <div className={classes.control}>
        <IconMail />
        <input
          placeholder=" Enter Your Email"
          type="email"
          id="email"
          required
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div className={classes.control}>
        <IconPassword />
        <input
          placeholder=" Password (min. 6 characters)"
          type="password"
          id="password"
          required
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div>
        <button type="submit" className={classes.login}>
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </div>
      <div className={classes.register}>
        <label>
          {isLogin ? "Don't have an account yet? " : "Already have an account?"}
        </label>
        <button type="button" onClick={switchAuthModeHandler}>
          {isLogin ? "Sign Up" : "Log In"}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
