import React from "react";
import HTTPClient from "../../HTTPClient";
import { getAuthHeaders } from "../../utils";
import { Col, Card } from "antd";
import { Form, Input, Button, Checkbox } from "antd";
import { Redirect } from "react-router-dom";
import withToast from "../WithToast";

const client = new HTTPClient(process.env.REACT_APP_API_URL, {
  ...getAuthHeaders(),
});

class CreateTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      frequency: 0,
      redirect: null,
    };
    this.createTask = this.createTask.bind(this);
  }
  createTask() {
    const { houseId } = this.props;
    client
      .post(`/house/${houseId}/task/add`, {
        name: this.state.name,
        description: this.state.description,
        frequency: this.state.frequency,
      })
      .then((_) => {
        this.props.addToast("Created task successfully.", {
          appearance: "success",
        });
      })
      .catch((error) => {
        this.props.addToast("Fetched failed to create the task.", {
          appearance: "error",
        });
      });
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <Card>
        <Form>
          <Form.Item label="Task Name">
            <Input
              value={this.state.name}
              onInput={(e) => {
                this.setState({ name: e.target.value });
              }}
            />
          </Form.Item>
          <Form.Item label="Description">
            <Input
              value={this.state.description}
              onInput={(e) => {
                this.setState({ description: e.target.value });
              }}
            />
          </Form.Item>
          <Form.Item label="Task Frequency">
            <Input
              value={this.state.frequency}
              onInput={(e) => {
                this.setState({ frequency: e.target.value });
              }}
            />
          </Form.Item>
          <Button onClick={this.createTask}>Add task</Button>
        </Form>
      </Card>
    );
  }
}

export default withToast(CreateTask);
