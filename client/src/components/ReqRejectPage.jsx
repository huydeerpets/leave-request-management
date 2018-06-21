import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { rejectFetchData } from "../store/Actions/statusRejectAction";
import HeaderNav from "./menu/HeaderNav";
import Footer from "./menu/Footer";
import { Layout, Table } from "antd";
const { Content } = Layout;

class RejectPage extends Component {
  constructor(props) {
    super(props);

    this.columns = [
      {
        title: "Employee Number",
        dataIndex: "employee_number",
        key: "employee_number",
        width: 95
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: 70
      },
      {
        title: "Position",
        dataIndex: "position",
        key: "position",
        width: 90
      },
      {
        title: "Start Working Date",
        dataIndex: "start_working_date",
        key: "start_working_date"
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        width: 80
      },
      {
        title: "Role",
        dataIndex: "role",
        key: "role",
        width: 65
      },
      {
        title: "Type Of Leave",
        dataIndex: "type_of_leave",
        key: "type_of_leave",
        width: 100
      },
      {
        title: "Reason",
        dataIndex: "reason",
        key: "reason",
        width: 85
      },
      {
        title: "From",
        dataIndex: "from",
        key: "from",
        width: 65
      },
      {
        title: "To",
        dataIndex: "to",
        key: "to",
        width: 50
      },
      {
        title: "Total",
        dataIndex: "total",
        key: "total",
        width: 70
      },
      {
        title: "Leave Remaining",
        dataIndex: "leave_remaining",
        key: "leave_remaining"
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address",
        width: 100
      },
      {
        title: "Contact Leave",
        dataIndex: "contact_leave",
        key: "contact_leave"
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status"
      },
      {
        title: "Approved By",
        dataIndex: "approved_by",
        key: "approved_by"
      }
    ];
  }

  componentDidMount() {
    if (!localStorage.getItem("token")) {
      this.props.history.push("/");
    } else if (
      localStorage.getItem("role") !== "employee" &&
      localStorage.getItem("role") !== "supervisor"
    ) {
      this.props.history.push("/");
    }
    this.props.rejectFetchData();
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
              margin: "18px 10px 0",
              justifyContent: "space-around",
              paddingBottom: "336px"
            }}
          >
            <div style={{ padding: 20, background: "#fff" }}>
              <Table
                columns={this.columns}
                dataSource={this.props.users}
                rowKey={record => record.employee_number}
              />
            </div>
          </Content>
          <Footer />
        </Layout>
      );
    }
  }
}

const mapStateToProps = state => ({
  loading: state.fetchReqRejectReducer.loading,
  users: state.fetchReqRejectReducer.users
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      rejectFetchData
    },
    dispatch
  );

console.log(mapStateToProps);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RejectPage);
