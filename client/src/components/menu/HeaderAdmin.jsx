import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { Layout, Menu, Button, Icon } from "antd";
const { Header } = Layout;

const ButtonLogout = withRouter(({ history }) => (
  <Button
    onClick={() => {
      localStorage.clear();
      history.push("/");
    }}
    type="danger"
    ghost
  >
    Logout
  </Button>
));

export default class HeaderAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = { role: localStorage.getItem("role") };
  }
  render() {
    return (
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          style={{ lineHeight: "64px" }}
        >
          <Menu.Item key="1">
            <NavLink to="/">
              <span>
                <Icon type="home" />
              </span>Home
            </NavLink>
          </Menu.Item>
          <Menu.Item key="2">
            <NavLink to="/register">
              <span>
                <Icon type="form" />
              </span>Add User
            </NavLink>
          </Menu.Item>
          <Menu.Item key="3">
            <NavLink to="/list-request">
              <span>
                <Icon type="schedule" />
              </span>List Leave Request
            </NavLink>
          </Menu.Item>
          <Menu.Item key="4">
            <ButtonLogout />
          </Menu.Item>
        </Menu>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between"
          }}
        />
      </Header>
    );
  }
}
