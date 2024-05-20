import React,{useContext} from "react";
import {Context} from "../../main"
import { Link, useNavigate } from "react-router-dom";


function Card({ title, subtitle,IconComponent, teacherCount, path,bgcolor }) {

  const cardStyle = {
    backgroundColor: bgcolor,
  };

  
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(path);
  };
  return (
    <>
      <div className="cards" style={cardStyle}>
        <div className="header">
          <h4>{title}</h4>
        </div>
        <div className="card">
          <div className="icon">
            {IconComponent && <IconComponent className="card-icon" />}
          </div>
          <div className="middle">
            <div className="detials">
              
              {user && user.role === "admin" ? (
                <p
                style={{
                  textAlign: "center",
                  marginBottom: "5px",
                  fontSize: "20px",
                  background: "none",
                }}
              >
                {subtitle} : {teacherCount}
              </p>
              ):(
                <p
                style={{
                  textAlign: "center",
                  marginBottom: "5px",
                  fontSize: "20px",
                  background: "none",
                }}
              >
                {subtitle}
              </p>
              )}
            </div>
          </div>
        </div>
        <p onClick={handleClick}>View Detials</p>
      </div>
    </>
  );
}

export default Card;
