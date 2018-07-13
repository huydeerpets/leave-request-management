import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { handleEdit, updateNewPassword } from "../store/Actions/passwordAction";
import HeaderNav from "./menu/HeaderNav";
import Footer from "./menu/Footer";
import { Layout, Form, Input, Button } from "antd";
const { Content } = Layout;
const FormItem = Form.Item;

class PasswordPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      from: null,
      to: null,
      endOpen: false
    };

    this.handleOnChange = this.handleOnChange.bind(this);
  }

  componentWillMount() {
    if (!localStorage.getItem("token")) {
      this.props.history.push("/");
    } else if (
      localStorage.getItem("role") !== "employee" &&
      localStorage.getItem("role") !== "supervisor" &&
      localStorage.getItem("role") !== "director"
    ) {
      this.props.history.push("/");
    }
  }

  updatePassword = () => {    
    this.props.updateNewPassword(this.props.passwordForm, url => {
      this.props.history.push(url);
    });
  };

  handleOnChange = e => {
    let newPassword = {
      ...this.props.passwordForm,
      [e.target.name]: e.target.value
    };
    this.props.handleEdit(newPassword);
    console.log("change", newPassword);
  };

  render() {    
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
            <h1> Form Update Password </h1>

            <Form className="login-form">
              <FormItem {...formItemLayout} label="Old Password">
                <Input
                  type="password"
                  id="old_password"
                  name="old_password"
                  placeholder="old password"
                  onChange={this.handleOnChange}
                  style={formStyle}
                />
              </FormItem>

              <FormItem {...formItemLayout} label="New Password">
                <Input
                  type="password"
                  id="new_password"
                  name="new_password"
                  placeholder="new password"
                  onChange={this.handleOnChange}
                  style={formStyle}
                />
              </FormItem>

              <FormItem {...formItemLayout} label="Confirm Password">
                <Input
                  type="password"
                  id="confirm_password"
                  name="confirm_password"
                  placeholder="confirm password"
                  onChange={this.handleOnChange}
                  style={formStyle}
                />
              </FormItem>

              <FormItem>
                <Button
                  onClick={this.updatePassword}
                  htmlType="submit"
                  type="primary"
                  style={{
                    width: "35%"
                  }}
                >
                  Update
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
  passwordForm: state.passwordReducer
});

const WrappedPasswordForm = Form.create()(PasswordPage);

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      handleEdit,
      updateNewPassword
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedPasswordForm);
