import "./addGroup.css";
import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import slugify from "slugify";
import submitHandler from "./../Handlers/submitHandler";
const AddGroup = (props) => {
  const [group, setGroup] = useState(false);
  const onFinish = (values) => {
    if (values) {
      values.slug = slugify(values.group, { lower: true });
      submitHandler(values, "groups");
      setGroup(false);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="AddGroup">
      {!props.textHide && !group && (
        <div className="AddGroupbtn">
          <Button
            type="primary"
            onClick={() => {
              setGroup(true);
            }}
          >
            Add Group
          </Button>
        </div>
      )}
      {group && (
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="group"
            rules={[
              {
                required: true,
                message: "Please input group!",
              },
            ]}
          >
            <Input placeholder="Add Group" />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};
export default AddGroup;
