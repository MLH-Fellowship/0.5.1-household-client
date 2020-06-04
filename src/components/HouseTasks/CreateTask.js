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
            task: { name: "", description: "", frequency: 0 },
            redirect: null
        }
        this.creatTask = this.createTask.bind(this);
    }
    createTask() {
        client.post(`/house/${this.props.match.match.id}/task/add`).then((_) => {
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
                <Input value={this.state.task.name} onChange={newValue => {
                    this.setState(oldstate => {
                        return {
                            task: { name: newValue, ...oldstate.task },
                            ...oldstate
                        }
                    })
                }} />
                <Input value={this.state.task.description} onChange={newValue => {
                    this.setState(oldstate => {
                        return {
                            task: { description: newValue, ...oldstate.task },
                            ...oldstate
                        }
                    })
                }} />
                <Input value={this.state.task.frequency} onChange={newValue => {
                    this.setState(oldstate => {
                        return {
                            task: { frequency: newValue, ...oldstate.task },
                            ...oldstate
                        }
                    })
                }} />
                <Button onClick={this.createTask} />
            </Form>
        </Card>
    }
}

export default withToast(EditTask);