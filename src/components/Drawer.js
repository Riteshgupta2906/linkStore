import "./Drawer.css";
import formSubmit from "../Handlers/submitHandler";
import React, { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Drawer, Form, Input, Row, Select, Space } from "antd";
import slugify from "slugify";
const { Option } = Select;

const SideDrawer = (props) => {
  const [entryData, setEntryData] = useState([]);
  async function fetchData() {
    const response = await fetch("http://localhost:8000/api/v1/groups");
    const res = await response.json();
    setEntryData(res.data);
  }
  useEffect(() => {
    fetchData();
  });

  const [note, setNote] = useState({
    title: "",
    description: "",
    link: "",
    group: "",
  });
  function handleChange1(event) {
    note.group = event;
    note.group = slugify(note.group, { lower: true });
  }
  function handleChange(event) {
    const { id, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [id]: value,
      };
    });
  }

  function submitNote(event) {
    formSubmit(note, "entries");

    setNote({
      title: "",
      description: "",
      link: "",
      group: "",
    });
    event.preventDefault();
  }

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div className="Drawer">
        <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
          {!props.textHide && "New Entry"}
        </Button>
      </div>

      <Drawer
        title="Create a new Entry"
        width={720}
        onClose={onClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={submitNote} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                onChange={handleChange}
                name="title"
                label="Title"
                value={note.title}
                rules={[
                  {
                    required: true,
                    message: "Please enter the Title",
                  },
                ]}
              >
                <Input placeholder="Please enter the Title" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="link"
                label="Url"
                value={note.link}
                onChange={handleChange}
                rules={[
                  {
                    required: true,
                    message: "Please enter url",
                  },
                ]}
              >
                <Input
                  style={{
                    width: "100%",
                  }}
                  placeholder="Please enter url"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="group"
                label="Group"
                rules={[
                  {
                    required: true,
                    message: "Entry must have a Group",
                  },
                ]}
              >
                <Select
                  name="group"
                  label={note.group}
                  onChange={handleChange1}
                  placeholder="Please choose the Group"
                >
                  {entryData.map((ele) => {
                    return (
                      <Option key={ele._id} value={ele.group}>
                        {ele.group}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}></Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="description" label="Description">
                <Input.TextArea
                  rows={4}
                  value={note.description}
                  onChange={handleChange}
                  placeholder="please enter  description"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};
export default SideDrawer;
