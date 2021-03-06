import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Avatar, Skeleton } from "antd";
import HTTPClient from "../../HTTPClient";
import {
  LoginOutlined,
  DeleteOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";

import HouseShareModal from "./HouseShareModal";

import "./index.css";
const Meta = Card.Meta;

const MemberAvatar = ({ member }) => {
  return (
    <Avatar
      style={{ color: "white", backgroundColor: "#00000", fontWeight: 700 }}
    >
      {member}
    </Avatar>
  );
};

const renderMemberAvatars = (members) => {
  if (members && members.length > 0) {
    return (
      <div className="member-avatars">
        <p>3 tasks are overdue.</p>
        {members.map((member, index) => (
          <MemberAvatar key={index} member={member} />
        ))}
        <MemberAvatar member={"+3"} />
      </div>
    );
  }
};

const LoadingHouseCard = () => {
  return (
    <Card
      style={{ width: 300, marginTop: 16 }}
      actions={[
        <LoginOutlined key="login" />,
        <ShareAltOutlined key="share" />,
        <DeleteOutlined key="delete" />,
      ]}
    >
      <Skeleton loading={true} active>
        <Meta title="Card title" description="This is the description" />
      </Skeleton>
      <Skeleton loading={true} active>
        <Meta title="Card title" description="This is the description" />
      </Skeleton>
    </Card>
  );
};

const HouseCard = ({ name, id, members, description }) => {
  const [showModal, setShowModal] = useState(false);
  const toggleModalState = () => setShowModal(!showModal);
  const [joinLink, setJoinLink] = useState(null);

  const fetchJoinLink = async (id) => {
    const client = new HTTPClient(process.env.REACT_APP_API_URL, {
      Authorization: localStorage.getItem("token"),
    });
    const { data, success } = await client.get(`house/${id}/user/invite`);
    if (success) {
      const url = `${window.location.host}${data.data}`;
      setJoinLink(url);
    }
  };
  return (
    <Card
      className="house-card"
      cover={
        <img
          alt="example"
          src="https://specials-images.forbesimg.com/imageserve/1026205392/960x0.jpg?fit=scale"
        />
      }
      actions={[
        <Link to={`/houses/${id}`}>
          <LoginOutlined key="enter" />
        </Link>,
        <ShareAltOutlined
          key="share"
          onClick={() => {
            if (!joinLink) {
              fetchJoinLink(id);
            }
            toggleModalState();
          }}
        />,
        <DeleteOutlined key="leave" />,
      ]}
    >
      <Meta title={name} description={description} />
      {renderMemberAvatars(members)}
      {
        <HouseShareModal
          // should fetch/generate invite link
          shareableLink={joinLink || "Loading Link ..."}
          showModal={showModal}
          toggleModalState={toggleModalState}
        />
      }
    </Card>
  );
};

export { HouseCard, LoadingHouseCard };
