import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  pendingFetchData,
  deleteRequest
} from "../store/Actions/employeeAction";
import HeaderNav from "./menu/HeaderNav";
import Footer from "./menu/Footer";
import Loading from "./menu/Loading";
import {
  Layout,
  Table,
  Modal,
  Button,
  Divider,
  Popconfirm,
  message
} from "antd";
const { Content } = Layout;

class EmployeeReqAcceptPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: false,
      user: null
    };

    this.columns = [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
        width: 95
      },
      {
        title: "Employee Number",
        dataIndex: "employee_number",
        key: "employee_number",
        width: 100
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: 150
      },
      {
        title: "Position",
        dataIndex: "position",
        key: "position",
        width: 150
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        width: 150
      },
      {
        title: "Type Of Leave",
        dataIndex: "type_name",
        key: "type_name",
        width: 150
      },
      {
        title: "From",
        dataIndex: "date_from",
        key: "date_from",
        width: 120
      },
      {
        title: "To",
        dataIndex: "date_to",
        key: "date_to",
        width: 120
      },
      {
        title: "Action",
        key: "action",
        width: 300,
        render: (value, record) => (
          <span>
            <Button type="primary" onClick={() => this.showDetail(record)}>
              Detail
            </Button>
            <Divider type="vertical" />
            <Button
              onClick={() => {
                this.editLeave(this.props.users, record.id);
              }}
              type="primary"
            >
              Edit
            </Button>
            <Divider type="vertical" />
            <Popconfirm
              placement="top"
              title={"Are you sure delete this leave request?"}
              onConfirm={() => {
                this.deleteRequest(this.props.users, record.id);
                message.success("Leave request has been delete!");
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

  componentDidMount() {
    if (!localStorage.getItem("token")) {
      this.props.history.push("/");
    } else if (
      localStorage.getItem("role") !== "employee" &&
      localStorage.getItem("role") !== "supervisor"
    ) {
      this.props.history.push("/");
    }
    this.props.pendingFetchData();
  }

  editLeave = (leave, id) => {
    console.log(id, "--", leave);
    this.props.history.push({
      pathname: "/editrequest/" + id,
      state: { leave: leave }
    });
  };

  deleteRequest = (users, id) => {
    this.props.deleteRequest(users, id);
    console.log("delete nih", users, "--", id);
  };

  showDetail = record => {
    this.setState({
      visible: true,
      user: record
    });
  };

  onSelectChange = selectedRowKeys => {
    console.log("selected row: ", selectedRowKeys);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  onShowSizeChange(current, pageSize) {
    console.log(current, pageSize);
  }

  render() {
    const { visible, loading } = this.state;

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
              margin: "18px 10px 0",
              justifyContent: "space-around",
              paddingBottom: "336px"
            }}
          >
            <div style={{ padding: 20, background: "#fff" }}>
              <Table
                columns={this.columns}
                dataSource={this.props.users}
                rowKey={record => record.id}
                onRowClick={this.onSelectChange}
                pagination={{
                  className: "my-pagination",
                  defaultCurrent: 1,
                  defaultPageSize: 5,
                  total: 50,
                  showSizeChanger: this.onShowSizeChange
                }}
              />
            </div>

            <Modal
              visible={visible}
              title="Detail Leave Request Accepted"
              onCancel={this.handleCancel}
              style={{ top: "20" }}
              bodyStyle={{ padding: "0" }}
              footer={[
                <Button
                  key="cancel"
                  loading={loading}
                  onClick={this.handleCancel}
                >
                  Return
                </Button>
              ]}
            >
              <div style={{ padding: 10, background: "#fff" }}>
                ID : {this.state.user && this.state.user.id} <br />
                Name : {this.state.user && this.state.user.name} <br />
                Gender : {this.state.user && this.state.user.gender} <br />
                Email : {this.state.user && this.state.user.email} <br />
                Type Of Leave : {this.state.user && this.state.user.type_name} <br />
                Reason : {this.state.user && this.state.user.reason} <br />
                From : {this.state.user && this.state.user.date_from} <br />
                To : {this.state.user && this.state.user.date_to} <br />
                Back On : {this.state.user && this.state.user.back_on} <br />
                Total : {this.state.user && this.state.user.total} day <br />
                Leave Remaining : {this.state.user && this.state.user.leave_remaining} day <br />
                Contact Address : {this.state.user && this.state.user.contact_address} <br />
                Contact Number : {this.state.user && this.state.user.contact_number} <br />
                Status : {this.state.user && this.state.user.status}
                <br />  
              </div>
            </Modal>
          </Content>
          <Footer />
        </Layout>
      );
    }
  }
}

const mapStateToProps = state => ({
  loading: state.fetchEmployeeReducer.loading,
  users: state.fetchEmployeeReducer.users
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      pendingFetchData,
      deleteRequest
    },
    dispatch
  );

console.log(mapStateToProps);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeReqAcceptPage);
