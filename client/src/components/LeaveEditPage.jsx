import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Layout, Button, Form, Input, Select, Checkbox } from "antd";
import {
  fetchedEdit,
  handleEdit,
  saveEditLeave
} from "../store/Actions/editRequestAction";
import HeaderNav from "./menu/HeaderNav";
import Footer from "./menu/Footer";
const { Content } = Layout;
const { TextArea } = Input;
const FormItem = Form.Item;
const Option = Select.Option;

class LeaveEditPage extends Component {
  constructor(props) {
    super(props);

    this.saveEdit = this.saveEdit.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem("role") !== "employee") {
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
      let leave = this.props.history.location.state.leave.filter(
        el => el.id === id
      );
      this.props.fetchedEdit(leave[0]);
    }
  }

  saveEdit = () => {
    console.log(this.props.leave);
    this.props.saveEditLeave(this.props.leave, url => {
      this.props.history.push(url);
    });
  };

  handleOnChange = e => {
    let edit = {
      ...this.props.leave,
      [e.target.name]: e.target.value
    };
    this.props.handleEdit(edit);
  };

  handleChange(value, e) {
    let newLeave = {
      ...this.props.leave,
      type_of_leave: value
    };
    this.props.handleEdit(newLeave);
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
              <h1> Form Edit Leave Request </h1>
              <div>
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
                      value={this.props.leave.type_name}
                    >
                      <Option value={11}>Errand Leave</Option>
                      <Option value={22}>Sick Leave</Option>
                      <Option value={33}>Annual Leave</Option>
                      <Option value={44}>Marriage Leave</Option>
                      <Option value={55}>Maternity Leave</Option>
                      <Option value={66}>Other Leave</Option>
                    </Select>
                  </FormItem>

                  <FormItem {...formItemLayout} label="Reason">
                    <Input
                      type="text"
                      id="reason"
                      name="reason"
                      placeholder="reason"
                      value={this.props.leave.reason}
                      onChange={this.handleOnChange}
                    />
                  </FormItem>

                  <FormItem {...formItemLayout} label="From">
                    <Input
                      type="date"
                      id="date_from"
                      name="date_from"
                      value={this.props.leave.date_from}
                      onChange={this.handleOnChange}
                    />
                  </FormItem>

                  <FormItem {...formItemLayout} label="To">
                    <Input
                      type="date"
                      id="date_to"
                      name="date_to"
                      value={this.props.leave.date_to}
                      onChange={this.handleOnChange}
                    />
                  </FormItem>

                  <FormItem {...formItemLayout} label="Back to work on">
                    <Input
                      type="date"
                      id="back_on"
                      name="back_on"
                      value={this.props.leave.back_on}
                      onChange={this.handleOnChange}
                    />
                  </FormItem>

                  <FormItem {...formItemLayout} label="Contact Address">
                    <TextArea
                      type="text"
                      id="contact_address"
                      name="contact_address"                      
                      value={this.props.leave.contact_address}
                      onChange={this.handleOnChange}
                      autosize={{ minRows: 2, maxRows: 6 }}
                    />
                  </FormItem>

                  <FormItem {...formItemLayout} label="Contact Number">
                    <Input
                      type="text"
                      id="contact_number"
                      name="contact_number"                      
                      addonBefore={"+628"}
                      style={{ width: "100%" }}
                      value={this.props.leave.contact_number}
                      onChange={this.handleOnChange}
                    />
                  </FormItem>

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
  loading: state.editRequestReducer.loading,
  leave: state.editRequestReducer.leave
});

const WrappedRegisterForm = Form.create()(LeaveEditPage);

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchedEdit,
      handleEdit,
      saveEditLeave
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedRegisterForm);
