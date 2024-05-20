import React, { useContext, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        { email, role, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setEmail("");
      setPassword("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthorized) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <section
        style={{
          background:
            "radial-gradient(circle, rgba(192,228,234,1) 7%, rgba(230,77,246,1) 90%)",
          height: "100vh",
          padding: "0px 20px 20px 20px",
        }}
      >
        <div className="header">
          <h3 style={{ margin: "0px", padding: "0px" }}>
            Login to your account
          </h3>
        </div>
        <div
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
            borderRadius: "10px",
            height: "85vh",
            overflow: "hidden",
            marginTop: "13px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div className="authPage">
            <div className="container">
              <form>
                <div className="inputTag" style={{ height: "80px" }}>
                  <label>Login As</label>
                  <div>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      style={{
                        borderBottomLeftRadius: "0px",
                        borderBottomRightRadius: "0px",
                        borderTopRightRadius: "0px",
                      }}
                    >
                      <option value="">Select Role</option>
                      <option value="admin">Admin</option>
                      <option value="teacher">Teacher</option>
                    </select>
                    <FaRegUser />
                  </div>
                </div>
                <div className="inputTag" style={{ height: "80px" }}>
                  <label>Email Address</label>
                  <div>
                    <input
                      style={{
                        borderBottomLeftRadius: "0px",
                        borderBottomRightRadius: "0px",
                        borderTopRightRadius: "0px",
                      }}
                      type="email"
                      placeholder="zk@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <MdOutlineMailOutline />
                  </div>
                </div>
                <div className="inputTag" style={{ height: "80px" }}>
                  <label>Password</label>
                  <div>
                    <input
                      type="password"
                      placeholder="Your Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                      style={{
                        borderBottomLeftRadius: "0px",
                        borderBottomRightRadius: "0px",
                        borderTopRightRadius: "0px",
                      }}
                    />
                    <RiLock2Fill />
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <button type="submit" onClick={handleLogin}>
                    Login
                  </button>
                </div>
                <Link to={"/register"}>Register Now</Link>
              </form>
            </div>
            <div className="banner">
              <img src="/Slider-6.jpg" alt="a lovely kiss in the night" />
              <img src="/Slider-7.jpg" alt="a women inside a car" />
              <img src="/Slider-8.png" alt="a baby" />
              <img src="/Slider-9.png" alt="a girl in the forest" />
              <img src="/Slider-10.jpg" alt="a girl" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
