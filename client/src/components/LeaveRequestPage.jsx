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
    this.state = {
      from: "",
      to: ""
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleChangeTypeOfLeave = this.handleChangeTypeOfLeave.bind(this);
    this.handleChangeDateFrom = this.handleChangeDateFrom.bind(this);
    this.handleChangeDateTo = this.handleChangeDateTo.bind(this);
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

  handleChangeTypeOfLeave(value) {
    let typeLeave = {
      ...this.props.leaveForm,
      type_of_leave: value
    };
    this.props.formOnChange(typeLeave);
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

  handleChangeDateFrom(e) {
    let dateFrom = {
      ...this.props.leaveForm,
      date_from: e.target.value
    };

    this.setState({ from: e.target.value });
    this.props.formOnChange(dateFrom);
    console.log("datefrom===========", e.target.value);
  }

  handleChangeDateTo(e) {
    let dateTo = {
      ...this.props.leaveForm,
      date_to: e.target.value
    };

    this.setState({ to: e.target.value });
    this.props.formOnChange(dateTo);
    console.log("dateto===========", e.target.value);
  }

  onChangeAddHalfDay(e) {
    let hiddenDiv = document.getElementById("halfDay");
    if (e.target.checked === true) {
      hiddenDiv.style.display = "block";
    } else {
      hiddenDiv.style.display = "none";
    }
    console.log(`checked add hald day = ${e.target.checked}`);
  }

  onChangeIsHalfDay(e) {
    console.log(`checked is half day= ${e.target.checked}`);
  }

  getDates(startDate, endDate) {
    let dates = [],
      currentDate = startDate,
      addDays = function(days) {
        const date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      };
    while (currentDate <= endDate) {
      dates.push(currentDate);
      currentDate = addDays.call(currentDate, 1);
    }
    return dates;
  }

  handleBlur() {
    console.log("blur");
  }

  handleFocus() {
    console.log("focus");
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const dates = this.getDates(
      new Date(this.state.from),
      new Date(this.state.to)
    );

    const arr = [];
    dates.map((fulldate, i) => {
      const date = new Date(fulldate),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      arr.push([date.getFullYear(), mnth, day].join("-"));
      console.log("============", [date.getFullYear(), mnth, day].join("-"));
    });

    const elements = [];
    for (let i = 0; i < arr.length; i++) {
      elements.push(
        <Input
          style={{
            width: 150
          }}
          type="date"
          id="half_day"
          name="half_day"
          value={arr[i]}
          disabled
        />,
        " Is Half Day ",
        <Checkbox
          id="is_half_day"
          name="is_half_day"
          onChange={this.onChangeIsHalfDay}
        />,
        <br />
      );
    }

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
                  onChange={this.handleChangeTypeOfLeave}
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
                  id="date_from"
                  name="date_from"
                  value={this.props.leaveForm.date_from}
                  onChange={this.handleChangeDateFrom}
                />
              </FormItem>
              <FormItem {...formItemLayout} label="To">
                <Input
                  type="date"
                  id="date_to"
                  name="date_to"
                  value={this.props.leaveForm.date_to}
                  onChange={this.handleChangeDateTo}
                />
              </FormItem>
              <FormItem>
                <Checkbox
                  id="add_half_day"
                  name="add_half_day"
                  onChange={this.onChangeAddHalfDay}
                >
                  Add Half Day
                </Checkbox>
              </FormItem>

              <div id="halfDay">
                <FormItem {...formItemLayout} label="Add Half Day">
                  {elements}
                </FormItem>
              </div>

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
