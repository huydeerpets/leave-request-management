import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { adminFetchData, deleteUser } from "../store/Actions/adminActions";
import { Layout, Table, Divider, Button, Menu } from "antd";
const { Header, Footer, Content } = Layout;

class Adminpage extends Component {
  constructor(props) {
    super(props);

    this.columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email"
      },
      {
        title: "Position",
        dataIndex: "position",
        key: "position"
      },
      {
        title: "Role",
        dataIndex: "role",
        key: "role"
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <span>
            <Button
              onClick={() => {
                // console.log(this.props,'sAs')
                this.editUser(this.props.users, record.id);
              }}
              type="primary"
            >
              {" "}
              Edit Role
            </Button>
            <Divider type="vertical" />
            <Button
              onClick={() => {
                this.deleteUser(this.props.users, record.id);
              }}
              type="danger"
            >
              Delete
            </Button>
            <Divider type="vertical" />
          </span>
        )
      }
    ];
  }
  editUser = (users, userId) => {
    console.log(userId, "--", users);
    this.props.history.push({
      pathname: "/edituser/" + userId,
      state: { users: users }
    });
  };
  deleteUser = (users, userId) => {
    console.log("delete nih", users, "--", userId);
    this.props.deleteUser(users, userId);
  };
  componentDidMount() {
    if (localStorage.getItem("role") !== "admin") {
      this.props.history.push("/");
    }
    this.props.adminFetchData();
  }
  render() {
    if (this.props.loading) {
      return <h1> loading... </h1>;
    } else {
      return (
        <Layout>
          <Header>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["1"]}
              style={{ lineHeight: "64px" }}
            >
              <Menu.Item key="1">
                <NavLink to="/">Home</NavLink>
              </Menu.Item>
              <Menu.Item key="3">
                <Button
                  onClick={() => {
                    localStorage.clear();
                    this.props.history.push("/");
                  }}
                  type="danger"
                  ghost
                >
                  Logout
                </Button>
              </Menu.Item>
            </Menu>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between"
              }}
            />
          </Header>

          <Content
            className="container"
            style={{
              display: "flex",
              margin: "24px 16px 0",
              justifyContent: "space-around",
              paddingBottom: "336px"
            }}
          >
            <div style={{ padding: 150, background: "#fff", minHeight: 360 }}>
              <Table columns={this.columns} dataSource={this.props.users} />
            </div>
          </Content>
          <Footer style={{ background: "grey" }}>
            <p>
              <a href="http://opensource.org/licenses/mit-license.php"> MIT</a>.
              The website content is licensed{" "}
              <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
                CC BY NC SA 4.0
              </a>.
            </p>
          </Footer>
        </Layout>
      );
    }
  }
}

const mapStateToProps = state => ({
  loading: state.adminReducer.loading,
  users: state.adminReducer.users
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      adminFetchData,
      deleteUser
    },
    dispatch
  );

console.log(mapStateToProps);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Adminpage);
