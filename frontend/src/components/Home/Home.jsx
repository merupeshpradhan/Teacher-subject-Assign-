import React from "react";
import { useContext } from "react";
import { Context } from "../../main";
import { Navigate } from "react-router-dom";

import AdminDashboard from "./AdminDashboard";
import TeacherDashboard from "./TeacherDashboard";

function Home() {
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  if (!isAuthorized) {
    return <Navigate to={"/login"} />;
  }
  return (
    <>
      <section className="homePage page">
        {user && user.role === "admin" ? (
          <AdminDashboard />
        ) : (
          <TeacherDashboard />
        )}
      </section>
    </>
  );
}

export default Home;
