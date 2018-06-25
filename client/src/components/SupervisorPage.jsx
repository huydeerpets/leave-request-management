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
import { Layout, Table, Divider, Modal, Button, List } from "antd";
const { Content } = Layout;
let employee;
class SupervisorPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: false,
      data: {}
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
        dataIndex: "from",
        key: "from",
        width: 120
      },
      {
        title: "To",
        dataIndex: "to",
        key: "to",
        width: 120
      },
      {
        title: "Action",
        key: "action",
        width: 100,
        render: (value, record) => (
          <span>
            {/* {console.log("===========>id", record.id)} */}
            <Button type="primary" onClick={this.showModal}>
              Detail
            </Button>
          </span>
        )
      }
    ];
  }

  showModal = () => {
    this.setState({
      visible: true
    });
    let source = this.props.users;
    for (var i = 0; i < source.length; i++) {
      if (source[i].id === 0) {
        // console.log(source[i].id);
        return source[i];
      }
    }
  };

  onSelectChange = selectedRowKeys => {
    employee = selectedRowKeys;
    console.log("selectedRowKeys changed: ", selectedRowKeys.id);
    // console.log("state data=============>", this.state.data);
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };
  handleCancel = () => {
    this.setState({ visible: false });
  };

  updateStatusAccept = (users, employeeNumber) => {
    this.props.updateStatusAccept(users, employeeNumber);
  };

  updateStatusReject = (users, employeeNumber) => {
    this.props.updateStatusReject(users, employeeNumber);
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
    const { visible, loading } = this.state;
    const data = [];

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
              title="Title"
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              style={{ top: "20" }}
              bodyStyle={{ padding: "0" }}
              footer={[
                <Button key="back" onClick={this.handleCancel}>
                  Return
                </Button>,
                <Button
                  key="submit"
                  type="primary"
                  loading={loading}
                  onClick={this.handleOk}
                >
                  Submit
                </Button>
              ]}
            >
              <div style={{ padding: 10, background: "#fff" }}>
                {/* <div style={{ padding: 20, background: "#fff" }}>
                  {employee.map(item => {
                    return <li key={item.id}>{item.id}</li>;
                  })}
                </div>        */}
                {/* {console.log("state data=============>", employee)}     */}
                <List
                  header={<div>Header</div>}
                  footer={<div>Footer</div>}
                  bordered
                  dataSource={employee}
                  renderItem={item => <List.Item>{item}</List.Item>}
                />
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
)(SupervisorPage);
