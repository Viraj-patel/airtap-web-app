import React from "react";
import "./CardProfile.css";

const Icon = ({ image, title }) => {
  return (
    <div className="iconsContainer">
      <img src={image} height="40px" alt="img" />
      <div className="iconTitle">{title}</div>
    </div>
  );
};

function CardProfile() {
  return (
    <div className="profileContainer">
      <div className="imageContainer">
        <img
          src={require("../assets/profile/yash.jpeg")}
          className="profileImage"
          alt="img"
        />
      </div>
      <div className="profileName">Yash Shah</div>
      <div className="designation">CEO and Founder</div>
      <div className="companyName">Nonsense Store</div>
      <div className="icons">
        <a href="tel:919409648832" target="_blank" rel="noreferrer">
          <Icon image={require("../assets/Icons/1.png")} title={"CALL"} />
        </a>
        <a href="https://wa.me/919409648832" target="_blank" rel="noreferrer">
          <Icon image={require("../assets/Icons/2.png")} title={"WHATSAPP"} />
        </a>
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=marketing@gononsense.in"
          target="_blank"
          rel="noreferrer"
        >
          <Icon image={require("../assets/Icons/3.png")} title={"MAIL"} />
        </a>
        <a href="https://www.gononsense.in" target="_blank" rel="noreferrer">
          <Icon image={require("../assets/Icons/4.png")} title={"WEBSITE"} />
        </a>
        {/* <a href="https://wa.me/919409648832">
          <Icon image={require("../assets/Icons/5.png")} title={"LOCATION"} />
          </a> */}
      </div>
      <div className="outerButton">
        <a
          href={require("../assets/contact.vcf")}
          download
          className="buttonContainer"
          rel="noreferrer"
        >
          <img
            src={require("../assets/Icons/6.png")}
            height={"30px"}
            alt="img"
          />
          <div className="contactTitle">ADD TO CONTACT</div>
        </a>
        <div className="icons">
          <a
            href="https://instagram.com/officially_nonsense?igshid=YmMyMTA2M2Y="
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={require("../assets/Icons/7.png")}
              height="45px"
              alt="img"
            />{" "}
          </a>
          <a
            href="https://m.facebook.com/officially.nonsense/"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={require("../assets/Icons/8.png")}
              height="45px"
              alt="img"
            />{" "}
          </a>
          <a
            href="https://youtube.com/channel/UCBLPvx1sDXJdR8Xk8uPtOmQ"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={require("../assets/Icons/9.png")}
              height="45px"
              alt="img"
            />{" "}
          </a>
          <a
            href="https://mobile.twitter.com/GoNonsense"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            <img
              src={require("../assets/Icons/10.png")}
              height="45px"
              alt="img"
            />{" "}
          </a>
          <a
            href="https://www.linkedin.com/in/nonsense-store-56594a219"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            <img
              src={require("../assets/Icons/11.png")}
              height="45px"
              alt="img"
            />{" "}
          </a>
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
