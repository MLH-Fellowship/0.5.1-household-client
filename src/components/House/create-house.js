import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';

import '../../components/login/login.css';

export const NewHouse = () => {
  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      className="form-box"
    >
      <Form.Item
        label="Give your House a name"
        name="housename"
        rules={[
          {
            required: true,
            message: 'Please give your House a name!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item >
        <Button type="primary" htmlType="submit">
          Create House
        </Button>
        <p><a href="./houses/all">Go back to House List.</a></p>
      </Form.Item>
    </Form>
  );
};
