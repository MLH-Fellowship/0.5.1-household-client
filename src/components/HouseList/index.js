import React from "react";
import { Row, Col, Empty } from "antd";
import { Link } from "react-router-dom";
import HTTPClient from "../../HTTPClient";
import { getAuthHeaders } from "../../utils";
import withToast from "../WithToast";
import "./index.css";

import { HouseCard, LoadingHouseCard } from "../House";

const House = HouseCard;

const client = new HTTPClient(process.env.REACT_APP_API_URL, {
  ...getAuthHeaders(),
});

class HouseList extends React.Component {
  state = {
    houses: null,
    loading: true,
  };
  componentDidMount() {
    this.fetchHouses();
  }
  fetchHouses = async () => {
    this.setState({
      loading: true,
    });
    const res = await client.get("/house/user", {});
    const { success, data } = res;
    let houses = [];
    if (success) {
      houses = data.data;
      console.log(houses);
      this.props.addToast("Fetched houses successfuly.", {
        appearance: "success",
      });
    } else {
      this.props.addToast("Fetched failed to fetch houses.", {
        appearance: "error",
      });
    }
    this.setState({
      houses,
      loading: false,
    });
  };
  renderHouses = () => {
    const { houses, loading } = this.state;
    if (loading) {
      return (
        <React.Fragment>
          {[1, 2, 3, 4, 5].map((i) => {
            return (
              <Col sm={24} md={12} lg={6}>
                <LoadingHouseCard key={i} />
              </Col>
            );
          })}
        </React.Fragment>
      );
    }
    if (houses && houses.length > 0) {
      return houses.map(
        ({ house_id, name, description, members = ["E.O", "T.A"] }) => (
          <Col sm={24} md={12} lg={6}>
            <House
              id={house_id}
              name={name}
              members={members}
              description={description}
            />
          </Col>
        )
      );
    } else {
      return (
        <div className="no-house-msg">
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          <p className="">
            You've no house yet.{" "}
            <Link to="/houses/create">Create a house.</Link>
          </p>
        </div>
      );
    }
  };
  render() {
    return (
      <div className="house-list-wrapper">
        <h2 className="house-header">Here are the houses you belong to</h2>
        <Row gutter={[24, 16]}>{this.renderHouses()}</Row>
      </div>
    );
  }
}

export default withToast(HouseList);
