import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import CardProfile from "./CardProfile/CardProfile";
import Profile from "./Profile/Profile";

export default function Routing() {
  return (
    <div>
      <BrowserRouter>
        <switch>
          <Route path="/" exact component={CardProfile} />
          <Route path="/editProfile" component={Profile} />
          <Route path="/profile/:id" component={CardProfile} />
        </switch>
      </BrowserRouter>
    </div>
  );
}
