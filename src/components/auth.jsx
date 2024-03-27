// Hooks import
import { useState } from "react";
// Icons import
import { FcGoogle } from "react-icons/fc";
// firebase imports
import {
  signInWithGooglePopUp,
  createUserDocumentFromAuth,
  createAuthUserWithEmailAndPassword,
  travelAuth,
} from "../utils/firebase";
// signup, and signin imports
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail
} from "firebase/auth";
// redux imports
import { useDispatch } from "react-redux";
import { signinUser, setLoading } from "../features/userSlice";
// navigation 
import { useNavigate } from "react-router";

const defaultFormFields = {
  email: "",
  password: "",
};

// onclick function
const signInWithGoogle = async (e) => {
  e.preventDefault();
  const { user } = await signInWithGooglePopUp();
  const userDocRef = await createUserDocumentFromAuth(user);
  console.log(user.email, user.displayName, user.uid);
  getUserProfileInfoFromFirestore(uid);
};

const SignInForm = () => {
  const { formFields, setFormFields } = useState(defaultFormFields);
  const { email, password } = formFields;

  // const submitHandler = async (e) => {
  //   e.preventDefault();
  // };
};

const Auth = () => {
  // toggle state for signin and signup
  const [activeTab, setActiveTab] = useState("sign-up");

  const dispatch = useDispatch();

  const navigate = useNavigate()

  // usestate for login
  const [signinEmail, setSigninEmail] = useState("");
  const [signinPassword, setSigninPassword] = useState("");

  // function for signin
  const handleSignIn = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));

    try {
      const { user } = await signInWithEmailAndPassword(travelAuth, signinEmail, signinPassword);
      if (user) {
        dispatch(signinUser(user));
        alert("Signed in successfully!");
        setSigninEmail("");
        setSigninPassword("");
      }
      navigate("/plantrip");
    } catch (error) {
      console.error("Error occurred while signing in:", error);
      alert("Email or password might be wrong.");
    } {
      dispatch(setLoading(false));
    }
  };


  // usestate for signup
  const [signupUsername, setSignupUsername] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");


  // function for signup
  const handleSignUp = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const userCredential = await createAuthUserWithEmailAndPassword(signupEmail, signupPassword);
      const user = userCredential.user;

      await updateProfile(user, { displayName: signupUsername });
      await createUserDocumentFromAuth(user);

      dispatch(signinUser(user));
      console.log("Sign up successful!");
      alert("Signup successful")
      setSignupUsername("");
      setSignupEmail("");
      setSignupPassword("");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        console.log(error);
        alert("The email address is already in use. Please sign in or use a different email.");
      } 
      else if(error.code === "auth/weak-password"){
        console.error("Error occurred while signing up:", error);
        alert("password should be strong and it should be more than 6 characters.");
      }
      else
        {
        console.error("Error occurred while signing up:", error);
        alert("Error occurred while signing up. Please try again.");
      }
    } {
      dispatch(setLoading(false));
    }
  };

  
