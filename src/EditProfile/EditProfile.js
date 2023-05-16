import React, { useState, useEffect } from "react";
import _ from "lodash";
import classes from "./EditProfile.module.css";
import {
  API_URL,
  UPDATE_DETAILS,
  UPLOAD_IMAGE,
  NEW_USER_DETAILS,
} from "../constants/constants";
import axios from "axios";
import { withRouter } from "react-router-dom";

function EditProfile({ history }) {
  const [profile, setProfile] = useState({});
  const [children, setChildren] = useState({});

  const saveFile = (event, id, type) => {
    const uploadPreset = "Airtap";
    // Replace 'YOUR_CLOUD_NAME' with your Cloudinary cloud name
    const cloudName = "YOUR_CLOUD_NAME";
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("upload_preset", uploadPreset);

    fetch(`https://api.cloudinary.com/v1_1/dkrlw4xoa/image/upload`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.secure_url);
        setProfile({
          ...profile,
          [id]: data.secure_url,
        });
        // Do something with the uploaded image data
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle error
      });
  };

  const updateProfile = (event, id, type) => {
    const updatedvalue =
      type === "file" ? event.target.files[0] : event.target.value;
    setProfile({
      ...profile,
      [id]: updatedvalue,
    });
  };

  useEffect(() => {
    const id = localStorage.getItem("id");
    axios
      .get(API_URL + NEW_USER_DETAILS, { params: { unique_id: id } })
      .then((res) => {
        const data = res.data;
        const template = JSON.parse(res.data[0].body);
        const profileDetails = _.reduce(
          data,
          (result, val) => {
            result[val.field_id] = val.value != "null" ? val.value : "";
            return result;
          },
          {}
        );

        setChildren(_.flatten(template.body));
        setProfile(profileDetails);
        // setShowLoader(false);
      })
      .catch((err) => {
        console.log(err);
        // setShowLoader(false);
      });
  }, []);

  const onSave = (e) => {
    e.preventDefault();
    axios
      .post(API_URL + UPDATE_DETAILS, {
        unique_id: localStorage.getItem("id"),
        obj: profile,
      })
      .then((res) => {
        history.push(`/${localStorage.getItem("id")}`);
      })
      .catch((err) => {
        console.log(err);
        // setShowLoader(false);
      });
  };

  return (
    <form onSubmit={onSave}>
      <div className="AuthenticationContainer">
        <div className={classes.title}>Edit profile</div>
        <div className="detailsContainer">
          {_.map(children, (child) => {
            if (child.editOnHide) return;
            return (
              <div className="inputContainer">
                <div className={classes.inputTitle}>{child.label}</div>
                {child.edit_type === "file" ? (
                  <>
                    <img
                      className="profileImage"
                      alt="img"
                      src={
                        profile[child.id] ||
                        "https://res.cloudinary.com/dkrlw4xoa/image/upload/v1684260588"
                      }
                    />
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
                        type={"file"}
                        style={{ display: "none" }}
                        placeholder={child.placeholder}
                        onChange={(e) => saveFile(e, child.id, child.type)}
                        accept="image/png, image/jpg, image/gif, image/jpeg"
                      />
                    </label>
                  </>
                ) : (
                  <input
                    type={child.edit_type}
                    className="inputBox"
                    placeholder={child.placeholder}
                    value={profile[child.id]}
                    onChange={(e) => updateProfile(e, child.id, child.type)}
                  />
                )}
              </div>
            );
          })}
          <div className="buttonParent">
            <button type="submit" className="loginButtonContainer">
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default withRouter(EditProfile);
