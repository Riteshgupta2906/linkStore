import React, { useContext, useState } from "react";
import { Button, Modal, Form, Select } from "antd";
import { FloatButton } from "antd";
import {
  CustomerServiceOutlined,
  DeleteOutlined,
  SendOutlined,
} from "@ant-design/icons";
import DataContext from "../store/dataContext";
import countDown from "./popup";
import slugify from "slugify";
const { Option } = Select;

const Floating = (props) => {
  const dataCtx = useContext(DataContext);
  const [move, setMove] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleChange1 = (e) => {
    const slug = slugify(e, { lower: true });
    setMove(slug);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    const fdata = {
      array: dataCtx.data,
      grp: { group: move },
    };
    console.log(fdata);
    const root = "http://localhost:8000";
    const url = `${root}/api/v1/entries`;
    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fdata),
    });
    console.log(res);
    if (res.status === 200) {
      countDown({
        title: "Success",
        content: "Entry Got Moved from the Group",
      });
      dataCtx.deleteData();
    }

    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const deleteHandler = async () => {
    const root = "http://localhost:8000";
    const url = `${root}/api/v1/entries`;
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataCtx.data),
    });
    console.log(res);
    if (res.status === 200) {
      countDown({
        title: "Success",
        content: "Entry Got Deleted from the Group",
      });
      dataCtx.deleteData();
    }
  };

  return (
    <>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        okText="Submit"
        onCancel={handleCancel}
      >
        <Form>
          <Form.Item
            name="Group"
            label="Type"
            rules={[
              { required: true, message: "Please choose the Group to Move" },
            ]}
          >
            <Select
              onChange={handleChange1}
              placeholder="Please choose the Group to Move"
            >
              {props.d.map((ele) => {
                return (
                  <Option key={ele._id} value={ele.group}>
                    {ele.group}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      <FloatButton.Group
        tooltip={<div>Action</div>}
        trigger="click"
        type="primary"
        style={{
          right: 24,
        }}
        icon={<CustomerServiceOutlined />}
      >
        <FloatButton
          onClick={deleteHandler}
          tooltip={<div>Delete</div>}
          icon={<DeleteOutlined />}
        />
        <FloatButton
          onClick={showModal}
          tooltip={<div>Move</div>}
          icon={<SendOutlined />}
        />
      </FloatButton.Group>
    </>
  );
};
export default Floating;
