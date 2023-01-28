import React, { useState, useEffect } from "react";
import { profileDetails } from "../profileUtils";
import _ from "lodash";
import {
  API_URL,
  UPDATE_COMPANY_DETAILS,
  UPDATE_MOBILE_DETAILS,
  UPDATE_PERSONAL_DETAILS,
  UPDATE_SOCIAL_DETAILS,
  UPLOAD_IMAGE,
  USER_DETAILS,
} from "../../constants/constants";
import axios from "axios";
import { withRouter } from "react-router-dom";

const steps = ["personal_details", "company_details", "social_details"];

function OtherStep({ history }) {
  const [index, setIndex] = useState(0);

  // const [showLoader, setShowLoader] = useState(true);
  const [profile, setProfile] = useState({
    image: null,
    name: "",
    number: "",
    whatsapp: "",
    company_name: "",
    designation: "",
    emailid: "",
    website: "",
    address: "",
    map: "",
    instagram: "",
    facebook: "",
    youtube: "",
    twitter: "",
    linkedin: "",
  });
  const [file, setFile] = useState();
  const [fileImage, setFileImage] = useState();
  const [fileName, setFileName] = useState("");

  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
    setFileImage(URL.createObjectURL(e.target.files[0]));
  };

  const currentProfileDetails = _.find(profileDetails, { id: steps[index] });

  useEffect(() => {
    const id = localStorage.getItem("id");
    axios
      .get(API_URL + USER_DETAILS, { params: { id } })
      .then((res) => {
        const data = _.first(res.data);
        if (_.isEmpty(_.get(data, "profile_pic", "")))
          setFileImage(API_URL + "default.jpeg");
        else setFileImage(API_URL + _.get(data, "profile_pic", ""));
        setProfile({
          ...profile,
          name: _.get(data, "name", ""),
          number: _.get(data, "number", ""),
          whatsapp: _.get(data, "whatsapp", ""),
          company_name: _.get(data, "company_name", ""),
          designation: _.get(data, "Designation", ""),
          emailid: _.get(data, "emailid", ""),
          website: _.get(data, "website", ""),
          address: _.get(data, "address", ""),
          map: _.get(data, "map", ""),
          instagram: _.get(data, "instagram", ""),
          facebook: _.get(data, "facebook", ""),
          youtube: _.get(data, "youtube", ""),
          twitter: _.get(data, "twitter", ""),
          linkedin: _.get(data, "linkedin", ""),
        });
        // setShowLoader(false);
      })
      .catch((err) => {
        // setShowLoader(false);
      });
  }, []);

  const updateProfile = (event, id, type) => {
    const updatedvalue =
      type === "file" ? event.target.files[0] : event.target.value;
    setProfile({
      ...profile,
      [id]: updatedvalue,
    });
  };

  const onSave = async (step) => {
    if (step === "personal_details") {
      if (file) {
        // const formData = new FormData();
        // console.log(profile.image);
        // formData.append("file", profile.image);
        // formData.append("fileName", profile.image.name);
        // await axios.post(API_URL + UPLOAD_IMAGE, formData);
        // axios
        //   .post(API_URL + UPLOAD_IMAGE, {
        //     id: localStorage.getItem("id"),
        //     ...formData,
        //   })
        //   .then((res) => {});
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);
        formData.append("id", localStorage.getItem("id"));
        try {
          const res = await axios.post(API_URL + UPLOAD_IMAGE, formData);
          console.log(res);
        } catch (ex) {
          console.log(ex);
        }
      }
      if (profile.number !== "") {
        axios
          .post(API_URL + UPDATE_MOBILE_DETAILS, {
            id: localStorage.getItem("id"),
            number: profile.number,
          })
          .then((res) => {});
      }
      axios
        .post(API_URL + UPDATE_PERSONAL_DETAILS, {
          id: localStorage.getItem("id"),
          name: _.get(profile, "name", ""),
          whatsapp: _.get(profile, "whatsapp", ""),
        })
        .then((res) => {});
    } else if (step === "company_details") {
      axios
        .post(API_URL + UPDATE_COMPANY_DETAILS, {
          id: localStorage.getItem("id"),
          company_name: _.get(profile, "company_name", ""),
          designation: _.get(profile, "designation", ""),
          emailid: _.get(profile, "emailid", ""),
          website: _.get(profile, "website", ""),
          address: _.get(profile, "address", ""),
          map: _.get(profile, "map", ""),
        })
        .then((res) => {});
    } else {
      axios
        .post(API_URL + UPDATE_SOCIAL_DETAILS, {
          id: localStorage.getItem("id"),
          instagram: _.get(profile, "instagram", ""),
          facebook: _.get(profile, "facebook", ""),
          youtube: _.get(profile, "youtube", ""),
          twitter: _.get(profile, "twitter", ""),
          linkedin: _.get(profile, "linkedin", ""),
        })
        .then((res) => {});
    }
    if (index !== 2) setIndex(index + 1);
    else {
      history.push(`/profile/${localStorage.getItem("id")}`);
    }
  };

  return (
    <div className="AuthenticationContainer">
      <div className="titleContainer">{currentProfileDetails.title}</div>
      <div className="detailsContainer">
        {_.map(currentProfileDetails.children, (child) => {
          return (
            <div className="inputContainer">
              <div className="inputTitle">{child.title}</div>
              {child.type === "file" ? (
                <>
                  <img src={fileImage} className="profileImage" alt="img" />
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
                      onChange={saveFile}
                      accept="image/png, image/jpg, image/gif, image/jpeg"
                    />
                  </label>
                </>
              ) : (
                <input
                  type={child.type}
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
          {index !== 0 && (
            <div
              className="loginButtonContainer"
              onClick={() => (index !== 0 ? setIndex(index - 1) : null)}
            >
              Back
            </div>
          )}
          <div
            className="loginButtonContainer"
            onClick={() => onSave(currentProfileDetails.id)}
          >
            {index === 2 ? "Save" : "Save and Next"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(OtherStep);
