import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  fetchAdminLeaveApprove,
  cancelRequestLeave,
  downloadReport,
  downloadReportTypeLeave
} from "../../../store/Actions/adminActions";
import HeaderAdmin from "../../../pages/menu/HeaderAdmin";
import Loading from "../../../components/Loading";
import Footer from "../../../components/Footer";
import "./style.css";
import {
  Layout,
  Table,
  Modal,
  Button,
  Input,
  Icon,
  Form,
  DatePicker,
  Select
} from "antd";
const { Content } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;
let data;

class AdminApprovePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: false,
      user: null,
      data: this.props.leave,
      filterDropdownVisible: false,
      filterDropdownNameVisible: false,
      filtered: false,
      searchText: "",
      searchID: "",
      from: null,
      to: null,
      start: null,
      end: null,
      id: null
    };
  }

  componentWillMount() {
    console.log(
      " ----------------- Admin-List-Approve-Request ----------------- "
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.leave !== this.props.leave) {
      this.setState({ data: nextProps.leave });
    }
    data = nextProps.leave;
  }

  componentDidMount() {
    if (!localStorage.getItem("token")) {
      this.props.history.push("/");
    } else if (localStorage.getItem("role") !== "admin") {
      this.props.history.push("/");
    }
    this.props.fetchAdminLeaveApprove();
  }

  onSearch = () => {
    const { searchText } = this.state;
    const reg = new RegExp(searchText, "gi");
    this.setState({
      filterDropdownNameVisible: false,
      filtered: !!searchText,
      data: data
        .map(record => {
          const match = record.name.match(reg);
          if (!match) {
            return null;
          }
          return {
            ...record,
            name: (
              <span>
                {record.name
                  .split(
                    new RegExp(`(?<=${searchText})|(?=${searchText})`, "i")
                  )
                  .map(
                    (text, i) =>
                      text.toLowerCase() === searchText.toLowerCase() ? (
                        <span key={i}>{text}</span>
                      ) : (
                          text
                        ) // eslint-disable-line
                  )}
              </span>
            )
          };
        })
        .filter(record => !!record)
    });
  };

  onSearchID = () => {
    const { searchID } = this.state;
    const reg = new RegExp(searchID, "gi");
    this.setState({
      filterDropdownIDVisible: false,
      filtered: !!searchID,
      data: data
        .map(record => {
          const match = String(record.id).match(reg);
          if (!match) {
            return null;
          }
          return {
            ...record,
            ID: (
              <span>
                {this.state.data.map(
                  (text, i) =>
                    String(text.id) === searchID ? (
                      <span key={i} className="highlight">
                        {text}
                      </span>
                    ) : (
                        text
                      ) // eslint-disable-line
                )}
                }
              </span>
            )
          };
        })
        .filter(record => !!record)
    });
  };

  onInputChangeID = e => {
    this.setState({
      searchID: e.target.value
    });
  };

  onInputChangeName = e => {
    this.setState({
      searchText: e.target.value
    });
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

  handleOk = () => {
    const id = this.state.user && this.state.user.id;
    const employeeNumber = this.state.user && this.state.user.employee_number;

    this.setState({ loading: true });
    this.cancelRequestLeave(this.props.leave, id, employeeNumber);
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 760);
  };

  cancelRequestLeave = (leave, id, enumber) => {
    this.props.cancelRequestLeave(leave, id, enumber);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.downloadReport(this.state.from, this.state.to);
  };

  downloadReport = (from, to) => {
    this.props.downloadReport(from, to);
  };

  onStartChange = value => {
    if (value !== null) {
      const date = new Date(value._d),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      let dateFrom = [day, mnth, date.getFullYear(),].join("-");
      this.setState({
        from: dateFrom
      });
    }
  };

  onEndChange = value => {
    if (value !== null) {
      const date = new Date(value._d),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      let dateTo = [day, mnth, date.getFullYear(),].join("-");
      this.setState({
        to: dateTo
      });
    }
  };

  handleSubmitReportType = e => {
    e.preventDefault();
    this.downloadReportTypeLeave(
      this.state.start,
      this.state.end,
      this.state.id
    );
  };

  downloadReportTypeLeave = (from, to, id) => {
    this.props.downloadReportTypeLeave(from, to, id);
  };

  onStartChangeDate = value => {
    if (value !== null) {
      const date = new Date(value._d),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      let dateFrom = [day, mnth, date.getFullYear(),].join("-");
      this.setState({
        start: dateFrom
      });
    }
  };

  onEndChangeDate = value => {
    if (value !== null) {
      const date = new Date(value._d),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      let dateTo = [day, mnth, date.getFullYear(),].join("-");
      this.setState({
        end: dateTo
      });
    }
  };

  handleChangeSelect = value => {
    this.setState({
      id: value
    });
  };

  onShowSizeChange(current, pageSize) {
    console.log(current, pageSize);
  }

  render() {
    const { visible, loading } = this.state;
    const columns = [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
        width: 90,
        filterDropdown: (
          <div className="custom-filter-dropdown-id">
            <Input
              type="number"
              ref={ele => (this.searchInput = ele)}
              placeholder="Search request id"
              value={this.state.searchID}
              onChange={this.onInputChangeID}
              onPressEnter={this.onSearchID}
            />
            <Button type="primary" onClick={this.onSearchID}>
              Search
            </Button>
          </div>
        ),
        filterIcon: (
          <Icon
            type="search"
            style={{ color: this.state.filtered ? "#108ee9" : "#aaa" }}
          />
        ),
        filterDropdownIDVisible: this.state.filterDropdownIDVisible,
        onFilterDropdownVisibleChange: visible => {
          this.setState(
            {
              filterDropdownIDVisible: visible
            },
            () => this.searchInput && this.searchInput.focus()
          );
        }
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
        width: 150,
        filterDropdown: (
          <div className="custom-filter-dropdown-name">
            <Input
              ref={ele => (this.searchInput = ele)}
              placeholder="Search name"
              value={this.state.searchText}
              onChange={this.onInputChangeName}
              onPressEnter={this.onSearch}
            />
            <Button type="primary" onClick={this.onSearch}>
              Search
            </Button>
          </div>
        ),
        filterIcon: (
          <Icon
            type="search"
            style={{ color: this.state.filtered ? "#108ee9" : "#aaa" }}
          />
        ),
        filterDropdownNameVisible: this.state.filterDropdownNameVisible,
        onFilterDropdownVisibleChange: visible => {
          this.setState(
            {
              filterDropdownNameVisible: visible
            },
            () => this.searchInput && this.searchInput.focus()
          );
        }
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
        width: 100,
        render: (value, record) => (
          <span>
            <Button type="primary" onClick={() => this.showDetail(record)}>
              Detail
            </Button>
          </span>
        )
      }
    ];

    if (this.props.loading) {
      return <Loading />;
    } else {
      return (
        <Layout>
          <HeaderAdmin />
          <Content
            className="container"
            style={{
              display: "flex",
              margin: "20px 15px 0",
              justifyContent: "center",
              paddingBottom: "186px"
            }}
          >
            <div style={{ padding: 20, background: "#fff" }}>
              <Form
                id="myForm"
                layout="inline"
                onSubmit={this.handleSubmit}
                style={{ marginRight: 600 }}
              >
                <FormItem>
                  <DatePicker
                    id="date_from"
                    name="date_from"
                    placeholder="Start"
                    defaultValue={this.state.from}
                    onChange={this.onStartChange}
                  />
                </FormItem>
                <FormItem>
                  <DatePicker
                    id="date_from"
                    name="date_from"
                    placeholder="End"
                    defaultValue={this.state.to}
                    onChange={this.onEndChange}
                  />
                </FormItem>
                <FormItem>
                  <Button type="primary" htmlType="submit">
                    Download
                  </Button>
                </FormItem>
              </Form>

              <Form
                id="myForm"
                layout="inline"
                onSubmit={this.handleSubmitReportType}
                style={{ marginRight: 405 }}
              >
                <FormItem>
                  <DatePicker
                    id="date_from"
                    name="date_from"
                    placeholder="Start"
                    // defaultValue={this.state.start}
                    onChange={this.onStartChangeDate}
                  />
                </FormItem>
                <FormItem>
                  <DatePicker
                    id="date_from"
                    name="date_from"
                    placeholder="End"
                    // defaultValue={this.state.end}
                    onChange={this.onEndChangeDate}
                  />
                </FormItem>
                <FormItem>
                  <Select
                    style={{ width: 180 }}
                    id="type_of_leave"
                    name="type_of_leave"
                    placeholder="Type of Leave"
                    optionFilterProp="children"
                    onChange={this.handleChangeSelect}
                  >
                    <Option value="11">Annual Leave</Option>
                    <Option value="22">Errand Leave</Option>
                    <Option value="33">Sick Leave</Option>
                    <Option value="44">Marriage Leave</Option>
                    <Option value="55">Maternity Leave</Option>
                    <Option value="66">Other Leave</Option>
                  </Select>
                </FormItem>
                <FormItem>
                  <Button type="primary" htmlType="submit">
                    Download
                  </Button>
                </FormItem>
              </Form>

              <Table
                columns={columns}
                dataSource={this.state.data}
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
              title="Detail Leave Request Approved"
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              style={{ top: "20" }}
              bodyStyle={{ padding: "0" }}
              footer={[
                <Button
                  key="accept"
                  type="danger"
                  loading={loading}
                  onClick={this.handleOk}
                >
                  Cancel Request
                </Button>
              ]}
            >
              <div style={{ padding: 10, background: "#fff" }}>
                ID : {this.state.user && this.state.user.id} <br />
                Name : {this.state.user && this.state.user.name} <br />
                Gender : {this.state.user && this.state.user.gender} <br />
                Email : {this.state.user && this.state.user.email} <br />
                Type Of Leave : {this.state.user &&
                  this.state.user.type_name}{" "}
                <br />
                Reason : {this.state.user && this.state.user.reason} <br />
                From : {this.state.user && this.state.user.date_from} <br />
                To : {this.state.user && this.state.user.date_to} <br />
                Half Day :{" "}
                {this.state.user && this.state.user.half_dates !== ""
                  ? this.state.user.half_dates
                  : "none"}{" "}
                <br />
                Back On : {this.state.user && this.state.user.back_on} <br />
                Total Leave : {this.state.user &&
                  this.state.user.total} day <br />
                Leave Balance :{" "}
                {this.state.user && this.state.user.leave_remaining} day <br />
                Contact Address :{" "}
                {this.state.user && this.state.user.contact_address} <br />
                Contact Number :{" "}
                {this.state.user && this.state.user.contact_number}
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
  loading: state.adminReducer.loading,
  leave: state.adminReducer.leaves
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchAdminLeaveApprove,
      cancelRequestLeave,
      downloadReport,
      downloadReportTypeLeave
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminApprovePage);
