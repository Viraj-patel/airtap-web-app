import React from "react";

function Loading() {
  return (
    <div className={"fullscreen"}>
      <img
        src={require("../assets/loading.gif")}
        alt={"loading"}
        height="50px"
        width={"50px"}
      />
    </div>
  );
}

export default Loading;
