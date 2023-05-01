import React, { useState, useEffect } from "react";
import _ from "lodash";
import classes from "./EditProfile.module.css";
import {
  API_URL,
  UPDATE_COMPANY_DETAILS,
  UPDATE_MOBILE_DETAILS,
  UPDATE_PERSONAL_DETAILS,
  UPDATE_SOCIAL_DETAILS,
  UPLOAD_IMAGE,
  NEW_USER_DETAILS,
} from "../constants/constants";
import axios from "axios";
const template = require("../constants/template.json");

function EditProfile() {
  console.log(template.body, _.flatten(template.body));
  const children = _.flatten(template.body);

  const [profile, setProfile] = useState({});

  useEffect(() => {
    const id = localStorage.getItem("id");
    axios
      .get(API_URL + NEW_USER_DETAILS, { params: { unique_id: id } })
      .then((res) => {
        const data = _.first(res.data);
        console.log(data);
        // setShowLoader(false);
      })
      .catch((err) => {
        // setShowLoader(false);
      });
  }, []);

  return (
    <div className="AuthenticationContainer">
      <div className={classes.title}>Edit profile</div>
      <div className="detailsContainer">
        {_.map(children, (child) => {
          if (child.editOnHide) return;
          console.log(child);
          return (
            <div className="inputContainer">
              <div className={classes.inputTitle}>{child.label}</div>
              {child.edit_type === "file" ? (
                <>
                  <img className="profileImage" alt="img" />
                  <label for="inputTag">
                    <div
                      style={{
                        cursor: "pointer",
                        backgroundColor: "white",
                        color: "black",
                        display: "flex",
                        width: "fit-content",
                        padding: "5px 20px",
                        alignItems: "center",
                      }}
                    >
                      Select image
                    </div>
                    <input
                      id="inputTag"
                      type={child.type}
                      style={{ display: "none" }}
                      placeholder={child.placeholder}
                      //   onChange={saveFile}
                      accept="image/png, image/jpg, image/gif, image/jpeg"
                    />
                  </label>
                </>
              ) : (
                <input
                  type={child.edit_type}
                  className="inputBox"
                  placeholder={child.placeholder}
                  //   value={profile[child.id]}
                  //   onChange={(e) => updateProfile(e, child.id, child.type)}
                />
              )}
            </div>
          );
        })}
        <div className="buttonParent">
          <div
            className="loginButtonContainer"
            // onClick={() => onSave(currentProfileDetails.id)}
          >
            Save
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
