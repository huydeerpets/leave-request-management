import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { handleEdit, resetPassword } from "../store/Actions/resetPasswordAction";
import { Layout, Form, Icon, Input, Button } from "antd";
const { Header, Content } = Layout;
const { Footer } = Layout;
const FormItem = Form.Item;

class ResetPasswordPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      iconLoading: false
    };
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

    this.props.resetPassword(this.props.loginForm, url => {
      this.props.history.push(url);
    });
  };

  handleOnChangeLogin = e => {
    let loginForm = {
      ...this.props.loginForm,
      [e.target.name]: e.target.value
    };
    this.props.handleEdit(loginForm);
    console.log("================",loginForm)
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
              margin: "170px 15px ",
              justifyContent: "space-around"
            }}
          >
            <div
              style={{ padding: 100, background: "#fff", "border-radius": 7 }}
            >
              <h1> Welcome! </h1>
              <Form onSubmit={this.handleSumbitLogin} className="login-form">
                <FormItem>
                  {getFieldDecorator("email", {
                    rules: [
                      {
                        type: "email",
                        message: "The input is not valid E-mail!"
                      },
                      {
                        required: true,
                        message: "Please input your E-mail!"
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

                <FormItem>
                  <Button
                    type="primary"
                    ghost
                    htmlType="submit"
                    className="login-form-button"
                    onClick={this.handleSumbitLogin}
                  >
                    FORGOT
                  </Button>
                </FormItem>
                <NavLink to="/">login!</NavLink>

                <FormItem />
              </Form>
            </div>
          </Content>

           <Footer className="Login-footer">
            <p>
              <a href="http://opensource.org/licenses/mit-license.php"> MIT</a>.
              The website content is licensed{" "}
              <a href="http://www.tnis.com" target="_blank">
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
  loginForm: state.resetPasswordReducer
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      handleEdit,
      resetPassword
    },
    dispatch
  );

const WrappedLoginForm = Form.create()(ResetPasswordPage);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedLoginForm);
