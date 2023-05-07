import React, { useEffect, useState } from "react";
import { profileDetails } from "../Profile/profileUtils";
import { useLocation } from "react-router-dom";
import { API_URL, NEW_USER_DETAILS } from "../constants/constants";
import axios from "axios";
import { withRouter } from "react-router-dom";
import _ from "lodash";

function UserProfile() {
  const [customTemplate, setTemplate] = useState([]);
  const [profile, setProfile] = useState([]);

  const location = useLocation();

  useEffect(() => {
    const id = _.last(location.pathname.split("/"));
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
        setProfile(profileDetails);
        // setShowLoader(false);
      })
      .catch((err) => {
        console.log(err);
        // setShowLoader(false);
      });
  }, []);
  console.log(customTemplate, profileDetails);
  return <div>UserProfile</div>;
}

export default UserProfile;
