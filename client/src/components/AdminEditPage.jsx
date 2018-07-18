import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  fetchedEdit,
  handleEdit,
  saveEditUser
} from "../store/Actions/editUserAction";
import { SupervisorAdd } from "../store/Actions/AddSupervisorAction";
import { Layout, Button, Form, Input, Select, DatePicker } from "antd";
import moment from "moment-business-days";
import HeaderNav from "./menu/HeaderAdmin";
import Footer from "./menu/Footer";
const { Content } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;

class AdminEditPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      role: null
    };

    this.saveEdit = this.saveEdit.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleChangeGender = this.handleChangeGender.bind(this);
    this.handleChangeRole = this.handleChangeRole.bind(this);
    this.handleChangeSupervisor = this.handleChangeSupervisor.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem("role") !== "admin") {
      this.props.history.push("/");
    }
    console.log(
      this.props.history.location,
      "ini didmount",
      this.props.history.location.state === undefined
    );

    if (this.props.history.location.state === undefined) {
      this.props.history.push("/");
    } else {
      let id = Number(this.props.history.location.pathname.split("/").pop());
      let user = this.props.history.location.state.users.filter(
        el => el.employee_number === id
      );
      this.props.fetchedEdit(user[0]);
      this.props.SupervisorAdd();
    }
  }
  componentWillMount() {
    console.log(" ----------------- Admin-Edit-User ----------------- ");
    let id = Number(this.props.history.location.pathname.split("/").pop());
    let user = this.props.history.location.state.users.filter(
      el => el.employee_number === id
    );
    this.props.fetchedEdit(user[0]);
    this.props.SupervisorAdd();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.props.user) {
      this.setState({ role: nextProps.user.role });
    }
  }

  saveEdit = () => {
    console.log(this.props.user);
    this.props.saveEditUser(this.props.user, url => {
      this.props.history.push(url);
    });
  };

  handleOnChange = e => {
    let edit = {
      ...this.props.user,
      [e.target.name]: e.target.value
    };
    this.props.handleEdit(edit);
  };

  handleChangeGender(value, event) {
    let gender = {
      ...this.props.user,
      gender: value
    };

    this.props.handleEdit(gender);
    console.log("=======", gender);
  }

  handleChangeRole(value, event) {
    let role = {
      ...this.props.user,
      role: value
    };

    this.props.handleEdit(role);
    console.log("==========", role);
  }

  handleChangeSupervisor(value, event) {
    let supervisor = {
      ...this.props.user,
      supervisor_id: Number(value)
    };

    this.props.handleEdit(supervisor);
  }

  onBackOn = value => {
    if (value !== null) {
      const date = new Date(value._d),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      let newDate = [day, mnth, date.getFullYear()].join("-");
      let backOn = {
        ...this.props.user,
        start_working_date: newDate
      };

      this.props.handleEdit(backOn);
    }
  };

  handleChangeSelectRole(value, event) {
    let hiddenDiv = document.getElementById("supervisor");
    if (value === "employee") {
      hiddenDiv.style.display = "block";
    } else if (value === "supervisor") {
      hiddenDiv.style.display = "block";
    } else {
      hiddenDiv.style.display = "none";
    }
    this.setState({
      role: value
    });

    console.log("selected=======>", value);
  }

  handleChangeSelect(value, event) {
    console.log("selected=======>", value);
  }

  handleBlur() {
    console.log("blur");
  }

  handleFocus() {
    console.log("focus");
  }

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };

    const formStyle = {
      width: "100%"
    };

    const dateFormat = "DD-MM-YYYY";

    const role = this.state.role;

    let supervisorName;

    let hiddenDiv = document.getElementById("supervisor");
    if (role === "supervisor") {
      hiddenDiv.style.display = "none";
    } else if (role === "director") {
      hiddenDiv.style.display = "none";
    } else if (role === "employee") {
      hiddenDiv.style.display = "block";
    }

    this.props.supervisor.map(d => {
      if (d.supervisor_id === this.props.user.supervisor_id) {
        supervisorName = d.name;
      }
    });

    return (
      <div>
        <Layout>
          <HeaderNav />

          <Content
            className="container"
            style={{
              display: "flex",
              margin: "24px 16px 0",
              justifyContent: "space-around",
              paddingBottom: "160px"
            }}
          >
            <div
              style={{
                padding: 150,
                paddingBottom: 50,
                paddingTop: 50,
                background: "#fff",
                minHeight: 360
              }}
            >
              <h1> Form Edit User </h1>
              <div>
                <Form onSubmit={this.handleSubmit} className="login-form">
                  <FormItem {...formItemLayout} label="Name">
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="name"
                      value={this.props.user.name}
                      onChange={this.handleOnChange}
                    />
                  </FormItem>

                  <FormItem {...formItemLayout} label="Email">
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="email"
                      value={this.props.user.email}
                      onChange={this.handleOnChange}
                    />
                  </FormItem>

                  <FormItem {...formItemLayout} label="Gender">
                    <Select
                      id="gender"
                      name="gender"
                      placeholder="Select gender"
                      optionFilterProp="children"
                      onChange={this.handleChangeGender}
                      onSelect={(value, event) =>
                        this.handleChangeSelect(value, event)
                      }
                      onFocus={this.handleFocus}
                      onBlur={this.handleBlur}
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      value={this.props.user.gender}
                    >
                      <Option value="Male">Male</Option>
                      <Option value="Female">Female</Option>
                    </Select>
                  </FormItem>

                  <FormItem {...formItemLayout} label="Position">
                    <Input
                      type="text"
                      id="position"
                      name="position"
                      placeholder="position"
                      value={this.props.user.position}
                      onChange={this.handleOnChange}
                    />
                  </FormItem>

                  <FormItem {...formItemLayout} label="Start Working Date">
                    <DatePicker
                      id="start_working_date"
                      name="start_working_date"
                      format={dateFormat}
                      value={moment(
                        this.props.user.start_working_date,
                        dateFormat
                      )}
                      onChange={this.onBackOn}
                      style={formStyle}
                    />
                  </FormItem>

                  <FormItem {...formItemLayout} label="Mobile Phone">
                    <Input
                      type="text"
                      id="mobile_phone"
                      name="mobile_phone"
                      placeholder="mobile_phone"
                      value={this.props.user.mobile_phone}
                      onChange={this.handleOnChange}
                    />
                  </FormItem>

                  <FormItem {...formItemLayout} label="Role">
                    <Select
                      id="role"
                      name="role"
                      placeholder="Select Role"
                      optionFilterProp="children"
                      onChange={this.handleChangeRole}
                      onSelect={(value, event) =>
                        this.handleChangeSelect(value, event)
                      }
                      showSearch
                      onFocus={this.handleFocus}
                      onBlur={this.handleBlur}
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      value={this.props.user.role}
                    >
                      <Option value="employee">Employee</Option>
                      <Option value="supervisor">Supervisor</Option>
                      <Option value="director">Director</Option>
                    </Select>
                  </FormItem>

                  <div id="supervisor">
                    <FormItem {...formItemLayout} label="Supervisor">
                      <Select
                        id="supervisor_id"
                        name="supervisor_id"
                        placeholder="Select Supervisor"
                        optionFilterProp="children"
                        onChange={this.handleChangeSupervisor}
                        onSelect={(value, event) =>
                          this.handleChangeSelect(value, event)
                        }
                        showSearch
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        filterOption={(input, option) =>
                          option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                        value={supervisorName}
                      >
                        {this.props.supervisor.map(d => (
                          <Option key={d.supervisor_id}>{d.name}</Option>
                        ))}
                      </Select>
                    </FormItem>
                  </div>

                  <FormItem>
                    <Button
                      onClick={() => {
                        this.saveEdit();
                      }}
                      htmlType="submit"
                      type="primary"
                    >
                      Edit
                    </Button>
                  </FormItem>
                </Form>
              </div>
            </div>
          </Content>

          <Footer />
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.editUserReducer.loading,
  user: state.editUserReducer.user,
  supervisor: state.AddSupervisorReducer.supervisor
});

const WrappedRegisterForm = Form.create()(AdminEditPage);

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchedEdit,
      handleEdit,
      saveEditUser,
      SupervisorAdd
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedRegisterForm);
