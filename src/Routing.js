import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import CardProfile from "./CardProfile/CardProfile";

export default function Routing() {
  console.log("dfsa");
  return (
    <div>
      <BrowserRouter>
        <switch>
          <Route path="/" exact component={CardProfile} />
          <Route path="/:id" component={CardProfile} />
        </switch>
      </BrowserRouter>
    </div>
  );
}
