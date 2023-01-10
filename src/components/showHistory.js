import "./tableH.css";
import React from "react";
import { Button, Modal, Space } from "antd";
import TableH from "./Table";
const info = () => {
  Modal.info({
    title: "History Tab",
    content: <TableH />,
    onOk() {},
  });
};

const ShowHistory = () => (
  <div className="TableH">
    <Button type="primary" onClick={info}>
      History
    </Button>
  </div>
);
export default ShowHistory;
