import React from "react";
import { Button, Form, Input, message } from "antd";

const ChangePassword = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const ChangePasswordDatas = {
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
      confirmPassword: values.confirmPassword,
    };
    try {
      message.success("Password Changed successfully.");
    } catch (error) {
      console.error("Failed to change password:", error);
      message.error("Failed to change Password.");
    }
  };
  return (
    <Form
      requiredMark={false}
      form={form}
      onFinish={onFinish}
      layout="vertical"
    >
      <Form.Item
        name="oldPassword"
        label={<span className="text-black">Old Password</span>}
        rules={[
          {
            required: true,
            message: "name is required",
          },
        ]}
      >
        <Input.Password
          placeholder="*****************"
          style={{
            width: "100%",
            height: 40,
            border: "1px solid #222",
            borderRadius: "5px",
            color: "#111",
            backgroundColor: "#fff",
            outline: "none",
          }}
          className=" p-2 w-full outline-none"
        />
      </Form.Item>

      <Form.Item
        name="newPassword"
        label={<span className="text-black">New Password</span>}
        rules={[
          {
            required: true,
            message: "name is required",
          },
        ]}
      >
        <Input.Password
          placeholder="*****************"
          style={{
            width: "100%",
            height: 40,
            border: "1px solid #222",
            borderRadius: "5px",
            color: "#111",
            backgroundColor: "#fff",
            outline: "none",
          }}
          className=" p-2 w-full outline-none"
        />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        label={<span className="text-black">Confirm Password</span>}
        rules={[
          {
            required: true,
            message: "phone number is required",
          },
        ]}
      >
        <Input.Password
          placeholder="*****************"
          style={{
            width: "100%",
            height: 40,
            border: "1px solid #222",
            borderRadius: "5px",
            color: "#111",
            backgroundColor: "#fff",
            outline: "none",
          }}
          className=" p-2 w-full outline-none"
        />
      </Form.Item>

      <Button
        type="primary"
        htmlType="submit"
        // disabled={isNewPassChange}
        style={{
          backgroundColor: "var(--bg-green-high)",
          color: "#fff",
          height: 40,
        }}
        className=" w-full"
      >
        {/* {isNewPassChange ? <Spin /> : "Update password"} */}
        update password
      </Button>
    </Form>
  );
};

export default ChangePassword;