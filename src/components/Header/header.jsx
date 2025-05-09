import React, { useState } from "react";
import { AppstoreOutlined, HomeOutlined } from "@ant-design/icons";
import { Menu, Button, Flex } from "antd";
import { Link } from "react-router-dom";

import "./Header.css";

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
    <div className="header">
      <div>
        <h2>GPS Tracker</h2>
      </div>
      <Menu
        className="menu"
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
      <Flex align="center" gap="small">
        <h4>{JSON.parse(localStorage.getItem("login")).username}</h4>
        <Button
          type="primary"
          onClick={() => {
            setAuth(null);
            localStorage.setItem("login", null);
          }}
        >
          Log out
        </Button>
      </Flex>
    </div>
  );
};

export default Header;
