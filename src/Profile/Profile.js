import React, { useState } from "react";
import Authentication from "./Authentication/Authentication";
import OtherStep from "./OtherSteps/OtherStep";
import EditProfile from "../EditProfile/EditProfile";
import "./Profile.css";

function Profile() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const updateAuthentication = () => {
    setIsAuthenticated(true);
  };
  return (
    <div className="editProfileContainer">
      <div>
        {!isAuthenticated ? (
          <Authentication updateAuthentication={updateAuthentication} />
        ) : (
          <EditProfile />
        )}
      </div>
      <div className="logoContainer">
        <img
          src={require("../assets/Icons/logo.png")}
          alt="logo"
          height={"50px"}
        />
      </div>
    </div>
  );
}

export default Profile;
