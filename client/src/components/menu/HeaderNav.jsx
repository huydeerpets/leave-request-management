import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { Layout, Menu, Button, Icon } from "antd";
const { Header } = Layout;
const SubMenu = Menu.SubMenu;

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


export default class HeaderNav extends React.Component {  
  constructor(props) {
    super(props);
    this.state = {role: localStorage.getItem("role")};        
  }
  render() {    
    return this.state.role === "employee" ? (
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
              </span>
              Home
            </NavLink>
          </Menu.Item>

          <Menu.Item key="2">
            <NavLink to="/profile">
              <span>
                <Icon type="profile" />
              </span>
              Profile
            </NavLink>
          </Menu.Item>

          <Menu.Item key="4">
            <NavLink to="/request-leave">
              <span>
                <Icon type="form" />
              </span>
              Form Request Leave
            </NavLink>
          </Menu.Item>

          <SubMenu
            title={
              <span>
                <Icon type="schedule" />Leave Request
              </span>
            }
          >
            <Menu.Item key="schedule:1">
              <NavLink to="/request-pending">List Request Pending</NavLink>
            </Menu.Item>
            <Menu.Item key="schedule:2">
              <NavLink to="/request-accept">List Request Accept</NavLink>
            </Menu.Item>
            <Menu.Item key="schedule:3">
              <NavLink to="/request-reject">List Request Reject</NavLink>
            </Menu.Item>
          </SubMenu>

          <Menu.Item key="7">
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
    ) : (
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
              </span>
              Home
            </NavLink>
          </Menu.Item>

          <Menu.Item key="2">
            <NavLink to="/profile">
              <span>
                <Icon type="profile" />
              </span>
              Profile
            </NavLink>
          </Menu.Item>

          <Menu.Item key="3">
            <NavLink to="/list-request">
              <span>
                <Icon type="contacts" />
              </span>
              List Request Leave
            </NavLink>
          </Menu.Item>

          <Menu.Item key="4">
            <NavLink to="/request-leave">
              <span>
                <Icon type="form" />
              </span>
              Form Request Leave
            </NavLink>
          </Menu.Item>

          <SubMenu
            title={
              <span>
                <Icon type="user" />Employee
              </span>
            }
          >
            <Menu.Item key="user:1">
              <NavLink to="/list-accept">List Accept</NavLink>
            </Menu.Item>
            <Menu.Item key="user:2">
              <NavLink to="/list-reject">List Reject</NavLink>
            </Menu.Item>
          </SubMenu>

          <SubMenu
            title={
              <span>
                <Icon type="schedule" />Leave Request
              </span>
            }
          >
            <Menu.Item key="schedule:1">
              <NavLink to="/request-pending">List Request Pending</NavLink>
            </Menu.Item>
            <Menu.Item key="schedule:2">
              <NavLink to="/request-accept">List Request Accept</NavLink>
            </Menu.Item>
            <Menu.Item key="schedule:3">
              <NavLink to="/request-reject">List Request Reject</NavLink>
            </Menu.Item>
          </SubMenu>

          <Menu.Item key="7">
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
