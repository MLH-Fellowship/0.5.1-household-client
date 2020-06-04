import React from 'react';
import { Redirect } from 'react-router-dom';
import  HTTPClient  from '../../../src/HTTPClient';
import { Form, Input, Button, Checkbox } from 'antd';

import '../../components/login/login.css';

export class NewHouse extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      housename:'',
      description:'',
      created:false
    }
  }
  onFinish(values) {
    console.log('Success:', values);
  };

  onFinishFailed(errorInfo) {
    console.log('Failed:', errorInfo);
  };

  handleClick(event) {
    var payload = {
      "name": this.state.housename,
      "description": this.state.description,
    }

    const client = new HTTPClient(process.env.REACT_APP_API_URL,{
      Authorization: localStorage.getItem("token"),
    });

    client.post(process.env.REACT_APP_API_URL, payload).then(
      (response)=>{
          if (!response.success) {
            window.alert('Could not create House.');
          } else {
            this.setState({created:true});
          }
        }
    );
  }

  render() {
    return (
      <Form
        name="normal_login"
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
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
          <Input onChange = {(event) => this.setState({housename:event.target.value})} />
        </Form.Item>

        <Form.Item
          label="Give House a description"
          name="description"
          rules={[
            {
              required: true,
              message: 'Please give a description!',
            },
          ]}
        >
          <Input onChange = {(event) => this.setState({description:event.target.value})}/>
        </Form.Item>

        <Form.Item >
          <Button type="primary" htmlType="submit">
            Create House
          </Button>
          <p><a href="/houses/all">Go back to House List.</a></p>
        </Form.Item>
        {this.state.login === true &&
          <Redirect
            to={{
              pathname: "/houses/all",
            }}
          />
        }
      </Form>
    );
  }
};
