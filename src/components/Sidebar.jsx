import { useEffect } from "react";
import logo from "../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice";
import { auth } from "../utils/firebase";


const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
      useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            dispatch(
              addUser({
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                photoURL: user?.photoURL,
              })
            );
            navigate("/play");
            console.log("Observed called. signed in");
          } else {
            // User is signed out
            navigate("/");
            dispatch(removeUser());
            console.log("Observer called. signed out");
          }
        });
        return () => unsubscribe();
      }, [dispatch, navigate]);

      function handleSignOut() {
        signOut(auth)
          .then(() => {
            console.log("Sign out button clicked");
          })
          .catch((error) => {
            // An error happened.
            console.log(error);
          });
      }
      const user = useSelector((state) => state.user);
  return (
    <div className="h-screen absolute left-0 px-2 flex flex-col bg-[rgb(38,37,34)] text-white">
        <img src={logo} alt="logo" className="w-32"/>
        {!user && (<><button className="bg-[rgb(136,176,88)] my-2 mx-2 px-3 py-2 rounded-lg hover:cursor-pointer">Sign Up</button>
        <button className="bg-[rgb(59,58,56)] my-2 mx-2 px-3 py-2 rounded-lg hover:cursor-pointer">Log In</button></>)}
        {user && <button className="bg-[rgb(59,58,56)] my-2 mx-2 px-3 py-2 rounded-lg hover:cursor-pointer" onClick={handleSignOut}>Sign Out</button>}
    </div>
  )
}

export default Sidebar