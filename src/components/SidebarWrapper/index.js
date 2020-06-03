import React, { useState, useEffect } from "react";
import Sidebar from "react-sidebar";
import { Link } from "react-router-dom";
import { Menu, Avatar } from "antd";
import {
  MailOutlined,
  UserOutlined,
  LogoutOutlined,
  HomeOutlined,
  FileAddOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import "./styles.css";

const mql = window.matchMedia(`(min-width: 800px)`);

const SidebarContent = () => {
  return (
    <div className="sidebar-wrapper">
      <Avatar size={64} icon={<UserOutlined />} />
      <h3>Welcome, Eyitayo</h3>
      <Menu onClick={() => {}} selectedKeys={[]}>
        <Menu.Item key="join-house" icon={<HomeOutlined />}>
          <Link to="/houses/join">Join A House</Link>
        </Menu.Item>
        <Menu.Item key="create-house" icon={<FileAddOutlined />}>
          <Link to="/houses/create">Create New House</Link>
        </Menu.Item>
        <Menu.Item key="view-houses" icon={<UnorderedListOutlined />}>
          <Link to="/houses/all">View Your Houses</Link>
        </Menu.Item>
        <Menu.Item key="log-out" icon={<LogoutOutlined />}>
          Log Out
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default function SidebarWrapper({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarDocked, setSidebarDocked] = useState(mql.matches);

  useEffect(() => {
    mql.addListener(mediaQueryChanged);

    return function cleanUp() {
      mql.removeListener(mediaQueryChanged);
    };
  }, []);

  function mediaQueryChanged() {
    setSidebarDocked(mql.matches);
    setSidebarOpen(false);
  }

  function onSetSidebarOpen(open) {
    setSidebarOpen(open);
  }

  function forceToggleSidebar() {
    if (mql.matches) {
      setSidebarDocked(!sidebarDocked);
      setSidebarOpen(false);
    } else {
      setSidebarDocked(false);
      setSidebarOpen(!sidebarOpen);
    }
  }

  return (
    <Sidebar
      docked={sidebarDocked}
      open={sidebarOpen}
      onSetOpen={onSetSidebarOpen}
      sidebarClassName="sidebar-component"
      sidebar={<SidebarContent />}
      children={
        <div style={{ position: "relative" }}>
          <div
            onClick={() => {
              forceToggleSidebar();
            }}
            className="SidebarWrapperSwipeBtn"
          >
            <FontAwesomeIcon className="SidebarWrapperIcon" icon={faBars} />
          </div>
          {children}
        </div>
      }
    />
  );
}