// toggle function
  const handleTabToggle = () => {
    setActiveTab(activeTab === "sign-up" ? "sign-in" : "sign-up");
  };

  return (
    <main className="flex items-center justify-center m-8 bg-white">
      <div className="flex items-center justify-evenly flex-row bg-white rounded-3xl shadow-[0_5px_15px_rgba(0,0,0,0.35)]">
        {/* Start of signup form */}
        <div
          className={`flex items-center justify-center ${
            activeTab === "sign-up" ? "" : "hidden"
          }`}
        >
          <form
            // onSubmit={handleSignUp}
            id="signup"
            className="flex items-center justify-center flex-col gap-8 w-[23rem]"
          >
            <h1 className="animate__animated animate__zoomIn text-2xl font-semibold font-mono">
              Create Account
            </h1>
            <input
              onChange={(e) => setSignupUsername(e.target.value)}
              value={signupUsername}
              type="text"
              placeholder="Name"
              id="inputone"
              className="animate__animated animate__zoomIn h-8 w-72 bg-slate-100 p-1 rounded-md font-sans font-medium text-lg outline-none"
            />
            <input
              onChange={(e) => setSignupEmail(e.target.value)}
              value={signupEmail}
              type="email"
              placeholder="Email"
              id="inputtwo"
              className="animate__animated animate__zoomIn h-8 w-72 bg-slate-100 p-1 rounded-md font-sans font-medium text-lg outline-none"
            />
            <input
              onChange={(e) => setSignupPassword(e.target.value)}
              value={signupPassword}
              type="password"
              placeholder="Password"
              id="inputthree"
              className="animate__animated animate__zoomIn h-8 w-72 bg-slate-100 p-1 rounded-md font-sans font-medium text-lg outline-none"
            />
            <button
            onClick={handleSignUp}
              className="animate__animated animate__zoomIn flex items-center justify-center h-10 w-[10rem] bg-purple-500 rounded-md font-sans font-medium text-lg"
            >
              Sign Up
            </button>
            <button
              className="animate__animated animate__zoomIn flex items-center justify-center h-10 w-[10rem] bg-cyan-500 rounded-md font-mono font-medium text-xl"
              onClick={signInWithGoogle}
            >
              <FcGoogle />
            </button>
          </form>
        </div>
        {/* End of signup form */}

        {/* Start of signin form */}
        <div
          className={`flex items-center justify-center ${
            activeTab === "sign-in" ? "" : "hidden"
          }`}
        >
          <form
          // onSubmit={handleSignIn}
            id="signin"
            className="flex items-center justify-center flex-col gap-10 w-[23rem]"
          >
            <h1 className="animate__animated animate__zoomIn text-2xl font-semibold font-mono">
              Sign In
            </h1>
            <input
              onChange={(e) => setSigninEmail(e.target.value)}
              value={signinEmail}
              type="email"
              placeholder="Email"
              id="inputfour"
              className="animate__animated animate__zoomIn h-8 w-72 bg-slate-100 p-1 rounded-md font-sans font-medium text-lg outline-none"
            />
            <input
              onChange={(e) => setSigninPassword(e.target.value)}
              value={signinPassword}
              type="password"
              placeholder="Password"
              id="inputfive"
              className="animate__animated animate__zoomIn h-8 w-72 bg-slate-100 p-1 rounded-md font-sans font-medium text-lg outline-none"
            />
            <button
            onClick={handleSignIn}
              className="animate__animated animate__zoomIn flex items-center justify-center h-10 w-[10rem] bg-fuchsia-500 rounded-md font-sans font-medium text-lg"
            >
              Sign In
            </button>
          </form>
        </div>
        {/* End of signin form */}

        <div>
          <div className="flex items-center justify-center flex-row">
            {/* Start of signin design */}
            <div
              id="signin"
              className={`bg-purple-500 h-[30rem] w-[25rem] rounded-3xl flex justify-center items-center flex-col p-2 gap-4 ${
                activeTab === "sign-in" ? "" : "hidden"
              }`}
            >
              <h1 className="animate__animated animate__zoomIn text-3xl font-semibold font-mono">
                Welcome Back !
              </h1>
              <p className="animate__animated animate__zoomIn text-xl font-small font-mono">
                Enter your personal details to use all site features
              </p>
              <button
                className="animate__animated animate__zoomIn flex items-center justify-center h-10 w-[8rem] bg-transparent rounded-md font-sans font-medium text-lg text-white shadow-[0_5px_15px_rgba(0,0,0,0.35)]"
                onClick={handleTabToggle}
              >
                Sign Up
              </button>
            </div>
            {/* End of signin design */}

            {/* Start of signup design */}
            <div
              id="signup"
              className={`bg-fuchsia-500 h-[30rem] w-[25rem] rounded-3xl flex justify-center items-center flex-col p-2 gap-4 ${
                activeTab === "sign-up" ? "" : "hidden"
              }`}
            >
              <h1 className="animate__animated animate__zoomIn text-3xl font-semibold font-mono">
                Welcome Friend !
              </h1>
              <p className="animate__animated animate__zoomIn text-xl font-small font-mono">
                Enter your personal details to use all site features
              </p>
              <button
                className="animate__animated animate__zoomIn flex items-center justify-center h-10 w-[8rem] bg-transparent rounded-md font-sans font-medium text-lg text-white shadow-[0_5px_15px_rgba(0,0,0,0.35)]"
                onClick={handleTabToggle}
              >
                Sign In
              </button>
            </div>
            {/* End of signup design */}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Auth;
