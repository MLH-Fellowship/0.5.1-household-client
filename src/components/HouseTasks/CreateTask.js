import React from "react";
import HTTPClient from "../../HTTPClient";
import { getAuthHeaders } from "../../utils";
import { Col, Card } from "antd";
import { Form, Input, Button, Checkbox } from 'antd';
import { Redirect } from "react-router-dom";
import withToast from "../WithToast";


const client = new HTTPClient(process.env.REACT_APP_API_URL, {
    ...getAuthHeaders(),
});

class EditTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "", description: "", frequency: 0,
            redirect: null
        }
        this.createTask = this.createTask.bind(this);
    }
    createTask() {
        client.post(`/house/${this.props.match.params.id}/task/add`, { name: this.state.name, description: this.state.description, frequency: this.state.frequency }).then((_) => {
            this.setState({ redirect: "/" })
        })
            .catch(error => {
                this.props.addToast("Fetched failed to create the task.", {
                    appearance: "error",
                });
            })
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return <Card title={`Create a task`}>
            <Form>
                <Input value={this.state.name} onInput={e => {
                    this.setState({ name: e.target.value })
                }} />
                <Input value={this.state.description} onInput={e => {
                    this.setState({ description: e.target.value })
                }} />
                <Input value={this.state.frequency} onInput={e => {
                    this.setState({ frequency: e.target.value })
                }} />
                <Button onClick={this.createTask}>Add task</Button>
            </Form>
        </Card>
    }
}

export default withToast(EditTask);