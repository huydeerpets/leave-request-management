import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { formOnchange, SumbitSignUp } from "../store/Actions/signupActions";
import { SupervisorAdd } from "../store/Actions/AddSupervisorAction";

import {
  Layout,
  Form,
  Input,
  Select,
  Button,
  DatePicker,
  Alert,
  notification,
  message
} from "antd";
import HeaderNav from "./menu/HeaderAdmin";
import Footer from "./menu/Footer";
const { Content } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;

class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contactID: "+62"
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnChangeNumber = this.handleOnChangeNumber.bind(this);
    this.handleChangeGender = this.handleChangeGender.bind(this);
    this.handleChangeRole = this.handleChangeRole.bind(this);
    this.handleChangeSupervisor = this.handleChangeSupervisor.bind(this);
    this.onStartWorking = this.onStartWorking.bind(this);
    this.handleOnChangeID = this.handleOnChangeID.bind(this);
    this.handleOnChangePhone = this.handleOnChangePhone.bind(this);
  }

  componentWillMount() {
    if (!localStorage.getItem("token")) {
      this.props.history.push("/");
    } else if (localStorage.getItem("role") !== "admin") {
      this.props.history.push("/");
    }
  }

  componentDidMount() {
    this.props.SupervisorAdd();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
    this.props.SumbitSignUp(this.props.signupForm);

    if (JSON.stringify(this.props.error) !== "{}") {
      message.error(JSON.stringify(this.props.error));
    } else {      
      message.error(`"regiter failed, please field out all fieled"`);
    }
  };

  handleOnChange = e => {
    let newUser = {
      ...this.props.signupForm,
      [e.target.name]: e.target.value
    };
    this.props.formOnchange(newUser);

    this.props.form.setFieldsValue({
      [e.target.name]: e.target.value
    });
  };

  onStartWorking = value => {
    if (value !== null) {
      const date = new Date(value._d),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      let newDate = [day, mnth, date.getFullYear()].join("-");

      let startDate = {
        ...this.props.signupForm,
        start_working_date: newDate
      };

      this.props.formOnchange(startDate);
    }
  };

  handleOnChangeNumber = e => {
    let employee_num = {
      ...this.props.signupForm,
      employee_number: Number(e.target.value)
    };
    this.props.formOnchange(employee_num);
  };

  handleChangeGender(value, event) {
    let gender = {
      ...this.props.signupForm,
      gender: value
    };

    this.props.formOnchange(gender);
  }

  handleChangeRole(value, event) {
    let role = {
      ...this.props.signupForm,
      role: value
    };

    this.props.formOnchange(role);
  }

  handleChangeSupervisor(value, event) {
    let supervisor = {
      ...this.props.signupForm,
      supervisor_id: Number(value)
    };

    this.props.formOnchange(supervisor);
  }

  handleChangeSelectRole(value, event) {
    let hiddenDiv = document.getElementById("roles");
    if (value === "employee") {
      hiddenDiv.style.display = "block";
    } else {
      hiddenDiv.style.display = "none";
    }
    console.log("selected=======>", value);
  }

  handleChangeSelect(value, event) {
    console.log("selected=======>", value);
  }

  handleOnChangeID = value => {
    this.setState({ contactID: value });
    console.log("selected=======>", value);
  };

  handleOnChangePhone = e => {
    let newLeave = {
      ...this.props.signupForm,
      mobile_phone: `${this.state.contactID}${e.target.value}`
    };
    this.props.formOnchange(newLeave);
    console.log("==================>", newLeave);
  };

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
    const { getFieldDecorator } = this.props.form;
    const dateFormat = "DD-MM-YYYY";
    const formStyle = {
      width: "100%"
    };

    const prefixSelector = getFieldDecorator("prefix", {
      initialValue: "+62"
    })(
      <Select onChange={this.handleOnChangeID} style={{ width: 70 }}>
        <Option value="+62">+62</Option>
        <Option value="+66">+66</Option>
      </Select>
    );

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
              <h1> Form Register User </h1>
              <div>
                <Form onSubmit={this.handleSubmit} className="login-form">
                  <FormItem {...formItemLayout} label="Employee Number">
                    {getFieldDecorator("input-number", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your Employee Number!"
                        }
                      ]
                    })(
                      <Input
                        type="number"
                        id="employee_number"
                        name="employee_number"
                        placeholder="employee_number"
                        onChange={this.handleOnChangeNumber}
                      />
                    )}
                  </FormItem>

                  <FormItem {...formItemLayout} label="Name">
                    {getFieldDecorator("name", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your Name!"
                        }
                      ]
                    })(
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="name"
                        onChange={this.handleOnChange}
                      />
                    )}
                  </FormItem>

                  <FormItem {...formItemLayout} label="Email">
                    {getFieldDecorator("email", {
                      rules: [
                        {
                          type: "email",
                          message: "The input is not valid E-mail!"
                        },
                        {
                          required: true,
                          message: "Please input your E-mail!"
                        }
                      ]
                    })(
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="email"
                        onChange={this.handleOnChange}
                      />
                    )}
                  </FormItem>

                  <FormItem {...formItemLayout} label="Gender">
                    {getFieldDecorator("select", {
                      rules: [
                        {
                          required: true,
                          message: "Please select Gender!"
                        }
                      ]
                    })(
                      <Select
                        id="gender"
                        name="gender"
                        placeholder="Select gender"
                        optionFilterProp="children"
                        onChange={this.handleChangeGender}
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
                      >
                        <Option value="Male">Male</Option>
                        <Option value="Female">Female</Option>
                      </Select>
                    )}
                  </FormItem>

                  <FormItem {...formItemLayout} label="Position">
                    {getFieldDecorator("position", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your Position!"
                        }
                      ]
                    })(
                      <Input
                        type="text"
                        id="position"
                        name="position"
                        placeholder="position"
                        onChange={this.handleOnChange}
                      />
                    )}
                  </FormItem>

                  <FormItem {...formItemLayout} label="Start Working Date">
                    {getFieldDecorator("start_working_date", {
                      rules: [
                        {
                          required: true,
                          message: "Please choose your Start Working Date!"
                        }
                      ]
                    })(
                      <DatePicker
                        id="start_working_date"
                        name="start_working_date"
                        onChange={this.onStartWorking}
                        format={dateFormat}
                        placeholder="start working date"
                        style={formStyle}
                      />
                    )}
                  </FormItem>

                  <FormItem {...formItemLayout} label="Mobile Phone">
                    {getFieldDecorator("mobile_phone", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your Mobile Phone!"
                        }
                      ]
                    })(
                      <Input
                        type="text"
                        id="mobile_phone"
                        name="mobile_phone"
                        placeholder="mobile phone"
                        addonBefore={prefixSelector}
                        onChange={this.handleOnChangePhone}
                      />
                    )}
                  </FormItem>

                  <FormItem {...formItemLayout} label="Role">
                    {getFieldDecorator("role", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your E-mail!"
                        }
                      ]
                    })(
                      <Select
                        id="role"
                        name="role"
                        placeholder="Select Role"
                        optionFilterProp="children"
                        onChange={this.handleChangeRole}
                        onSelect={(value, event) =>
                          this.handleChangeSelectRole(value, event)
                        }
                        showSearch
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        filterOption={(input, option) =>
                          option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        <Option value="employee">Employee</Option>
                        <Option value="supervisor">Supervisor</Option>
                        <Option value="director">Director</Option>
                      </Select>
                    )}
                  </FormItem>

                  <div id="roles">
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
                      >
                        {!this.props.supervisor
                          ? ""
                          : this.props.supervisor.map(d => (
                              <Option key={d.supervisor_id}>{d.name}</Option>
                            ))}
                      </Select>
                    </FormItem>
                  </div>

                  <Input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="password"
                    value={this.props.signupForm.password}
                    onChange={this.handleOnChange}
                    disabled
                    style={{ display: "none" }}
                  />

                  <FormItem>
                    <Button
                      onClick={this.handleSubmit}
                      htmlType="submit"
                      type="primary"
                    > CREATE</Button>
                  </FormItem>
                </Form>
              </div>
            </div>
          </Content>

          <Footer style={{ textAlign: "center" }}>
            <p>
              <a href="http://opensource.org/licenses/mit-license.php"> MIT</a>.
              The website content is licensed{" "}
              <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
                CC BY NC SA 4.0
              </a>.
            </p>
          </Footer>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  signupForm: state.signupReducer.user,
  error: state.signupReducer.error,
  supervisor: state.AddSupervisorReducer.supervisor
});

const WrappedRegisterForm = Form.create()(RegisterPage);

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      formOnchange,
      SumbitSignUp,
      SupervisorAdd
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedRegisterForm);
