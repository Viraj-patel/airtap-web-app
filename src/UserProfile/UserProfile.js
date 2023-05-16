import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { API_URL, NEW_USER_DETAILS } from "../constants/constants";
import axios from "axios";
import _ from "lodash";
import classes from "./UserProfile.module.css";
import FileSaver from "file-saver";

const Icon = ({ image, title }) => {
  return (
    <div className="iconsContainer">
      <img src={image} height="40px" alt="img" />
      <div className="iconTitle">{title}</div>
    </div>
  );
};

const ImageComponent = ({ value }) => {
  return <img src={value} className="profileImage" alt="img" />;
};

const Header1 = ({ value }) => {
  return <div className="profileName">{value}</div>;
};

const Header2 = ({ value }) => {
  return <div className="designation">{value}</div>;
};

const TextView = ({ obj }) => {
  return <div className="designation">{obj.text}</div>;
};

const IconWithLabel = ({ value, obj }) => {
  if (obj.id == "whatsapp") value = "https://wa.me/91" + value;
  if (obj.id == "call") value = "tel:" + value;
  return (
    <a href={value} target="_blank" rel="noreferrer">
      <Icon image={obj.icon_url} title={obj.icon_label} />
    </a>
  );
};

const ButtonIconWithLabel = ({ profile, obj }) => {
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
  return (
    <div className="buttonContainer" rel="noreferrer" onClick={downloadVCF}>
      <img src={obj.icon_url} height={"30px"} alt="img" />
      <div className="contactTitle">{obj.button_label}</div>
    </div>
  );
};

const ButtonComponent = ({ value, obj }) => {
  return (
    <a href={value} target="_blank" rel="noreferrer" className="buttonLink">
      {obj.label}
    </a>
  );
};

const CompanyLogo = ({ obj }) => {
  return <img src={obj.image_url} width={"100px"} alt="img" />;
};

const IconComponent = ({ value, obj }) => {
  return (
    <a href={value} target="_blank" rel="noreferrer">
      <img src={obj.icon_url} height="45px" alt="img" />{" "}
    </a>
  );
};

function UserProfile() {
  const [customTemplate, setTemplate] = useState([]);
  const [templateGroup, setTemplategroup] = useState([]);
  const [profile, setProfile] = useState([]);

  const location = useLocation();

  useEffect(() => {
    const id = _.last(location.pathname.split("/"));
    console.log(API_URL + NEW_USER_DETAILS + id);
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

        setTemplate(template.body);
        setTemplategroup(template.group);
        setProfile(profileDetails);
        // setShowLoader(false);
      })
      .catch((err) => {
        console.log(err);
        // setShowLoader(false);
      });
  }, []);
  console.log(customTemplate, profile);
  return (
    <div className={classes.container}>
      {_.map(templateGroup, (grp) => (
        <div style={grp.styles}>
          {_.map(grp.includes, (index) => (
            <div className={classes.rowContainer}>
              {_.map(customTemplate[index], (obj) => {
                console.log(obj, !profile[obj.id] && !obj.skip_value);
                if (!profile[obj.id] && !obj.skip_value) return;
                switch (obj.type) {
                  case "image":
                    return <ImageComponent value={profile[obj.id]} obj={obj} />;
                  case "header1":
                    return <Header1 value={profile[obj.id]} obj={obj} />;
                  case "header2":
                    return <Header2 value={profile[obj.id]} obj={obj} />;
                  case "icon_with_label":
                    return <IconWithLabel value={profile[obj.id]} obj={obj} />;
                  case "button_icon_with_label":
                    return <ButtonIconWithLabel profile={profile} obj={obj} />;
                  case "button":
                    return (
                      <ButtonComponent value={profile[obj.id]} obj={obj} />
                    );
                  case "icon":
                    return <IconComponent value={profile[obj.id]} obj={obj} />;
                  case "textView":
                    return <TextView obj={obj} />;
                  case "company_logo":
                    console.log("===============comapnys");
                    return <CompanyLogo obj={obj} />;
                  default:
                    return <div>{profile[obj.id]}</div>;
                }
              })}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default UserProfile;
