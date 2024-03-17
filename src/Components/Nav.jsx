import React from "react";
import { UserAuth } from "../context/AuthContext";

const Nav = () => {
  const { currentUser, logout } = UserAuth();
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="navbar bg-primary text-primary-content">
      <div className=" container flex justify-between">
        <a className="btn btn-ghost text-xl">Strapi ChatRoom</a>
        {currentUser ? <button onClick={handleLogout}>Logout</button> : ""}
      </div>
    </div>
  );
};

export default Nav;
