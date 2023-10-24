import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const register = async (ev) => {
    ev.preventDefault();
    const response = await fetch("http://localhost:3001/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "content-Type": "application/json" },
    });
    if (response.status === 200) {
      alert("You succesfully registred!");
    } else {
      alert("we cannot register you! you alredy have an account!");
    }
    console.log(response);
  };

  return (
    <div className="flex flex-col justify-center items-center h-[50vh]">
      <h2>Register Form</h2>
      <form className="w-[50%] flex flex-col" onSubmit={register}>
        <input
          className="border rounded p-[10px] my-[10px]"
          type="text"
          placeholder="username"
          name="username"
          onChange={(ev) => setUsername(ev.target.value)}
        />
        <input
          className="border rounded p-[10px] my-[10px]"
          type="text"
          placeholder="password"
          name="password"
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button type="submit" className="bg-green-700 text-white p-3 rounded">
          Register
        </button>
      </form>
      <div className="mt-10">
        <p className="font-light opacity-60">
          do you have an account?{" "}
          <Link to="/login" className="font-bold opacity-90">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
