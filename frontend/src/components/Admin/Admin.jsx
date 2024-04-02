import React from "react";
import { useContext } from "react";
import { Context } from "../../main";
import { Navigate } from "react-router-dom";

import AdminDashboard from "./AdminDashboard";

function Admin() {
  const { isAuthorized } = useContext(Context);
  if (!isAuthorized) {
    return <Navigate to={"/login"} />;
  }
  return (
    <>
      <section className="adminPage page">
        <AdminDashboard />
      </section>
    </>
  );
}

export default Admin;
