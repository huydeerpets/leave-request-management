import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { formOnChange, SumbitLeave } from "../store/Actions/leaveRequestAction";
import HeaderNav from "./menu/HeaderNav";
import Footer from "./menu/Footer";
import { Layout, Form, Input, Select, Button, Checkbox } from "antd";
const { Content } = Layout;
const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;

class LeaveRequestPage extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }
  componentWillMount() {
    if (!localStorage.getItem("token")) {
      this.props.history.push("/");
    } else if (
      localStorage.getItem("role") !== "employee" &&
      localStorage.getItem("role") !== "supervisor"
    ) {
      this.props.history.push("/");
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.SumbitLeave(this.props.leaveForm);
  };

  handleOnChange = e => {
    let newLeave = {
      ...this.props.leaveForm,
      [e.target.name]: e.target.value
    };
    this.props.formOnChange(newLeave);
    console.log("=========>", newLeave);
  };

  handleChange(value, e) {
    let newLeave = {
      ...this.props.leaveForm,
      ["type_of_leave"]: value
    };
    this.props.formOnChange(newLeave);
  }

  handleChangeSelect(value) {
    let hiddenDiv = document.getElementById("showMe");
    if (value === "Errand Leave") {
      hiddenDiv.style.display = "block";
    } else if (value === "Sick Leave") {
      hiddenDiv.style.display = "block";
    } else if (value === "Other Leave") {
      hiddenDiv.style.display = "block";
    } else {
      hiddenDiv.style.display = "none";
    }
    console.log("selected=======>", value);
  }

  handleBlur() {
    console.log("blur");
  }

  handleFocus() {
    console.log("focus");
  }

  onChange(e) {
    console.log(`checked = ${e.target.checked}`);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
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

    if (this.props.loading) {
      return <h1> loading... </h1>;
    }
    return (
      <Layout>
        <HeaderNav />

        <Content
          className="container"
          style={{
            display: "flex",
            margin: "24px 16px 0",
            justifyContent: "center",
            paddingBottom: "73px"
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
            <h1> Leave Request Form </h1>

            <Form onSubmit={this.handleSubmit} className="login-form">
              <FormItem {...formItemLayout} label="Type Of Leave">
                <Select
                  id="type_of_leave"
                  name="type_of_leave"
                  placeholder="Select type of leave"
                  optionFilterProp="children"
                  onChange={this.handleChange}
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
                  <Option value="Errand Leave">Errand Leave</Option>
                  <Option value="Sick Leave">Sick Leave</Option>
                  <Option value="Annual Leave">Annual Leave</Option>
                  <Option value="Marriage Leave">Marriage Leave</Option>
                  <Option value="Maternity Leave">Maternity Leave</Option>
                  <Option value="Other Leave">Other Leave</Option>
                </Select>
              </FormItem>

              <div id="showMe">
                <FormItem {...formItemLayout} label="Reason">
                  <Input
                    type="text"
                    id="reason"
                    name="reason"
                    placeholder="reason"
                    value={this.props.leaveForm.reason}
                    onChange={this.handleOnChange}
                  />
                </FormItem>
              </div>
              <FormItem {...formItemLayout} label="From">
                <Input
                  type="date"
                  id="from"
                  name="from"
                  value={this.props.leaveForm.from}
                  onChange={this.handleOnChange}
                />
              </FormItem>
              <FormItem {...formItemLayout} label="To">
                <Input
                  type="date"
                  id="to"
                  name="to"
                  value={this.props.leaveForm.to}
                  onChange={this.handleOnChange}
                />
              </FormItem>
              <FormItem>
                <Checkbox
                  id="half_day"
                  name="half_day"
                  onChange={this.onChange}
                >
                  Add Half Day
                </Checkbox>
              </FormItem>
              <FormItem {...formItemLayout} label="Back to work on">
                <Input
                  type="date"
                  id="back_on"
                  name="back_on"
                  value={this.props.leaveForm.back_on}
                  onChange={this.handleOnChange}
                />
              </FormItem>

              <FormItem {...formItemLayout} label="Contact Address">
                <TextArea
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Contact address"
                  value={this.props.leaveForm.address}
                  onChange={this.handleOnChange}
                  autosize={{ minRows: 2, maxRows: 6 }}
                />
              </FormItem>

              <FormItem {...formItemLayout} label="Contact Number">
                <Input
                  type="text"
                  id="contact_leave"
                  name="contact_leave"
                  placeholder="phone leave"
                  addonBefore={"+628"}
                  style={{ width: "100%" }}
                  value={this.props.leaveForm.contact_leave}
                  onChange={this.handleOnChange}
                />
              </FormItem>
              <FormItem>
                <Button
                  onClick={this.handleSubmit}
                  htmlType="submit"
                  type="primary"
                >
                  Register
                </Button>
              </FormItem>
            </Form>
          </div>
        </Content>

        <Footer />
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  leaveForm: state.leaveRequestReducer
});

const WrappedLeaveForm = Form.create()(LeaveRequestPage);

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      formOnChange,
      SumbitLeave
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedLeaveForm);
