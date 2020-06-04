import React from "react";
import { Redirect } from "react-router-dom";
import HTTPClient from "../../../src/HTTPClient";
import { Form, Input, Button, Checkbox } from "antd";

import withToast from "../WithToast";

import "../../components/login/login.css";

const client = new HTTPClient(process.env.REACT_APP_API_URL, {
  Authorization: localStorage.getItem("token"),
});

class NewHouse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      housename: "",
      description: "",
      loading: false,
    };
  }
  onFinish(values) {
    console.log("Success:", values);
  }

  onFinishFailed(errorInfo) {
    console.log("Failed:", errorInfo);
  }

  handleClick = async (event) => {
    this.setState({
      loading: true,
    });
    const payload = {
      name: this.state.housename,
      description: this.state.description,
    };
    console.log(payload);
    const res = await client.post("house/add", payload);
    const { success } = res;
    if (success) {
      this.props.addToast("Created house successfully. Redirecting.", {
        appearance: "success",
      });
      setTimeout(() => (window.location = "/houses/all"), 1000);
    } else {
      this.props.addToast("Couldn't create house", {
        appearance: "error",
      });
    }
    this.setState({
      loading: false,
    });
  };

  render() {
    const { loading } = this.state;
    return (
      <Form name="normal_login" className="form-box">
        <h3>TaskApp 🏘️</h3>
        <h4>Create A House</h4>
        <Form.Item
          label="Give your House a name"
          name="housename"
          rules={[
            {
              required: true,
              message: "Please give your House a name!",
            },
          ]}
        >
          <Input
            onChange={(event) =>
              this.setState({ housename: event.target.value })
            }
          />
        </Form.Item>

        <Form.Item
          label="Give House a description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please give a description!",
            },
          ]}
        >
          <Input
            onChange={(event) =>
              this.setState({ description: event.target.value })
            }
          />
        </Form.Item>

        <Form.Item>
          <Button
            disabled={loading}
            type="primary"
            htmlType="submit"
            onClick={(event) => this.handleClick(event)}
          >
            {!loading ? "Create House" : "Please wait"}
          </Button>
          <p>
            <a href="/houses/all">Go back to House List.</a>
          </p>
        </Form.Item>
        {this.state.login === true && (
          <Redirect
            to={{
              pathname: "/houses/all",
            }}
          />
        )}
      </Form>
    );
  }
}

export default withToast(NewHouse);
