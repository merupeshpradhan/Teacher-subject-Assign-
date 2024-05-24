import React, { useContext, useEffect, useState, useRef } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { CgMenu } from "react-icons/cg";
import { BiMenuAltRight } from "react-icons/bi";
import { CgMenuMotion } from "react-icons/cg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();
  const navbarRef = useRef(null);

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message), setIsAuthorized(true);
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navbarRef]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav
        ref={navbarRef}
        className={isAuthorized ? "navbarShow" : "navbarHide"}
      >
        <div className="logo">
          <div style={{ cursor: "pointer", fontWeight: "600" }}>
            <Link style={{textDecoration:"none"}} to={"/"}>ASAS</Link>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              fontSize: "32px",
            }}
            onClick={toggleSidebar}
          >
            {isOpen ? <CgMenuMotion /> : <BiMenuAltRight />}
          </div>
        </div>
        <div className="container">
          <button onClick={handleLogout}>LOGOUT</button>
        </div>
      </nav>
      <section
        ref={navbarRef}
        className={`sidebar ${isOpen ? "sidebarOpen" : "sidebarClose"} ${
          isAuthorized ? "navbarShow" : "navbarHide"
        }`}
      >
        <ul className={`nav-list ${isOpen ? "listShow" : "listHidden"}`}>
          {user && user.role === "admin" ? (
            <>
              <li style={{ marginBottom: "30px" }}>
                <Link to={"/"} onClick={() => setShow(false)}>
                  <i className="bx bx-grid-alt"></i>
                  <span className="links_name">Dashboard</span>
                </Link>
              </li>
              <li style={{ marginBottom: "30px" }}>
                <Link to={"/admin/courses"} onClick={() => setShow(false)}>
                  <i className="bx bxs-book-reader"></i>
                  <span className="links_name">Courses</span>
                </Link>
              </li>
              <li style={{ marginBottom: "30px" }}>
                <Link to={"/admin/subjects"} onClick={() => setShow(false)}>
                  <i className="bx bxs-book"></i>
                  <span className="links_name">Subject</span>
                </Link>
              </li>
              <li style={{ marginBottom: "30px" }}>
                <Link to={"/admin/allocation"} onClick={() => setShow(false)}>
                  <i className="bx bxs-layer-plus"></i>
                  <span className="links_name">Subject Allocation</span>
                </Link>
              </li>
              <li style={{ marginBottom: "30px" }}>
                <Link to={"/admin/teachers"} onClick={() => setShow(false)}>
                  <i className="bx bxs-user-detail bx-flip-horizontal"></i>
                  <span className="links_name">Teachers</span>
                </Link>
              </li>
            </>
          ) : (
            <></>
          )}
          {user && user.role == "teacher" ? (
            <>
              <li style={{ marginBottom: "30px", marginTop: "20px" }}>
                <Link to={"/"} onClick={() => setShow(false)}>
                  <i className="bx bx-grid-alt"></i>
                  <span className="links_name">Dashboard</span>
                </Link>
              </li>
              <li style={{ marginBottom: "30px" }}>
                <Link to={"/teacher/preference"} onClick={() => setShow(false)}>
                  <i className="bx bx-user"></i>
                  <span className="links_name">Preference subject</span>
                </Link>
              </li>
              <li style={{ marginBottom: "30px" }}>
                <Link to={"/teacher/classes"} onClick={() => setShow(false)}>
                  <i className="bx bx-user"></i>
                  <span className="links_name">Classes</span>
                </Link>
              </li>
              <li style={{ marginBottom: "30px" }}>
                <Link to={"/teacher/Detials"} onClick={() => setShow(false)}>
                  <i className="bx bx-user"></i>
                  <span className="links_name">Teacher Details</span>
                </Link>
              </li>
            </>
          ) : (
            <></>
          )}
        </ul>
      </section>
    </>
  );
};

export default Navbar;
