import React, { useState } from "react";
import Authentication from "./Authentication/Authentication";
import OtherStep from "./OtherSteps/OtherStep";
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
          <OtherStep />
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
