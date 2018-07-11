import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { formOnChange, SumbitLeave } from "../store/Actions/leaveRequestAction";
import { typeLeaveFetchData } from "../store/Actions/typeLeaveAction";
import HeaderNav from "./menu/HeaderNav";
import Footer from "./menu/Footer";
import moment from "moment-business-days";
import {
  Layout,
  Form,
  Input,
  Select,
  Button,
  Checkbox,
  DatePicker
} from "antd";
const { Content } = Layout;
const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;

class LeaveRequestPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      from: null,
      to: null,
      endOpen: false,
      contactID: "+62"
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleChangeTypeOfLeave = this.handleChangeTypeOfLeave.bind(this);
    this.disabledDateBack = this.disabledDateBack.bind(this);
    this.handleOnChangeNumber = this.handleOnChangeNumber.bind(this);
    this.handleOnChangeID = this.handleOnChangeID.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
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
    this.props.typeLeaveFetchData();
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
  };

  handleChangeTypeOfLeave(value) {
    let typeLeave = {
      ...this.props.leaveForm,
      type_leave_id: Number(value)
    };
    this.props.formOnChange(typeLeave);
  }

  handleChangeSelect(value) {
    let hiddenDiv = document.getElementById("showMe");
    if (value === "22") {
      hiddenDiv.style.display = "block";
    } else if (value === "33") {
      hiddenDiv.style.display = "block";
    } else if (value === "66") {
      hiddenDiv.style.display = "block";
    } else {
      hiddenDiv.style.display = "none";
    }
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
        ...this.props.leaveForm,
        date_from: newDate
      };

      this.props.formOnChange(dateFrom);      

      var dateString = "07-15-2016";
      var dateObj = new Date(dateString);
      var momentObj = moment(dateObj);
      var momentString = momentObj.format("YYYY-MM-DD");      
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
        ...this.props.leaveForm,
        date_to: newDate
      };

      this.props.formOnChange(dateTo);
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
        ...this.props.leaveForm,
        back_on: newDate
      };

      this.props.formOnChange(backOn);
    }
  };

  disabledDate(current) {
    let workDay = moment()
      .startOf("month")
      .monthBusinessWeeks();

    // console.log("working day=======>", workDay);

    // console.log("curent=====>", current);
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
      ...this.props.leaveForm,
      contact_number: `${this.state.contactID}${e.target.value}`
    };
    this.props.formOnChange(newLeave);    
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

    const prefixSelector = getFieldDecorator("prefix", {
      initialValue: "+62"
    })(
      <Select onChange={this.handleOnChangeID} style={{ width: 70 }}>
        <Option value="+62">+62</Option>
        <Option value="+66">+66</Option>
      </Select>
    );

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
                  style={formStyle}
                >
                 {this.props.typeLeave.map(d => <Option key={d.id}>{d.type_name}</Option>)}           
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
                    style={formStyle}
                  />
                </FormItem>
              </div>
              <FormItem {...formItemLayout} label="From">
                <DatePicker
                  id="date_from"
                  name="date_from"
                  disabledDate={this.disabledDate}
                  format={dateFormat}
                  value={from}
                  placeholder="Start"
                  onChange={this.onStartChange}
                  onOpenChange={this.handleStartOpenChange}
                  style={formStyle}
                />
              </FormItem>
              <FormItem {...formItemLayout} label="To">
                <DatePicker
                  id="date_to"
                  name="date_to"
                  disabledDate={this.disabledEndDate}
                  format={dateFormat}
                  value={to}
                  placeholder="End"
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
                  disabledDate={this.disabledDateBack}
                  onChange={this.onBackOn}
                  format={dateFormat}
                  placeholder="Back to work"
                  style={formStyle}
                />
              </FormItem>

              <FormItem {...formItemLayout} label="Contact Address">
                <TextArea
                  type="text"
                  id="contact_address"
                  name="contact_address"
                  placeholder="contact_address, email, etc"                  
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
                  addonBefore={prefixSelector}                  
                  onChange={this.handleOnChangeNumber}
                  style={formStyle}
                />
              </FormItem>
              <FormItem>
                <Button
                  onClick={this.handleSubmit}
                  htmlType="submit"
                  type="primary"
                  style={{
                    width: "35%"
                  }}
                >
                  Create
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
  leaveForm: state.leaveRequestReducer,
  typeLeave : state.fetchTypeLeaveReducer.typeLeave
});

const WrappedLeaveForm = Form.create()(LeaveRequestPage);

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      formOnChange,
      SumbitLeave,
      typeLeaveFetchData
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedLeaveForm);
