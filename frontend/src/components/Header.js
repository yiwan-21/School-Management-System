import "./Header.css";
// import avatar from '../../assets/avatar.svg'
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import logo from "../images/logo-scholly.png";
import { logout } from "../actions/userActions";
import { TbLogout } from "react-icons/tb";

const Navbar = ({ sidebarOpen, openSidebar }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userCred } = userLogin;
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <nav className="navbar bg-white border-b-2 shadow-md">
      <Sidebar />

      <Link to="/">
        <p className="flex items-center font-bold">
          <img src={logo} alt="logo" className="w-9 h-9 mr-4" />
          Scholly
        </p>
      </Link>

      <Link
        to="/login"
        className="navbar__right"
        onClick={() => logoutHandler()}
      >
        <TbLogout className="cursor-pointer" size={25} />
      </Link>
    </nav>
  );
};

export default Navbar;
