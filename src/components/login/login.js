import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { setAuthToken, setAuthUser } from "../../utils";
import HTTPClient from "../../HTTPClient";
import "./login.css";

const client = new HTTPClient(process.env.REACT_APP_API_URL, {
  Authorization: localStorage.getItem("token"),
});

export const LoginForm = () => {
  const { addToast } = useToasts();
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    setLoading(true);
    const res = await client.post("auth/login", {
      identifier: values["identifier"],
      password: values["password"],
    });
    const { data, success } = res;
    if (success && data) {
      setAuthToken(data.data.access_token);
      setAuthUser(data.data.username);
      addToast("Logged in successfully. Redirecting.", {
        appearance: "success",
      });
      setTimeout(() => (window.location = "/houses/all"), 400);
    } else {
      addToast("Invalid username/password combination", {
        appearance: "error",
      });
    }
    setLoading(false);
  };

  return (
    <Form
      name="normal_login"
      className="form-box"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <h3>TaskApp </h3>
      <Form.Item
        className="input-field"
        name="identifier"
        rules={[
          {
            required: true,
            message: "Please input your Username / Email !",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username / Email"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Form.Item>
          <a className="login-form-forgot" href="">
            Forgot password?
          </a>
        </Form.Item>
        <Form.Item>
          <Button
            disabled={loading}
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            {!loading ? "Login" : "Please wait"}
          </Button>
          <br />
          <br />
          <p>
            <Link to="/registration">Or Register Now!</Link>
          </p>
        </Form.Item>
      </Form.Item>
    </Form>
  );
};
