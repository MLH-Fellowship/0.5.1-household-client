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
            loading: true,
            task: null,
            redirect: null
        }
        this.fetchTask = this.fetchTask.bind(this);
        this.updateTask = this.updateTask.bind(this);
    }
    fetchTask() {
        client.get(`/task/${this.props.match.match.id}`).then(result => {
            this.setState({ loading: false, task: result.data.data });
        }).catch(error => {
            this.props.addToast("Fetched failed to fetch tasks.", {
                appearance: "error",
            });
        })
    }
    updateTask() {
        client.post(`/task/${this.props.match.match.id}/update`).then(result => {
            this.setState({ redirect: "/" })
        })
            .catch(error => {
                this.props.addToast("Fetched failed to update the task.", {
                    appearance: "error",
                });
            })
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        if (this.state.loading) {
            return <p>Loading</p>
        }
        return <Card title={`Edit task ${this.state.task.name}`}>
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
                <Button onClick={this.updateTask} />
            </Form>
        </Card>
    }
}

export default withToast(EditTask);