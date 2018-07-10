import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  fetchedEdit,
  handleEdit,
  saveEditLeave
} from "../store/Actions/editRequestAction";
import moment from "moment-business-days";
import {
  Layout,
  Button,
  Form,
  Input,
  Select,
  Checkbox,
  DatePicker
} from "antd";
import HeaderNav from "./menu/HeaderNav";
import Footer from "./menu/Footer";
const { Content } = Layout;
const { TextArea } = Input;
const FormItem = Form.Item;
const Option = Select.Option;

class LeaveEditPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      from: null,
      to: null,
      endOpen: false
    };

    this.saveEdit = this.saveEdit.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleChangeTypeOfLeave = this.handleChangeTypeOfLeave.bind(this);
    this.disabledDateBack = this.disabledDateBack.bind(this);
    this.handleOnChangeNumber = this.handleOnChangeNumber.bind(this);
    this.handleOnChangeID = this.handleOnChangeID.bind(this);
  }

  componentDidMount() {
    if (
      localStorage.getItem("role") !== "employee" &&
      localStorage.getItem("role") !== "supervisor"
    ) {
      this.props.history.push("/");
    }

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

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.leave !== this.props.leave) {
  //     var momentObjFrom = moment( nextProps.leave.date_from);
  //     var momentObjTo = moment( nextProps.leave.to);
  //     this.setState({
  //       from: momentObjFrom,
  //       to: momentObjTo
  //     });
  //   }    
  // }

  saveEdit = () => {
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

  handleChangeTypeOfLeave(value) {
    let newLeave = {
      ...this.props.leave,
      type_leave_id: value
    };
    this.props.handleEdit(newLeave);
  }

  handleChangeSelect(value, event) {
    console.log("selected=======>", value);
  }

  disabledStartDate = startValue => {
    const endValue = this.state.to;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  };

  disabledEndDate = endValue => {
    const startValue = this.state.from;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };

  onChange = (field, value) => {
    this.setState({
      [field]: value
    });
  };

  onStartChange = value => {
    if (value !== null) {
      const date = new Date(value._d),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      let newDate = [day, mnth, date.getFullYear()].join("-");
      let dateFrom = {
        ...this.props.leave,
        date_from: newDate
      };

      this.props.handleEdit(dateFrom);
    }

    this.onChange("from", value);
  };

  onEndChange = value => {
    if (value !== null) {
      const date = new Date(value._d),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      let newDate = [day, mnth, date.getFullYear()].join("-");
      let dateTo = {
        ...this.props.leave,
        date_to: newDate
      };

      this.props.handleEdit(dateTo);
    }

    this.onChange("to", value);
  };

  onBackOn = value => {
    if (value !== null) {
      const date = new Date(value._d),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      let newDate = [day, mnth, date.getFullYear()].join("-");
      let backOn = {
        ...this.props.leave,
        back_on: newDate
      };

      this.props.handleEdit(backOn);
    }
  };

  disabledDate(current) {
    let workDay = moment()
      .startOf("month")
      .monthBusinessWeeks();
    return current && current < moment().endOf("day");
  }

  disabledDateBack(current) {
    return this.state.to && this.state.to > current;
  }

  handleStartOpenChange = open => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  };

  handleEndOpenChange = open => {
    this.setState({ endOpen: open });
  };

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

  handleOnChangeID = value => {
    this.onChange("contactID", value);
  };

  handleOnChangeNumber = e => {
    let newLeave = {
      ...this.props.leave,
      contact_number: e.target.value
    };
    this.props.handleEdit(newLeave);
    console.log(newLeave);
  };

  handleBlur() {
    console.log("blur");
  }

  handleFocus() {
    console.log("focus");
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { from, to, endOpen } = this.state;
    const dates = this.getDates(new Date(from), new Date(to));
    const arr = [];
    console.log("=============", this.state.from);
    console.log("=============", this.state.to);

    const elements = [];
    const dateFormat = "DD-MM-YYYY";
    const now = moment()
      .startOf("month")
      .monthBusinessDays();

    dates.map((fulldate, i) => {
      const date = new Date(fulldate),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      arr.push([day, mnth, date.getFullYear()].join("-"));
      return arr;
    });

    for (let i = 0; i < arr.length; i++) {
      elements.push(
        <DatePicker
          id="half_day"
          name="half_day"
          format={dateFormat}
          defaultValue={moment(arr[i], dateFormat)}
          disabled
          style={{
            width: "50%"
          }}
        />,
        "  Is Half Day  ",
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
      },
      style: {}
    };

    const formStyle = {
      width: "100%"
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
            <h1> Form Leave Request </h1>

            <Form onSubmit={this.handleSubmit} className="login-form">
              <FormItem {...formItemLayout} label="Type Of Leave">
                <Select
                  id="type_leave_id"
                  name="type_leave_id"
                  placeholder="Select type of leave"
                  optionFilterProp="children"
                  value={this.props.leave.type_leave_id}
                  onChange={this.handleChangeTypeOfLeave}
                  onSelect={(value, event) =>
                    this.handleChangeSelect(value, event)
                  }
                  onFocus={this.handleFocus}
                  onBlur={this.handleBlur}
                  showSearch
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  style={formStyle}
                >
                  <Option value={11}>Annual Leave</Option>
                  <Option value={22}>Errand Leave</Option>
                  <Option value={33}>Sick Leave</Option>
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
                  style={formStyle}
                />
              </FormItem>

              <FormItem {...formItemLayout} label="From">
                <DatePicker
                  id="date_from"
                  name="date_from"                  
                  format={dateFormat}
                  value={from}
                  defaultValue={moment(
                    this.props.leave.date_from,
                    "DD-MM-YYYY"
                  )}                                   
                  onChange={this.onStartChange}
                  onOpenChange={this.handleStartOpenChange}
                  style={formStyle}
                />
              </FormItem>
              <FormItem {...formItemLayout} label="To">
                <DatePicker
                  id="date_to"
                  name="date_to"                  
                  format={dateFormat}                  
                  value={to}
                  defaultValue={moment(this.props.leave.date_to, "DD-MM-YYYY")}                  
                  onChange={this.onEndChange}
                  open={endOpen}
                  onOpenChange={this.handleEndOpenChange}
                  style={formStyle}
                />
              </FormItem>
              <FormItem>
                <Checkbox
                  id="add_half_day"
                  name="add_half_day"
                  onChange={this.onChangeAddHalfDay}
                  style={formStyle}
                >
                  Add Half Day
                </Checkbox>
              </FormItem>

              <div id="halfDay">
                <FormItem {...formItemLayout} label="Half Day">
                  {elements}
                </FormItem>
              </div>

              <FormItem {...formItemLayout} label="Back to work on">
                <DatePicker
                  id="back_on"
                  name="back_on"
                  format={dateFormat}
                  placeholder="Back to work"
                  // defaultValue={moment(this.props.leave.back_on, "DD-MM-YYYY")}
                  disabledDate={this.disabledDateBack}
                  onChange={this.onBackOn}
                  style={formStyle}
                />
              </FormItem>

              <FormItem {...formItemLayout} label="Contact Address">
                <TextArea
                  type="text"
                  id="contact_address"
                  name="contact_address"
                  placeholder="contact_address, email, etc"
                  value={this.props.leave.contact_address}
                  onChange={this.handleOnChange}
                  autosize={{ minRows: 2, maxRows: 8 }}
                  style={formStyle}
                />
              </FormItem>

              <FormItem {...formItemLayout} label="Contact Number">
                <Input
                  type="text"
                  id="contact_number"
                  name="contact_number"
                  placeholder="Phone number"
                  value={this.props.leave.contact_number}
                  onChange={this.handleOnChangeNumber}
                  style={formStyle}
                />
              </FormItem>
              <FormItem>
                <Button
                  onClick={this.saveEdit}
                  htmlType="submit"
                  type="primary"
                  style={{
                    width: "35%"
                  }}
                >
                  EDIT
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
