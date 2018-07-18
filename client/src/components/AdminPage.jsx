import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { adminFetchData, deleteUser } from "../store/Actions/adminActions";
import HeaderNav from "./menu/HeaderAdmin";
import Footer from "./menu/Footer";
import Loading from "./menu/Loading";
import {
  Layout,
  Table,
  Button,
  Divider,
  Popconfirm,
  message,
} from "antd";
const { Content } = Layout;

class Adminpage extends Component {
  constructor(props) {
    super(props);

    this.columns = [
      {
        title: "Employee Number",
        dataIndex: "employee_number",
        key: "employee_number",
        width: "12%"
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: "20%"
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        width: "20%"
      },
      {
        title: "Position",
        dataIndex: "position",
        key: "position",
        width: "15%"
      },
      {
        title: "Role",
        dataIndex: "role",
        key: "role",
        width: "12%"
      },
      {
        title: "Action",
        key: "action",
        width: "25%",
        render: (text, record) => (
          <span>
            <Button
              onClick={() => {
                this.editUser(this.props.users, record.employee_number);
              }}
              type="primary"
            >
              Edit
            </Button>
            <Divider type="vertical" />
            <Popconfirm
              placement="top"
              title={"Are you sure delete this employee?"}
              onConfirm={() => {
                this.deleteUser(this.props.users, record.employee_number);
                message.success("Employee has been delete!");
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button type="danger">Delete</Button>
            </Popconfirm>
          </span>
        )
      }
    ];
  }

  componentWillMount() {
    console.log(" ----------------- Admin-Page ----------------- ");
  }

  componentDidMount() {
    if (localStorage.getItem("role") !== "admin") {
      this.props.history.push("/");
    }
    this.props.adminFetchData();
  }

  editUser = (users, employeeNumber) => {
    console.log(employeeNumber, "--", users);
    this.props.history.push({
      pathname: "/edituser/" + employeeNumber,
      state: { users: users }
    });
  };

  deleteUser = (users, employeeNumber) => {
    this.props.deleteUser(users, employeeNumber);
    console.log("delete nih", users, "--", employeeNumber);
  };

  onShowSizeChange(current, pageSize) {
    console.log(current, pageSize);
  }

  render() {
    if (this.props.loading) {
      return <Loading />;
    } else {
      return (
        <Layout>
          <HeaderNav />

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
              <Table
                columns={this.columns}
                dataSource={this.props.users}
                rowKey={record => record.employee_number}
                pagination={{
                  className: "my-pagination",
                  defaultCurrent: 1,
                  defaultPageSize: 5,
                  total: 50,
                  showSizeChanger: this.onShowSizeChange
                }}
              />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Adminpage);
