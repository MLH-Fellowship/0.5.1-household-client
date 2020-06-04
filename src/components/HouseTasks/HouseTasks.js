import React from "react";
import HTTPClient from "../../HTTPClient";
import { getAuthHeaders } from "../../utils";
import { Col, Card } from "antd";
import { Link } from "react-router-dom";
import withToast from "../WithToast";


const client = new HTTPClient(process.env.REACT_APP_API_URL, {
    ...getAuthHeaders(),
});

class HouseTasks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            tasks: [],
        }
        this.fetchTasks = this.fetchTasks.bind(this);
    }
    fetchTasks() {
        client.get(`/house/${this.props.match.match.params.houseID}/tasks/all`)
            .then(result => {
                this.setState({ tasks: result.data.data, loading: false });
            })
            .catch(error => {
                this.props.addToast("Fetched failed to fetch tasks.", {
                    appearance: "error",
                });
            })
    }
    componentDidMount() {
        this.fetchTasks();
    }
    render() {
        if (this.state.loading) {
            return <p>Loading...</p>
        }
        return <Col sm={24} md={12} lg={6}>
            {this.state.tasks.map((task, taskIndex) => {
                return <Card title={task.name} key={taskIndex}>
                    <p>{task.description}</p>
                    <p>{task.frequency}</p>
                    <Link to={`/task/edit/${task.id}`}>Edit task</Link>
                </Card>
            })}
        </Col>
    }
}

export default withToast(HouseTasks);
