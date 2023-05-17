import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CardProfile from "./CardProfile/CardProfile";
import Profile from "./Profile/Profile";
import EditProfile from "./EditProfile/EditProfile";
import UserProfile from "./UserProfile/UserProfile";

export default function Routing() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Profile} />
          <Route path="/editProfile" component={Profile} />
          <Route path="/profile/:id" component={CardProfile} />
          <Route path="/newEditprofile" component={Profile} />
          <Route path="/:id" component={UserProfile} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
