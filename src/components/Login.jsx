import { useState, useRef } from "react";
import { useDispatch } from "react-redux";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";

import { checkValidData } from "../utils/validate";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);
  const username = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const [errorMessage, setErrorMessage] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    if (!isLogin) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log("Signed up");
          console.log(user);

          auth.currentUser;
          updateProfile(auth.currentUser, {
            displayName: username.current.value,
            photoURL:
              "https://occ-0-2590-2186.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABTZ2zlLdBVC05fsd2YQAR43J6vB1NAUBOOrxt7oaFATxMhtdzlNZ846H3D8TZzooe2-FT853YVYs8p001KVFYopWi4D4NXM.png?r=229",
          })
            .then(() => {
              // Profile updated!
              dispatch(
                addUser({
                  uid: user.uid,
                  displayName: user.displayName,
                  email: user.email,
                  photoURL: user.photoURL,
                })
              );
            })
            .catch((error) => {
              setErrorMessage(error.code + "-" + error.message);
            });
        })
        .catch((error) => {
          setErrorMessage(error.code + "-" + error.message);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // console.log("Logged in");
          console.log(user);
          dispatch(
            addUser({
              uid: user.uid,
              displayName: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
            })
          );
        })
        .catch((error) => {
          setErrorMessage(error.code + "-" + error.message);
        });
    }
  }

  function handleGoogleLogin() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        dispatch(
          addUser({
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          })
        );
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  return (
    <div
      className="bg-gray-900 text-white p-6 rounded-lg w-96 shadow-lg mx-auto"
      onSubmit={(e) => handleSubmit(e)}
    >
      <h2 className="text-2xl font-bold text-center">
        {isLogin ? "Log In" : "Sign Up"}
      </h2>
      <form className="mt-6">
        {!isLogin && (
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 rounded bg-gray-800 border border-gray-700 mb-3"
            ref={username}
          />
        )}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 rounded bg-gray-800 border border-gray-700 mb-1"
          ref={email}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 rounded bg-gray-800 border border-gray-700 mt-3"
          ref={password}
        />
        <p className="text-red-500 text-sm mb-2">{errorMessage}</p>
        <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded mt-4">
          Sign Up
        </button>
      </form>
      <p className="text-center text-gray-400 mt-4 text-sm">OR</p>
      <button
        className="w-full bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 rounded flex items-center justify-center mt-3"
        onClick={handleGoogleLogin}
      >
        Continue with Google
      </button>
      <p
        className="text-center text-gray-400 mt-4 text-sm"
        onClick={() => setIsLogin(!isLogin)}
      >
        <div className="cursor-pointer hover:underline">
          {isLogin
            ? "Already have an account? Log In"
            : "New? Sign up - and start playing chess!"}
        </div>
      </p>
    </div>
  );
};
export default Login;
