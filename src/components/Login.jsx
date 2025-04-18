import { useState } from "react";
import { useDispatch } from "react-redux";

import { checkValidData } from "../utils/validate";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  async function handleLogin() {
    try {
      const res = await fetch(BASE_URL + "/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      setErrorMessage("");
      dispatch(addUser(res.data));
      navigate("/play");
      // console.clear();

    } catch (e) {
      console.log(e);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const message = checkValidData(email, password, true);
    setErrorMessage(message);
    if (message) return;

    handleLogin();
  }

  return (
    <div
      className="bg-gray-900 text-white p-6 rounded-lg w-96 shadow-lg mx-auto"
      onSubmit={(e) => handleSubmit(e)}
    >
      <h2 className="text-2xl font-bold text-center">
        Log In
      </h2>
      <form className="mt-6">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 rounded bg-gray-800 border border-gray-700 mb-1"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 rounded bg-gray-800 border border-gray-700 mt-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="text-red-500 text-sm mb-2">{errorMessage}</p>
        <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded mt-4">
          Log In
        </button>
      </form>
      <p className="text-center text-gray-400 mt-4 text-sm">OR</p>
      <GoogleLogin
        onSuccess={() =>
          (window.location.href = "http://localhost:3000/auth/google")
        }
        onError={() => console.log("Login Failed")}
      />
      <div
        className="text-center text-gray-400 mt-4 text-sm cursor-pointer hover:underline"
        onClick={() => navigate("/register")}
      >
          New? Sign up - and start playing chess!
      </div>
      {/* <p className="text-center text-gray-400 mt-4 text-sm">OR</p>
      <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded mt-4">
        Play as a Guest
      </button> */}
    </div>
  );
};
export default Login;
