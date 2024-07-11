import Logo from "../Logo/Logo";

import FilledButton from "../Buttons/FilledButton/FilledButton";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const links = (
    <>
      <li>
        <NavLink to={"/"}> Home </NavLink>
      </li>
    </>
  );
  const location = useLocation();
  const contextData = useContext(AuthContext);
  if (!contextData) {
    alert("AuthContext is null or undifined");
    return;
  }
  const { user, logout } = contextData;
  return (
    <div
      className={`navbar ${
        location.pathname.includes("dashboard") ? "" : "absolute top-0"
      }`}
    >
      <div className="container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {links}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl h-10">
            <Logo />
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end flex">
          {user ? (
            <div className="dropdown">
              {/* -------Profile section------ */}
              {/* Clickable button */}
              <div tabIndex={0} role="button" className="m-1">
                <div className="avatar">
                  <div className="w-12 mask mask-squircle">
                    <img
                      src={
                        user?.photoURL
                          ? user?.photoURL
                          : "https://img.icons8.com/?size=256w&id=7819&format=png&color=FA5252"
                      }
                    />
                  </div>
                </div>
              </div>
              {/* Menu List */}
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-0 -left-[100px] rounded-md overflow-hidden w-40 bg-gray-300 *:font-medium"
              >
                <p className="px-4 py-2 text-lg text-net-red font-semibold uppercase">
                  {user?.displayName}
                </p>
                <li className="border-y border-net-red/30 text-net-red hover:bg-net-red hover:text-white">
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li className="text-net-red hover:bg-net-red hover:text-white">
                  <button onClick={logout}>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to={"/login"}>
              <FilledButton text="Login" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
