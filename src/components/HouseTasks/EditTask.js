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

class EditTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
      name: "",
      description: "",
      frequency: 0,
      loading: true,
    };
    this.updateTask = this.updateTask.bind(this);
  }
  formRef = React.createRef();
  updateTask() {
    const { houseId } = this.props.location.state
      ? this.props.location.state
      : {};
    const { id } = this.props.match.params;
    client
      .post(`/task/${id}/update`, {
        name: this.state.name,
        description: this.state.description,
        frequency: this.state.frequency,
      })
      .then((result) => {
        this.props.addToast("Updated tasks succesfully. Redirecting", {
          appearance: "success",
        });
        const redirectURL =
          houseId !== undefined ? `/houses/${houseId}` : "/houses/all";
        setTimeout(() => this.setState({ redirect: redirectURL }), 1000);
      })
      .catch((error) => {
        this.props.addToast("Fetched failed to update the task.", {
          appearance: "error",
        });
      });
  }
  componentDidMount() {
    client
      .get(`/task/${this.props.match.params.id}`)
      .then((result) => {
        console.log(result);
        console.log(this.formRef);
        this.setState({
          loading: false,
          name: result.data.data.name,
          description: result.data.data.description,
          frequency: result.data.data.frequency,
        });
      })
      .catch((error) => {
        console.log(error);
        this.props.addToast("Fetched failed to fetch tasks.", {
          appearance: "error",
        });
      });
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    if (this.state.loading) {
      return <p>Loading...</p>;
    }

    return (
      <Card title={`Edit task "${this.state.name}"`}>
        <Form
          name="edit_task"
          ref={this.formRef}
          initialValues={{
            name: this.state.name,
            frequency: this.state.frequency,
            description: this.state.description,
          }}
        >
          <Input
            name="name"
            value={this.state.name}
            onInput={(e) => this.setState({ name: e.target.value })}
          />
          <br />
          <Input
            name="description"
            value={this.state.description}
            onInput={(e) => this.setState({ description: e.target.value })}
          />
          <br />
          <Input
            name="frequency"
            value={this.state.frequency}
            onInput={(e) => this.setState({ frequency: e.target.value })}
          />
          <br />
          <Button onClick={this.updateTask}>Update Task</Button>
        </Form>
      </Card>
    );
  }
}

export default withToast(EditTask);
