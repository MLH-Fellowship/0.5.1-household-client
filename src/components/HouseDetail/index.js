import React from "react";
import { Drawer, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import withToast from "../WithToast";
import HouseTasks from "../HouseTasks/HouseTasks";
import CreateTask from "../HouseTasks/CreateTask";

import "./index.css";

const CreateHouseDrawer = ({ onClose, isVisible }) => {
  return (
    <Drawer
      title="Create a new task"
      width={720}
      onClose={onClose}
      visible={isVisible}
      bodyStyle={{ paddingBottom: 80 }}
      footer={
        <div
          style={{
            textAlign: "right",
          }}
        >
          <Button onClick={onClose} type="primary">
            Cancel
          </Button>
        </div>
      }
    >
      <CreateTask />
    </Drawer>
  );
};

const EditHouseDrawer = ({ onClose, isVisible }) => {
  return (
    <Drawer
      title="Edit a task"
      width={720}
      onClose={onClose}
      visible={isVisible}
      bodyStyle={{ paddingBottom: 80 }}
      footer={
        <div
          style={{
            textAlign: "right",
          }}
        >
          <Button onClick={onClose} type="primary">
            Cancel
          </Button>
        </div>
      }
    >
      <CreateTask />
    </Drawer>
  );
};

class HouseDetail extends React.Component {
  state = {
    createdrawerOpen: false,
    editdrawerOpen: false,
  };
  toggleCreateDrawerState = () => {
    this.setState((state) => ({
      createdrawerOpen: !state.createdrawerOpen,
    }));
  };
  toggleEditDrawerState = () => {
    this.setState((state) => ({
      editdrawerOpen: !state.editdrawerOpen,
    }));
  };
  render() {
    const { id } = this.props.match.params;
    const { createdrawerOpen, editdrawerOpen } = this.state;
    return (
      <div className="house-detail-wrapper">
        <Button type="primary" onClick={this.toggleCreateDrawerState}>
          <PlusOutlined /> Create Task
        </Button>
        <CreateHouseDrawer
          onClose={this.toggleCreateDrawerState}
          isVisible={createdrawerOpen}
        />
        <EditHouseDrawer
          onClose={this.toggleEditDrawerState}
          isVisible={editdrawerOpen}
        />

        <HouseTasks houseId={id} />
      </div>
    );
  }
}

export default withToast(HouseDetail);
