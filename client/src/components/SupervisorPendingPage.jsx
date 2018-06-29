import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  pendingFetchData,
  updateStatusAccept,
  updateStatusReject
} from "../store/Actions/supervisorActions";
import HeaderNav from "./menu/HeaderNav";
import Footer from "./menu/Footer";
import { Layout, Table, Modal, Button } from "antd";
const { Content } = Layout;

class SupervisorPendingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingA: false,
      loadingR: false,
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
        width: 95
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
        dataIndex: "type_of_leave",
        key: "type_of_leave",
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
        width: 100,
        render: (value, record) => (
          <span>
            {/* {console.log("===========>id", record.id)} */}
            <Button type="primary" onClick={() => this.showDetail(record)}>
              Detail
            </Button>
          </span>
        )
      }
    ];
  }

  showDetail = record => {
    this.setState({
      visible: true,
      user: record
    });
  };

  onSelectChange = selectedRowKeys => {
    console.log("selected row: ", selectedRowKeys);
  };

  handleOk = () => {
    const id = this.state.user && this.state.user.id;
    const employeeNumber = this.state.user && this.state.user.employee_number;

    this.setState({ loadingA: true });
    setTimeout(() => {
      this.setState({ loadingA: false, visible: false });
      this.updateStatusAccept(this.props.users, id, employeeNumber);
      window.location.reload();
    }, 1000);
  };

  handleReject = () => {
    const id = this.state.user && this.state.user.id;
    const employeeNumber = this.state.user && this.state.user.employee_number;

    this.setState({ loadingR: true });
    setTimeout(() => {
      this.setState({ loadingR: false, visible: false });
      this.updateStatusReject(this.props.users, id, employeeNumber);
      window.location.reload();
    }, 1000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  updateStatusAccept = (users, id, enumber) => {
    this.props.updateStatusAccept(users, id, enumber);
  };

  updateStatusReject = (users, id, enumber) => {
    this.props.updateStatusReject(users, id, enumber);
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
    const { visible, loadingA, loadingR } = this.state;

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
                rowKey={record => record.id}
                onRowClick={this.onSelectChange}
              />
            </div>

            <Modal
              visible={visible}
              title="Detail Leave Request"
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              style={{ top: "20" }}
              bodyStyle={{ padding: "0" }}
              footer={[
                <Button
                  key="accept"
                  type="primary"
                  loading={loadingA}
                  onClick={this.handleOk}
                >
                  Accept
                </Button>,
                <Button
                  key="reject"
                  type="danger"
                  loading={loadingR}
                  onClick={this.handleReject}
                >
                  Reject
                </Button>
              ]}
            >
              <div style={{ padding: 10, background: "#fff" }}>
                ID : {this.state.user && this.state.user.id} <br />
                Name : {this.state.user && this.state.user.name} <br />
                Gender : {this.state.user && this.state.user.gender} <br />
                Email : {this.state.user && this.state.user.email} <br />
                Type Of Leave :
                {this.state.user && this.state.user.type_of_leave} <br />
                Reason : {this.state.user && this.state.user.reason} <br />
                From : {this.state.user && this.state.user.date_from} <br />
                To : {this.state.user && this.state.user.date_to} <br />
                Back On : {this.state.user && this.state.user.back_on} <br />
                Total : {this.state.user && this.state.user.total} <br />
                Leave Remaining :
                {this.state.user && this.state.user.leave_remaining} <br />
                Address Leave : {this.state.user && this.state.user.address}
                <br />
                Phone Leave : {this.state.user && this.state.user.contact_leave}
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
  loading: state.fetchSupervisorReducer.loading,
  users: state.fetchSupervisorReducer.users
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      pendingFetchData,
      updateStatusAccept,
      updateStatusReject
    },
    dispatch
  );

console.log(mapStateToProps);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SupervisorPendingPage);
