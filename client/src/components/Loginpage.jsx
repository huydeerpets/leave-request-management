import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { handleFormInput, submitLogin } from "../store/Actions/loginActions";
import { Layout, Form, Icon, Input, Button, message } from "antd";
import Footer from "./menu/Footer";
const { Header, Content } = Layout;
const FormItem = Form.Item;

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      iconLoading: false
    };
    this.handleOnChangeLogin = this.handleOnChangeLogin.bind(this);
  }

  componentDidMount() {
    if (
      localStorage.getItem("token") &&
      localStorage.getItem("role") === "admin"
    ) {
      this.props.history.push("/admin");
    } else if (
      localStorage.getItem("token") &&
      localStorage.getItem("role") === "director"
    ) {
      this.props.history.push("/director");
    } else if (
      localStorage.getItem("token") &&
      localStorage.getItem("role") === "supervisor"
    ) {
      this.props.history.push("/supervisor");
    } else if (
      localStorage.getItem("token") &&
      localStorage.getItem("role") === "employee"
    ) {
      this.props.history.push("/employee");
    }
  }

  handleSumbitLogin = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });

    this.props.submitLogin(this.props.loginForm, url => {
      this.props.history.push(url);
    });

    message.error(JSON.stringify(this.props.error.message));
    // if (this.props.error.is_error === true) {
    //   message.error(JSON.stringify(this.props.error.message));
    // } else if (this.props.error.is_error === false) {
    //   message.success("Login success!");
    // }
    // if (this.props.success) {
    //   message.success("Login success");
    // } else if (JSON.stringify(this.props.error) !== "{}") {
    //   message.error(JSON.stringify(this.props.error));
    // } else {
    //   message.error(`"please check your email and password"`);
    // }
  };

  handleOnChangeLogin = e => {
    let loginForm = {
      ...this.props.loginForm,
      [e.target.name]: e.target.value
    };

    this.props.form.setFieldsValue({
      [e.target.name]: e.target.value
    });

    this.props.handleFormInput(loginForm);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Layout className="App">
          <Header className="App-header">
            <div className="header-content">
              <h1>
                <Icon type="home" /> E-Leave
              </h1>
            </div>
          </Header>

          <Content
            className="container"
            style={{
              display: "flex",
              margin: "56px 15px ",
              justifyContent: "space-around"
            }}
          >
            <div
              style={{ padding: 70, background: "#fff", "border-radius": 10 }}
            >
              <h1> Welcome! </h1>
              <Form onSubmit={this.handleSumbitLogin} className="login-form">
                <FormItem>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="email"
                    value={this.props.loginForm.email}
                    onChange={this.handleOnChangeLogin}
                    prefix={
                      <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                  />
                </FormItem>
                <FormItem>
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="password"
                    value={this.props.loginForm.password}
                    onChange={this.handleOnChangeLogin}
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                  />
                </FormItem>

                <FormItem>
                  <Button
                    type="primary"
                    ghost
                    htmlType="submit"
                    className="login-form-button"
                    onClick={this.handleSumbitLogin}
                  >
                    LOGIN
                  </Button>
                </FormItem>
                <NavLink to="/reset-password">forgot password?</NavLink>

                <FormItem />
              </Form>
            </div>
          </Content>

          <Footer />
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loginForm: state.loginReducer.login,
  error: state.loginReducer
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      handleFormInput,
      submitLogin
    },
    dispatch
  );

const WrappedLoginForm = Form.create()(LoginPage);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedLoginForm);
