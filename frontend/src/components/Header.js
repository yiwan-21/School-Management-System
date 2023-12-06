import "./Header.css";
// import avatar from '../../assets/avatar.svg'
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import logo from "../images/logo-scholly.png";

const Navbar = ({ sidebarOpen, openSidebar }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userCred } = userLogin;
  return (
    <nav className="navbar bg-white border-b-2 shadow-md">
      <Sidebar />

      <p className="flex items-center font-bold">
        <img src={logo} alt="logo" className="w-9 h-9 mr-4" />
        Scholly
      </p>

      <div className="navbar__right">
        <span className="loggedinas">
          <img src={userCred && userCred.image} alt="sdf" />
          {/* <p>{userCred && userCred.name}</p> */}
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
