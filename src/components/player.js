import React, { useState } from "react";
import { Button } from "antd";
import { findDOMNode } from "react-dom";

import ReactPlayer from "react-player";
import "./player.css";

const Player = (props) => {
  return (
    <>
      <>
        <ReactPlayer
          className="react-player"
          url={props.url}
          playing={props.shouldPlay}
          pip={false}
          controls={true}
        />
      </>
    </>
  );
};
export default Player;
