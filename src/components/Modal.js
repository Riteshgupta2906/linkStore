import React, { useState, useContext } from "react";
import { Button, Modal } from "antd";
import { LinkOutlined } from "@ant-design/icons";
import submitHandler from "./../Handlers/submitHandler";
import "./Modal.css";
import Player from "./player";
const Model = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [play, setPlay] = useState(true);
  const showModal = () => {
    const data = {
      title: props.cnt.title,
      link: props.cnt.link,
      time: new Date().toString(),
    };
    const d = JSON.stringify(data);
    console.log(data);
    (async () => {
      const response = await fetch("http://localhost:8000/api/v1/history", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: d,
      });
    })();
    setIsModalOpen(true);
  };
  const handleStop = () => {
    setPlay((prevState) => !prevState);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        <LinkOutlined /> Link
      </Button>
      <Modal
        title="Viewer"
        open={isModalOpen}
        onOk={handleStop}
        onCancel={handleCancel}
        className="modalStyle"
        okText={play ? "Stop" : "Play"}
        cancelText="Close"
        destroyOnClose={true}
      >
        <Player url={props.cnt.link} shouldPlay={play} />
      </Modal>
    </>
  );
};
export default Model;
