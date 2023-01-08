import { FormEvent, useEffect, useState } from "react";
import { FaExclamation } from "react-icons/fa";
import axios from "axios";
import "./pages.css";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
type user = {
  name: string;
  email: string;
  password: any;
};
type validation = {
  name: any;
  email: any;
  password: any;
};
const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

const LoginPage = () => {
  const [isSignIn, setIsSignIn] = useState(false);
  let [user, setUser] = useState<user>({
    name: "",
    email: "",
    password: "",
  });
  const [isValid, setIsValid] = useState<validation>({
    name: null,
    email: null,
    password: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      setIsSignIn(true);
      setUser({
        name: "",
        email: "",
        password: "",
      });
      setIsValid({
        name: null,
        email: null,
        password: null,
      });
    };
  }, []);

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let response: any = {};
    let reqOptions: any = {
      url: "",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(user),
    };

    setIsValid((prev) => ({
      ...prev,
      name: user.name.length >= 6,
      email: emailRegex.test(user.email),
      password: user.password.length >= 8,
    }));

    const validlogin = isSignIn && isValid.email && isValid.password;
    const validSignin =
      !isSignIn && isValid.name && isValid.email && isValid.password;

    if (validlogin) {
      reqOptions.url = "http://localhost:3000/login";
      response = await axios.request(reqOptions);
    }
    if (validSignin) {
      reqOptions.url = "http://localhost:3000/signin";
      response = await axios.request(reqOptions);
    }

    if (response.data && isSignIn) {
      // AFTER LOGIN
      const userData = response.data.data;
      localStorage?.setItem("userdata", JSON.stringify(userData));

      navigate(
        userData.role === 0
          ? `/user/${userData.user_id}`
          : userData.role === 1
          ? "/admin"
          : userData.role === null
          ? "/role"
          : ""
      );
      toast.success("Logged in succesfully");
    } else if (response.data && !isSignIn) {
      // AFTER SIGNUP
      setIsSignIn((prev) => !prev);
      toast.success("Account created succesfully");
    } else {
      // toast.error("Enter valid data");
    }
  };
  const signIn = () => {
    setIsSignIn((prev) => !prev);
    setUser({ name: "", email: "", password: "" });
    setIsValid({
      name: null,
      email: null,
      password: null,
    });
  };

  return (
    <div className="login">
      <form className="login-form" onSubmit={(e) => onSubmitHandler(e)}>
        <header className="create-account">
          <figure>
            <img src={logo} alt="logo" />
          </figure>
          {isSignIn ? (
            <>
              <h1>Welcome back</h1>
              <p>
                Dont have an account? <span onClick={signIn}>Register</span>
              </p>
            </>
          ) : (
            <>
              <h1>Create account</h1>
              <p>
                Already have an account? <span onClick={signIn}>Sign in</span>
              </p>
            </>
          )}
        </header>
        <section>
          {!isSignIn ? (
            <div className="input-box">
              <label htmlFor="name">Username</label>
              <input
                type="text"
                name="name"
                placeholder="username"
                value={user.name}
                onChange={(e) => {
                  setUser({ ...user, name: e.target.value });
                }}
              />
              {isValid.name === false ? (
                <span>
                  <FaExclamation />
                  Minimum 6 character required
                </span>
              ) : (
                ""
              )}
            </div>
          ) : null}
          <div className="input-box">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              placeholder="email"
              value={user.email}
              onChange={(e) => {
                setUser({ ...user, email: e.target.value });
              }}
            />
            {isValid.email === false ? (
              <span>
                <FaExclamation />
                Enter valid email
              </span>
            ) : (
              ""
            )}
          </div>
          <div className="input-box">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="password"
              value={user.password}
              onChange={(e) => {
                setUser({ ...user, password: e.target.value });
              }}
            />
            {isValid.password === false ? (
              <span>
                <FaExclamation />
                Minimum 8 character required
              </span>
            ) : (
              ""
            )}
          </div>
          <div className="btn-box">
            <button type="submit">
              {isSignIn ? "Login" : "Create Account"}
            </button>
          </div>
        </section>
      </form>
    </div>
  );
};

export default LoginPage;
