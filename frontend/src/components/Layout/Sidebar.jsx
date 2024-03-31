import React, { useContext, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import { LiaBookSolid } from "react-icons/lia";
import axios from "axios";
import toast from "react-hot-toast";
import "./Sidebar.css";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`sidebar ${isOpen ? "open" : ""} ${
        isAuthorized ? "navbarShow" : "sidebarHide"
      }`}
    >
      <div className="logo-details">
        <div className="logo_name">ASAS</div>
        <i
          className={`bx ${isOpen ? "bx-menu-alt-right" : "bx-menu"}`}
          id="btn"
          onClick={toggleSidebar}
        ></i>
      </div>
      <ul className="nav-list">
        {user && user.role === "admin" ? (
          <>
            <li>
              <i className="bx bx-search" onClick={toggleSidebar}></i>
              <input type="text" placeholder="Search..." />
              <span className="tooltip">Search</span>
            </li>
            <li>
              <Link to={"/"} onClick={() => setShow(false)}>
                <i className="bx bx-grid-alt"></i>
                <span className="links_name">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to={"/admin/courses"} onClick={() => setShow(false)}>
              <i className='bx bxs-book-reader'></i>
                <span className="links_name">Courses</span>
              </Link>
            </li>
            <li>
              <Link to={"/admin/subjects"} onClick={() => setShow(false)}>
              <i className='bx bxs-book'></i>
                <span className="links_name">Subject</span>
              </Link>
            </li>
            <li>
              <Link to={"/admin/allocation"} onClick={() => setShow(false)}>
              <i className='bx bxs-layer-plus'></i>
                <span className="links_name">Subject Allocation</span>
              </Link>
            </li>
            <li>
              <Link to={"/admin/teachers"} onClick={() => setShow(false)}>
              <i className='bx bxs-user-detail bx-flip-horizontal' ></i>
                <span className="links_name">Teachers</span>
              </Link>
            </li>
          </>
        ) : (
          <></>
        )}
        {user && user.role == "teacher" ? (
          <>
            <li>
              <i className="bx bx-search" onClick={toggleSidebar}></i>
              <input type="text" placeholder="Search..." />
              <span className="tooltip">Search</span>
            </li>
            <li>
              <Link to={"/teacher/dashboard"} onClick={() => setShow(false)}>
                <i className="bx bx-user"></i>
                <span className="links_name">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to={"/teacher/classes"} onClick={() => setShow(false)}>
                <i className="bx bx-user"></i>
                <span className="links_name">Classes</span>
              </Link>
            </li>
          </>
        ) : (
          <></>
        )}
      </ul>
    </div>
  );
}

export default Sidebar;
