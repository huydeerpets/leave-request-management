import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
// import MediaQuery from "react-responsive";
import { handleFormInput, submitLogin } from "../store/Actions/loginActions";
import { Layout, Form, Icon, Input, Button } from "antd";
const { Header, Content } = Layout;
const { Footer } = Layout;
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

  componentWillMount() {
    console.log(" ----------------- Login ----------------- ");
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

    this.props.form.validateFields();
  }

  handleSumbitLogin = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form");
      }
    });

    this.props.submitLogin(this.props.loginForm, url => {
      this.props.history.push(url);
    });
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

  hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;

    const emailError = isFieldTouched("email") && getFieldError("email");
    const passwordError =
      isFieldTouched("password") && getFieldError("password");

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
              margin: "138px 15px ",
              justifyContent: "space-around"
            }}
          >
            <div
              style={{ padding: 100, background: "#fff", "border-radius": 7 }}
            >
              <h1> Welcome! </h1>
              <Form onSubmit={this.handleSumbitLogin} className="login-form">
                <FormItem
                  validateStatus={emailError ? "error" : ""}
                  help={emailError || ""}
                >
                  {getFieldDecorator("email", {
                    rules: [
                      {
                        type: "email"
                      },
                      {
                        required: true
                      }
                    ]
                  })(
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="email"
                      value={this.props.loginForm.email}
                      onChange={this.handleOnChangeLogin}
                      prefix={
                        <Icon
                          type="mail"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                    />
                  )}
                </FormItem>
                <FormItem
                  validateStatus={passwordError ? "error" : ""}
                  help={passwordError || ""}
                >
                  {getFieldDecorator("password", {
                    rules: [
                      {
                        required: true
                      }
                    ]
                  })(
                    <Input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="password"
                      value={this.props.loginForm.password}
                      onChange={this.handleOnChangeLogin}
                      prefix={
                        <Icon
                          type="lock"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                    />
                  )}
                </FormItem>

                <FormItem>
                  <Button
                    type="primary"
                    ghost
                    htmlType="submit"
                    className="login-form-button"
                    onClick={this.handleSumbitLogin}
                    disabled={this.hasErrors(getFieldsError())}
                  >
                    LOGIN
                  </Button>
                </FormItem>
                <NavLink to="/reset-password">forgot password?</NavLink>

                <FormItem />
              </Form>
            </div>
          </Content>

          <Footer className="Login-footer">
            <p>
              <a href="http://opensource.org/licenses/mit-license.php"> MIT</a>.
              The website content is licensed{" "}
              <a href="http://www.tnis.com">
                &copy; P.T TNIS Service Indonesia
              </a>.
            </p>
          </Footer>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loginForm: state.loginReducer
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
