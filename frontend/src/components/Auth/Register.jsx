import React, { useContext, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { FaPencilAlt } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/register",
        { name, phone, email, role, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
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
            "radial-gradient(circle, rgba(255,173,84,1) 16%, rgba(255,175,84,1) 24%, rgba(255,216,84,1) 59%, rgba(255,250,84,1) 81%)",
          height: "100vh",
          padding: "0px 20px 20px 20px",
        }}
      >
        <div className="header">
          <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
            <h3 style={{ margin: "0px", padding: "0px" }}>
              Create Your Account
            </h3>
          </div>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",width:"70%"}}>
            <h1 style={{fontWeight:"900",color:"#ff0000c7",textDecoration:"underline"}}>Smart Subject Assign System</h1>
          </div>
        </div>
        <div
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
            borderRadius: "10px",
            // height: "85vh",
            overflow: "hidden",
            marginTop: "13px",
          }}
        >
          <div className="authPage">
            <div className="container" style={{padding:"20px"}}>
              <form>
                <div className="inputTag">
                  <label>Register As</label>
                  <div>
                    <select
                      style={{
                        borderBottomLeftRadius: "0px",
                        borderBottomRightRadius: "0px",
                        borderTopRightRadius: "0px",
                      }}
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="">Select Role</option>
                      <option value="admin">Admin</option>
                      <option value="teacher">Teacher</option>
                    </select>
                    <FaRegUser />
                  </div>
                </div>
                <div className="inputTag">
                  <label>Name</label>
                  <div>
                    <input
                      style={{
                        borderBottomLeftRadius: "0px",
                        borderBottomRightRadius: "0px",
                        borderTopRightRadius: "0px",
                      }}
                      type="text"
                      placeholder="Zeeshan"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <FaPencilAlt />
                  </div>
                </div>
                <div className="inputTag">
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
                <div className="inputTag">
                  <label>Phone Number</label>
                  <div>
                    <input
                      style={{
                        borderBottomLeftRadius: "0px",
                        borderBottomRightRadius: "0px",
                        borderTopRightRadius: "0px",
                      }}
                      type="number"
                      placeholder="12345678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <FaPhoneFlip />
                  </div>
                </div>
                <div className="inputTag">
                  <label>Password</label>
                  <div>
                    <input
                      style={{
                        borderBottomLeftRadius: "0px",
                        borderBottomRightRadius: "0px",
                        borderTopRightRadius: "0px",
                      }}
                      type="password"
                      placeholder="Your Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                    />
                    <RiLock2Fill />
                  </div>
                </div>
                <div style={{display:"flex" ,alignItems:"center",justifyContent:"center"}}>
                  <button type="submit" onClick={handleRegister}>
                    Register
                  </button>
                </div>
                <Link style={{marginTop:"0px"}} to={"/login"}>Login Now</Link>
              </form>
            </div>
            <div className="banner">
              <img src="/Slider-1.png" alt="a lovely kiss in the night" />
              <img src="/Slider-2.png" alt="a women inside a car" />
              <img src="/Slider-3.jpg" alt="a baby" />
              <img src="/Slider-4.jpg" alt="a girl in the forest" />
              <img src="/Slider-5.jpg" alt="a girl" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
