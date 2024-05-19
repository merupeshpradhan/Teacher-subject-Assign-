import React,{useContext} from "react";
import Card from "./Card";
import {Context} from "../../main"
import "./DashboardCard.css";
import { PiUserCircleThin } from "react-icons/pi";
import { IoBookSharp } from "react-icons/io5";
import { IoDocumentOutline } from "react-icons/io5";

const TeacherDashboard = () => {
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  return (
    <>
      <div style={{display:"flex",justifyContent:"end",width:"100%"}}>
        <h4
          style={{
            color: "black",
            fontWeight:"600",
            borderBottom:"3px solid #ff68de"
          }}
        >
          Teacher Dashboard
        </h4>
      </div>
      <div className="card-container">
        <Card
          title="Clases"
          subtitle="All Classes"
          IconComponent={PiUserCircleThin}
          path="/admin/teachers"
        />
        <Card
          title="Subject Preference"
          subtitle="Add Subjects"
          IconComponent={PiUserCircleThin}
          path="/admin/teachers"
        />
        <Card
          title="Teacher Profile"
          subtitle={user.email}
          IconComponent={PiUserCircleThin}
          path="/admin/teachers"
        />
      </div>
    </>
  );
};

export default TeacherDashboard;
