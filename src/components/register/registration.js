import React from 'react';
import { Redirect } from 'react-router-dom';
import { useToasts } from "react-toast-notifications"
import  HTTPClient  from '../../../src/HTTPClient';
import {
  Form,
  Input,
  Tooltip,
  Button,
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

import './register.css';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 10,
    },
  },
};

const client = new HTTPClient(process.env.REACT_APP_API_URL, {});

export const RegForm = () => {
  const { addToast } = useToasts();
    const onFinish = async (values) => {
      const res = await client.post("auth/register", {
        username: values["username"],
        email: values["email"],
        password: values["password"],
      });
      const { data, success } = res;
      if (success && data) {
        addToast("Successfully Registered. Redirecting.", {
          appearance: "success",
        });
        setTimeout(() => (window.location = "/login"), 700);
      } else {
        addToast("Could not Register", {
          appearance: "error",
        });
      }
    }
  
  return (
    <Form
      {...formItemLayout}
      name="register"
      onFinish={onFinish}
      className="register-box"
      scrollToFirstError
    >
      <h3>Register Here!</h3>
      <Form.Item
        name="username"
        label={
          <span>
            Username&nbsp;
            <Tooltip title="What do you want others to call you?">
              <QuestionCircleOutlined />
            </Tooltip>
          </span>
        }
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your Password!',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject('The two passwords that you entered do not match!');
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item className="button-align">
        <Button type="primary" htmlType="submit">
          Click to Register
        </Button>
        <p><a href="./login">Already have an account? Login here!</a></p>
      </Form.Item>
    </Form>
  );
};
