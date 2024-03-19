// Import link to use navigate to page
import { Link } from "react-router-dom";
// redux imports 
import { useDispatch, useSelector } from "react-redux";
// firebase import 
import { travelAuth } from "../utils/firebase";
import { signinUser } from "../features/userSlice";
import { signOut } from "firebase/auth";
// logo import
import logo from "../assets/images/logo.png"


const NavBar = () => {
  const user = useSelector((state) => state.data.signinUser);
  const dispatch = useDispatch();

  const handleLogout =()=>{
    dispatch(signinUser())
    signOut(travelAuth)
  }

  return (
    <main id="navbar" className="flex items-center justify-between w-full h-20 bg-slate-800 p-8">
      <div className="flex items-center justify-center">
        <img
          src={logo}
          alt="Travel Logo"
          className="flex items-center justify-center h-[4rem]"
        />
      </div>
      <div>
        <ul id="navbar-content" className="flex items-center justify-center gap-6 text-white text-xl font-mono">
          <li className="flex items-center justify-center py-1.5 px-3.5 rounded-lg">
            <Link to="/">Home</Link>
          </li>
          <li className="flex items-center justify-center py-1.5 px-3.5 rounded-lg">
            <Link to="/mytrip">My Trips</Link>
          </li>
          <li className="flex items-center justify-center py-1.5 px-3.5 rounded-lg">
            <Link to="/plantrip">Plan Trip</Link>
          </li>
          <li className="flex items-center justify-center py-1.5 px-3.5 rounded-lg">
            <Link to="/auth">Log in</Link>
          </li>
        </ul>
      </div>
    </main>
  );
};

export default NavBar;
