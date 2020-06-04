import React from "react";
import HTTPClient from "../../HTTPClient";
import { getAuthHeaders } from "../../utils";
import { Col, Card, Skeleton, Empty, Avatar, Row, Button } from "antd";
import {
  SettingOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import withToast from "../WithToast";

import "./index.css";

const Meta = Card.Meta;

const client = new HTTPClient(process.env.REACT_APP_API_URL, {
  ...getAuthHeaders(),
});

function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  ).toDateString();
}

class HouseTasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      tasks: [],
    };
    this.fetchTasks = this.fetchTasks.bind(this);
  }
  fetchTasks() {
    client
      .get(`/house/${this.props.houseId}/task/all`)
      .then((result) => {
        console.log("tasks -->", result);
        this.setState({ tasks: result.data.data, loading: false });
      })
      .catch((error) => {
        this.props.addToast("Fetched failed to fetch tasks.", {
          appearance: "error",
        });
      });
  }
  componentDidMount() {
    this.fetchTasks();
  }
  render() {
    const { tasks } = this.state;
    if (this.state.loading) {
      return <p>Loading...</p>;
    }
    if (!tasks || tasks.length === 0) {
      return (
        <div className="no-house-msg">
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          <p className="">
            You've no tasks yet. <Link>Create a task.</Link>
          </p>
        </div>
      );
    }
    console.log(this.state);
    return (
      <div className="house-tasks">
        <Row gutter={[24, 16]}>
          {this.state.tasks.map((task, taskIndex) => {
            return (
              <>
                <Col sm={24} md={12} lg={6} key={taskIndex}>
                  <Card
                    actions={[
                      <Link
                        to={{
                          pathname: `/task/edit/${task.task_id}`,
                          state: { houseId: this.props.houseId },
                        }}
                      >
                        <EditOutlined key="edit" />
                      </Link>,
                      <EllipsisOutlined key="ellipsis" />,
                    ]}
                  >
                    <Meta
                      avatar={
                        <Avatar
                          shape="square"
                          src="https://image.flaticon.com/icons/svg/167/167824.svg"
                        />
                      }
                      title={task.name}
                      description={task.description}
                    />
                    <h3 className="due-date">
                      Due Next By -{" "}
                      {randomDate(new Date(2020, 0, 1), new Date(2020, 5, 5))}
                    </h3>
                    <h3 className="frequency">Frequency - {task.frequency}</h3>
                    <div className="button-wrapper">
                      <Button danger>Send Reminder</Button>
                      <Button danger> Re assign </Button>
                    </div>
                  </Card>
                  {/* <Card title={task.name} key={taskIndex}>
                <p>{task.description}</p>
                <p>{task.frequency}</p>
                <Link to={`/task/edit/${task.task_id}`}>Edit task</Link>
              </Card> */}
                </Col>
              </>
            );
          })}
        </Row>
      </div>
    );
  }
}

export default withToast(HouseTasks);
