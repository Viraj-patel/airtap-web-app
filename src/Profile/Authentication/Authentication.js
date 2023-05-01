import _ from "lodash";
import React, { useState, useEffect } from "react";
import { API_URL, CHECK_LOGIN,CHECK_NEW_LOGIN } from "../../constants/constants";
import "./Authentication.css";
import axios from "axios";

function Authentication({ updateAuthentication }) {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  const checkLoginDetails = async () => {
    console.log(userId, password);
    axios
      .post(API_URL + CHECK_NEW_LOGIN, { email_id: userId, password })
      .then((res) => {
       
        if (_.size(res.data) > 0) {
          updateAuthentication();
          localStorage.setItem("id", userId);
        } else {
          setUserId("");
          setPassword("");
          setShowError(true);
        }
      })
      .catch((err) => {});
  };

  return (
    <form  onSubmit={(e) => {
      e.preventDefault();
      checkLoginDetails();
    }}>
    <div className="AuthenticationContainer">
      <div className="titleContainer">AIRIN TO YOUR PROFILE</div>
      
        
        <div className="detailsContainer">
        <div className="inputContainer">
          <div className="inputTitle">EMAIL ID</div>
          <input
            type="text"
            className="inputBox"
            placeholder="Enter User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        <div className="inputContainer">
          <div className="inputTitle">PIN</div>
          <input
            type="password"
            className="inputBox"
            placeholder="Enter PIN"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="buttonParent">
          <button
            className="loginButtonContainer"
            type="submit"
           
          >
            AIRIN
          </button>
        </div>
        {showError && <div> Invalid user id or password</div>}
      </div>
      
    </div>
    </form>
  );
}

export default Authentication;
