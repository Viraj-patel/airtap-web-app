import _ from "lodash";
import React, { useState, useEffect } from "react";
import { API_URL, CHECK_LOGIN } from "../../constants/constants";
import "./Authentication.css";
import axios from "axios";

function Authentication({ updateAuthentication }) {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  const checkLoginDetails = async () => {
    console.log(userId, password);
    axios
      .post(API_URL + CHECK_LOGIN, { id: userId, password })
      .then((res) => {
        console.log(res);
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
    <div className="AuthenticationContainer">
      <div className="titleContainer">AIRIN TO YOUR PROFILE</div>
      <div className="detailsContainer">
        <div className="inputContainer">
          <div className="inputTitle">USER ID</div>
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
          <div
            className="loginButtonContainer"
            onClick={() => {
              checkLoginDetails();
            }}
          >
            AIRIN
          </div>
        </div>
        {showError && <div> Invalid user id or password</div>}
      </div>
    </div>
  );
}

export default Authentication;
