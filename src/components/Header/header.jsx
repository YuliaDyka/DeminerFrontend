import React, { useState } from "react";
import { AppstoreOutlined, HomeOutlined } from "@ant-design/icons";
import { Menu, Button, Flex } from "antd";
import { Link } from "react-router-dom";

import "./header.css";

const items = [
  {
    label: <Link to="/">Home</Link>,
    key: "home",
    icon: <HomeOutlined />,
  },
  {
    label: <Link to="/routes">My Routes</Link>,
    key: "routes",
    icon: <AppstoreOutlined />,
  },
];

const Header = ({ setAuth }) => {
  const [current, setCurrent] = useState("home");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  return (
    <div className="header-wrapper">
      <div className="header">
        <div className="proj_name">
          <h2>Deminer manager</h2>
        </div>
        <Menu
          className="menu"
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
        />
        <Flex align="center" gap="small">
          <h4>{localStorage.getItem("login").username}</h4>
          <Button
            type="primary"
            onClick={() => {
              setAuth(null);
              localStorage.removeItem("login");
            }}
          >
            Log out
          </Button>
        </Flex>
      </div>
    </div>
  );
};

export default Header;
