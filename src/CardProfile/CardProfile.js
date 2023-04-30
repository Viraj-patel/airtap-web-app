import React, { useEffect, useState } from "react";
import "./CardProfile.css";
import { useLocation } from "react-router-dom";
import _ from "lodash";
import { API_URL, USER_DETAILS } from "../constants/constants";
import Loading from "../Loading/Loading.js";

import FileSaver from "file-saver";

import axios from "axios";

const Icon = ({ image, title }) => {
  return (
    <div className="iconsContainer">
      <img src={image} height="40px" alt="img" />
      <div className="iconTitle">{title}</div>
    </div>
  );
};

function CardProfile() {
  const location = useLocation();
  const [profile, setProfile] = useState({});
  const [showLoader, setShowLoader] = useState(true);
  useEffect(() => {
    const id = _.last(location.pathname.split("/"));
    axios
      .get(API_URL + USER_DETAILS, { params: { id } })
      .then((res) => {
        setProfile(_.first(res.data));
        setShowLoader(false);
      })
      .catch((err) => {
        setShowLoader(false);
      });
  }, [location]);

  const downloadVCF = (e) => {
    e.preventDefault();
    var file = new Blob(
      [
        `BEGIN:VCARD
VERSION:3.0
N:${profile.name};${""};;;
FN:${profile.name}
TITLE:${""};
EMAIL;type=INTERNET;type=pref:${profile.emailid}
TEL;type=MAIN:${profile.number}
TEL;type=CELL;type=VOICE;type=pref:${profile.number}
ADR;type=WORK;type=pref:;;;${" "};;;
END:VCARD
`,
      ],
      { type: "text/vcard;charset=utf-8" }
    );
    FileSaver.saveAs(file, `${profile.name}.vcf`, true);
  };

  return showLoader ? (
    <Loading />
  ) : (
    <div className="profileContainer">
      <div className="imageContainer">
        <img
          src={API_URL + profile.profile_pic}
          className="profileImage"
          alt="img"
        />
      </div>
      {profile.name && <div className="profileName">{profile.name}</div>}
      {profile.Designation && (
        <div className="designation">{profile.Designation}</div>
      )}
      {profile.company_name && (
        <div className="companyName">{profile.company_name}</div>
      )}
      <div className="icons">
        {profile.number && (
          <a href={`tel:${profile.number}`} target="_blank" rel="noreferrer">
            <Icon image={require("../assets/Icons/1.png")} title={"CALL"} />
          </a>
        )}
        {profile.whatsapp && (
          <a href={profile.whatsapp} target="_blank" rel="noreferrer">
            <Icon image={require("../assets/Icons/2.png")} title={"WHATSAPP"} />
          </a>
        )}
        {profile.emailid && (
          <a
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${profile.emailid}`}
            target="_blank"
            rel="noreferrer"
          >
            <Icon image={require("../assets/Icons/3.png")} title={"MAIL"} />
          </a>
        )}
        {profile.website && (
          <a href={profile.website} target="_blank" rel="noreferrer">
            <Icon image={require("../assets/Icons/4.png")} title={"WEBSITE"} />
          </a>
        )}
        {profile.map && (
          <a href={profile.map}>
            <Icon image={require("../assets/Icons/5.png")} title={"LOCATION"} />
          </a>
        )}
      </div>
      <div className="outerButton">
        <div
          // href={require("../assets/contact.vcf")}
          // download
          className="buttonContainer"
          rel="noreferrer"
          onClick={downloadVCF}
        >
          <img
            src={require("../assets/Icons/6.png")}
            height={"30px"}
            alt="img"
          />
          <div className="contactTitle">ADD TO CONTACT</div>
        </div>
        <div className={"docContainer"}>
          {profile.documents && (
            <a
              href={profile.documents}
              target="_blank"
              rel="noreferrer"
              className="buttonLink"
            >
              BROCHURE
            </a>
          )}
          {profile.price && (
            <a
              href={profile.price}
              target="_blank"
              rel="noreferrer"
              className="buttonLink"
            >
              PRICE LIST
            </a>
          )}
        </div>
        <div className="icons">
          {profile.instagram && (
            <a href={profile.instagram} target="_blank" rel="noreferrer">
              <img
                src={require("../assets/Icons/7.png")}
                height="45px"
                alt="img"
              />{" "}
            </a>
          )}
          {profile.facebook && (
            <a href={profile.facebook} target="_blank" rel="noreferrer">
              <img
                src={require("../assets/Icons/8.png")}
                height="45px"
                alt="img"
              />{" "}
            </a>
          )}
          {profile.twitter && (
            <a href={profile.twitter} target="_blank" rel="noreferrer">
              <img
                src={require("../assets/Icons/9.png")}
                height="45px"
                alt="img"
              />{" "}
            </a>
          )}
          {profile.youtube && (
            <a href={profile.youtube} target="_blank" rel="noreferrer">
              {" "}
              <img
                src={require("../assets/Icons/10.png")}
                height="45px"
                alt="img"
              />{" "}
            </a>
          )}
          {profile.linkedin && (
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              {" "}
              <img
                src={require("../assets/Icons/11.png")}
                height="45px"
                alt="img"
              />{" "}
            </a>
          )}
        </div>
      </div>
      <div className="poweredBy">POWERED BY</div>
      <img
        src={require("../assets/Icons/logo.png")}
        width={"150px"}
        alt="img"
      />
    </div>
  );
}

export default CardProfile;
