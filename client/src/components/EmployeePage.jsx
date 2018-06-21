import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { formOnChange, SumbitLeave } from "../store/Actions/leaveRequestAction";
import moment from "moment";
import HeaderNav from "./menu/HeaderNav";
import Footer from "./menu/Footer";
import { Layout, Form, Icon, Input, Select, Button, DatePicker } from "antd";
const { Content } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;
const { MonthPicker, RangePicker } = DatePicker;

function range(start, end) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}

function disabledDate(current) {
  // Can not select days before today and today
  return current && current < moment().endOf("day");
}

function disabledDateTime() {
  return {
    disabledHours: () => range(0, 24).splice(4, 20),
    disabledMinutes: () => range(30, 60),
    disabledSeconds: () => [55, 56]
  };
}

function disabledRangeTime(_, type) {
  if (type === "start") {
    return {
      disabledHours: () => range(0, 60).splice(4, 20),
      disabledMinutes: () => range(30, 60),
      disabledSeconds: () => [55, 56]
    };
  }
  return {
    disabledHours: () => range(0, 60).splice(20, 4),
    disabledMinutes: () => range(0, 31),
    disabledSeconds: () => [55, 56]
  };
}

class EmployeePage extends Component {
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

  handleOnChange = e => {
    let newLeave = {
      ...this.props.leaveForm,
      [e.target.name]: e.target.value
    };
    this.props.formOnChange(newLeave);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.SumbitLeave(this.props.leaveForm);
  };

  handleChangeSelect(value) {
    console.log(`selected ${value}`);
  }

  handleBlur() {
    console.log("blur");
  }

  handleFocus() {
    console.log("focus");
  }

  saveSelectValue = (e,id) => {
    let data = {}
    data.id = id;
    data.value = e.target.value

    this.props.formOnChange(data);
    
  }
  

  render() {
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
            justifyContent: "space-around",
            paddingBottom: "160px"
          }}
        >
          <div style={{ padding: 150, background: "#fff", minHeight: 360 }}>
            <h1> Register Form </h1>
            <div>
              <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                  <Input
                    type="text"
                    id="type_of_leave"
                    name="type_of_leave"
                    placeholder="type_of_leave"
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    value={this.props.leaveForm.type_of_leave}
                    onChange={this.handleOnChange}
                  />
                </FormItem>

                <Select                
                  showSearch  
                  placeholder= "Type of leave"                                
                  onChange={this.handleChange}
                  optionFilterProp="children"
                  onChange={this.saveSelectValue}
                  onFocus={this.handleFocus}
                  onBlur={this.handleBlur}                  
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value="holiday">Holiday</Option>
                  <Option value="maternity">Maternity</Option>
                  <Option value="paternity">Paternity Leave</Option>
                  <Option value="sick">Sick Leave</Option>                  
                </Select>

                <FormItem>
                  <Input
                    type="text"
                    id="reason"
                    name="reason"
                    placeholder="reason"
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    value={this.props.leaveForm.reason}
                    onChange={this.handleOnChange}
                  />
                </FormItem>
                <FormItem>
                  <Input
                    type="date"
                    id="from"
                    name="from"
                    placeholder="from"
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    value={this.props.leaveForm.from}
                    onChange={this.handleOnChange}
                  />
                </FormItem>
                <FormItem>
                  <Input
                    type="date"
                    id="to"
                    name="to"
                    placeholder="to"
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    value={this.props.leaveForm.to}
                    onChange={this.handleOnChange}
                  />
                </FormItem>
                <FormItem>
                  <RangePicker
                    disabledDate={disabledDate}
                    disabledTime={disabledRangeTime}
                    showTime={{
                      hideDisabledOptions: true,
                      defaultValue: [
                        moment(this.props.leaveForm.from),
                        moment(this.props.leaveForm.to)
                      ]
                    }}
                    format="YYYY-MM-DD HH:mm:ss"
                    selected={
                      this.props.leaveForm.from
                        ? moment(this.props.leaveForm.from, "DD-MM-YYYY")
                        : null
                    }
                  />
                </FormItem>
                <FormItem>
                  <Input
                    type="text"
                    id="address"
                    name="address"
                    placeholder="address"
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    value={this.props.leaveForm.address}
                    onChange={this.handleOnChange}
                  />
                </FormItem>
                <FormItem>
                  <Input
                    type="text"
                    id="contact_leave"
                    name="contact_leave"
                    placeholder="contact_leave"
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
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
)(EmployeePage);
