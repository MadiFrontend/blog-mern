import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../../userContext";

function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  const login = async (ev) => {
    ev.preventDefault();
    const response = await fetch("http://localhost:3001/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "content-Type": "application/json" },
      credentials: "include",
    });
    if (response.ok) {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
        setRedirect(true);
      });
    } else {
      alert("Wrong credentials!");
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="flex flex-col justify-center items-center h-[50vh]">
      <h2>Login Form</h2>
      <form className="w-[50%] flex flex-col" onSubmit={login}>
        <input
          className="border rounded p-[10px] my-[10px]"
          type="text"
          placeholder="username"
          name="username"
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
        />
        <input
          className="border rounded p-[10px] my-[10px]"
          type="text"
          placeholder="password"
          name="password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button type="submit" className="bg-green-700 text-white p-3 rounded">
          Login
        </button>
      </form>
      <div className="mt-10">
        <p className="font-light opacity-60">
          don't have an account yet?{" "}
          <Link to="/register" className="font-bold opacity-90">
            Register Now!
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
