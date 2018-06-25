import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  formOnChange,
  SumbitLeave,
  saveSelectValue
} from "../store/Actions/leaveRequestAction";
import HeaderNav from "./menu/HeaderNav";
import Footer from "./menu/Footer";
import { Layout, Form, Icon, Input, Select, Button } from "antd";
const { Content } = Layout;
const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;

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

  handleSubmit = e => {
    e.preventDefault();
    this.props.leaveForm.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
    this.props.SumbitLeave(this.props.leaveForm);
  };

  handleOnChange = e => {
    let newLeave = {
      ...this.props.leaveForm,
      [e.target.name]: e.target.value
    };
    this.props.formOnChange(newLeave);
    console.log("=========>", e.preventDefault());
    console.log("=========>", newLeave);
  };

  handleChangeSelect(value, event) {
    console.log(value);
    console.log(event);
    var hiddenDiv = document.getElementById("showMe");
    if (value === "errand_leave") {
      hiddenDiv.style.display = "block";
    } else if (value === "sick_leave") {
      hiddenDiv.style.display = "block";
    } else if (value === "other_leave") {
      hiddenDiv.style.display = "block";
    } else {
      hiddenDiv.style.display = "none";
    }
    
  }

  handleBlur() {
    console.log("blur");
  }

  handleFocus() {
    console.log("focus");
  }

  saveSelectValue = (e, id) => {
    let data = {};
    data.id = id;
    data.value = e.target.value;

    this.props.saveSelectValue(data);
  };

  render() {
    const { getFieldDecorator } = this.props.leaveForm;
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
              {/* <FormItem {...formItemLayout} label="Type Of Leave">
                <Input
                  type="text"
                  id="type_of_leave"
                  name="type_of_leave"
                  placeholder="type_of_leave"
                  value={this.props.leaveForm.type_of_leave}
                  onChange={this.handleOnChange}
                />
              </FormItem> */}

              <FormItem {...formItemLayout} label="Type Of Leave">
                <Select
                  type="text"
                  id="type_of_leave"
                  name="type_of_leave"
                  placeholder="Select type of leave"
                  showSearch
                  optionFilterProp="children"
                  onChange={this.handleChangeSelect}
                  onSelect={(value, event) => this.handleChangeSelect(value, event)}
                  onFocus={this.handleFocus}
                  onBlur={this.handleBlur}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value="errand_leave">Errand Leave</Option>
                  <Option value="sick_leave">Sick Leave</Option>
                  <Option value="annual_leave">Annual Leave</Option>
                  <Option value="marriage_leave">Marriage Leave</Option>
                  <Option value="maternity_leave">Maternity Leave</Option>
                  <Option value="other_leave">Other Leave</Option>
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
              <FormItem {...formItemLayout} label="Back to work on">
                <Input
                  type="date"
                  id="back_on"
                  name="back_on"
                  value={this.props.leaveForm.to}
                  onChange={this.handleOnChange}
                />
              </FormItem>

              <FormItem {...formItemLayout} label="Address Leave">
                <TextArea
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Autosize height with minimum and maximum number of lines"
                  value={this.props.leaveForm.address}
                  onChange={this.handleOnChange}
                  autosize={{ minRows: 2, maxRows: 6 }}
                />
              </FormItem>

              <FormItem {...formItemLayout} label="Phone Leave">
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

const WrappedLeaveForm = Form.create()(EmployeePage);

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
