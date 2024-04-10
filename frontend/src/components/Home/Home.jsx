import React from "react";
import { useContext } from "react";
import { Context } from "../../main";
import { Navigate } from "react-router-dom";

import Dashboard from "./Dashboard";

function Home() {
  const { isAuthorized } = useContext(Context);
  if (!isAuthorized) {
    return <Navigate to={"/login"} />;
  }
  return (
    <>
      <section className="homePage page">
        <Dashboard/>
      </section>
    </>
  );
}

export default Home;