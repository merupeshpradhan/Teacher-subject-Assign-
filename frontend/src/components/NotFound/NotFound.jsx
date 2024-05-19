import React from "react";
import { Link } from "react-router-dom";
import notfound from "../../../public/notfound.png"

const NotFound = () => {
  return (
    <section className="page notfound">
      <div className="content">
        <img src={notfound} alt="not found" />
        <Link to={"/"}>RETURN TO HOME</Link>
      </div>
    </section>
  );
};

export default NotFound;
