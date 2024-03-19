// Router import
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// components import
import Home from "./components/home";
import MyTrip from "./components/mytrip";
import PlanTrip from "./components/plantrip";
import Auth from "./components/auth";
import NavBar from "./components/navbar";
// Css import
import "./App.css";
// Redux imports
import { useDispatch, useSelector } from "react-redux";
// hooks imports
import { useEffect } from "react";
// firebase imports
import { travelAuth } from "./utils/firebase";
import { setLoading, signinUser } from "./features/userSlice";

const App = () => {
  const user = useSelector((state) => state.data.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    travelAuth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          signinUser({
            uid: authUser.uid,
            username: authUser.displayName,
            email: authUser.email,
          })
        );
        dispatch(setLoading(false));
      } else {
        console.log("User is not logged in");
      }
    });
  }, [dispatch]);

  return (
    <main>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/mytrip" element={<MyTrip />} />
          <Route path="/plantrip" element={<PlanTrip />} />
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Router>
    </main>
  );
};

export default App;
