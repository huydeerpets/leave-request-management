import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { pendingFetchData } from "../store/Actions/supervisorActions";
import HeaderNav from "./menu/HeaderNav";
import Footer from "./menu/Footer";
import { Layout, Table, Divider, Button } from "antd";
const { Content } = Layout;

class SupervisorPage extends Component {
  constructor(props) {
    super(props);

    this.columns = [
      {
        title: "Employee Number",
        dataIndex: "employee_number",
        key: "employee_number"
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "Gender",
        dataIndex: "gender",
        key: "gender"
      },
      {
        title: "Position",
        dataIndex: "position",
        key: "position"
      },
      {
        title: "Start Working Date",
        dataIndex: "start_working_date",
        key: "start_working_date"
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email"
      },
      {
        title: "Role",
        dataIndex: "role",
        key: "role"
      },
      {
        title: "Type Of Leave",
        dataIndex: "type_of_leave",
        key: "type_of_leave"
      },
      {
        title: "Reason",
        dataIndex: "reason",
        key: "reason"
      },
      {
        title: "From",
        dataIndex: "from",
        key: "from"
      },
      {
        title: "To",
        dataIndex: "to",
        key: "to"
      },
      {
        title: "Total",
        dataIndex: "total",
        key: "total"
      },
      {
        title: "Leave Remaining",
        dataIndex: "leave_remaining",
        key: "leave_remaining"
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address"
      },
      {
        title: "Contact Leave",
        dataIndex: "contact_leave",
        key: "contact_leave"
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <span>
            <Button
              onClick={() => {
                this.editUser(this.props.users, record.id);
              }}
              type="primary"
            >
              {" "}
              Accept
            </Button>
            <Divider type="vertical" />
            <Button
              onClick={() => {
                this.editUser(this.props.users, record.id);
              }}
              type="danger"
            >
              Reject
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

  componentDidMount() {
    if (!localStorage.getItem("token")) {
      this.props.history.push("/");
    } else if (localStorage.getItem("role") !== "supervisor") {
      this.props.history.push("/");
    }
    this.props.pendingFetchData();
  }
  render() {
    if (this.props.loading) {
      return <h1> loading... </h1>;
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
              <Table columns={this.columns} dataSource={this.props.users} />
            </div>
          </Content>
          <Footer />
        </Layout>
      );
    }
  }
}

const mapStateToProps = state => ({
  loading: state.fetchSupervisorReducer.loading,
  users: state.fetchSupervisorReducer.users
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      pendingFetchData
    },
    dispatch
  );

console.log(mapStateToProps);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SupervisorPage);
