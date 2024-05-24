import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ImUser } from "react-icons/im";
import { Context } from "../../main";
import "./Admin.css";
import toast from "react-hot-toast";
import { MdOutlineSaveAs } from "react-icons/md";
import { GiCancel } from "react-icons/gi";
import { MdEdit, MdDelete } from "react-icons/md";

function AdminDetials() {
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);

  console.log(user);
  const [editAdminID, setEditAdminID] = useState(null);
  const [editEmail, setEditEmail] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editDob, setEditDob] = useState("");

  const handleEdit = (id, email, phone) => {
    setEditAdminID(id);
    setEditEmail(email);
    setEditPhone(phone);
  };

  const handleCancelEdit = () => {
    setEditAdminID(null);
  };

  const handleSave = async (id) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/v1/user/update/${id}`,
        { email: editEmail, phone: editPhone },
        { withCredentials: true }
      );
      toast.success(response.data.message);
      setEditAdminID(null);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="admin-detials-main">
        <div className="admin-detials-left">
          <div className="admin-image">
            <ImUser style={{ fontSize: "160px", color: "#949294" }} />
          </div>
          <div className="admin-name">
            <h2>{user.name}</h2>
          </div>
        </div>
        <div className="admin-detials-right">
          <div className="admin-personal-detials">
            <div>
              <p>
                <span style={{ fontWeight: "700" }}>Email : </span>
                {editAdminID === user._id ? (
                  <input
                    style={{
                      border: "1px solid",
                      borderColor: "#bacaf3",
                      outlineColor: "#5682f5",
                      color: "#673ab7",
                      padding: "3px",
                    }}
                    type="text"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                  />
                ) : (
                  user.email
                )}
              </p>
            </div>
            <p>
                <span style={{ fontWeight: "700" }}>Phone : </span>
                {editAdminID === user._id ? (
                  <input
                    style={{
                      border: "1px solid",
                      borderColor: "#bacaf3",
                      outlineColor: "#5682f5",
                      color: "#673ab7",
                      padding: "3px",
                    }}
                    type="text"
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                  />
                ) : (
                  user.phone
                )}
              </p>
            <p>
              <span style={{ fontWeight: "600" }}>DOB :</span> 04/06/2001
            </p>
            <p>
              <span style={{ fontWeight: "600" }}>Role : </span>{user.role}
            </p>
            <div>
              {editAdminID === user._id ? (
                <>
                  <div style={{ display: "flex", gap: "5px" }}>
                    <button
                      className="admin-save-btn"
                      onClick={() => handleSave(user._id)}
                    >
                      Save
                    </button>

                    <button className="admin-btn" onClick={handleCancelEdit}>
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <button
                    className="admin-btn"
                    onClick={() => handleEdit(user._id, user.email, user.phone)}
                  >
                    EDIT
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDetials;
