import React,{useContext} from "react";
import Card from "./Card";
import {Context} from "../../main"
import "./DashboardCard.css";
import { GiTeacher } from "react-icons/gi";
import { PiUserCircleThin } from "react-icons/pi";
import { IoBookSharp } from "react-icons/io5";
import { RiContactsFill } from "react-icons/ri";
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
            borderBottom:"3px solid #ff7700fa",
            borderRadius:"5px"
          }}
        >
          Teacher Dashboard
        </h4>
      </div>
      <div className="card-container">
        <Card
          title="Clases"
          subtitle="All Classes"
          IconComponent={GiTeacher}
          path="/teacher/classes"
          bgcolor="#e9bb3a"
        />
        <Card
          title="Subject Preference"
          subtitle="Add Subjects"
          IconComponent={IoDocumentOutline}
          path="/teacher/preference"
          bgcolor="#ea1768"
        />
        <Card
          title="Teacher Profile"
          subtitle={user.name}
          IconComponent={RiContactsFill}
          path="/teacher/profile"
          bgcolor="#2bc1bd"
        />
      </div>
    </>
  );
};

export default TeacherDashboard;
