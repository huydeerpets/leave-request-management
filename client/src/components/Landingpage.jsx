import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { handleFormInput, submitLogin } from "../store/Actions/loginActions";
import { Layout, Form, Icon, Input, Button, Menu } from "antd";
const { Header, Footer, Content } = Layout;
const FormItem = Form.Item;

class Landingpage extends Component {
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

  handleOnChangeLogin = e => {
    let loginForm = {
      ...this.props.loginForm,
      [e.target.name]: e.target.value
    };
    this.props.handleFormInput(loginForm);
  };
  handleSumbitLogin = e => {
    e.preventDefault();
    this.props.submitLogin(this.props.loginForm, url => {
      this.props.history.push(url);
    });
  };

  render() {
    return (
      <div>
        <Layout>
          <Header>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["1"]}
              style={{ lineHeight: "64px" }}
            >
              <Menu.Item key="1">
                <NavLink to="/">Home</NavLink>
              </Menu.Item>
              <Menu.Item key="2">
                <NavLink to="/login">Login</NavLink>
              </Menu.Item>
            </Menu>
          </Header>

          <Content
            className="container"
            style={{
              display: "flex",
              margin: "24px 16px 0",
              justifyContent: "space-around",
              paddingBottom: "175px"
            }}
          >
            <div style={{ padding: 150, background: "#fff", minHeight: 360 }}>
              <h1> Login Form </h1>
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
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
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
                    htmlType="submit"
                    className="login-form-button"
                    onClick={this.handleSumbitLogin}
                  >
                    {" "}
                    Log in
                  </Button>
                </FormItem>
                <NavLink to="/register">forgot password?</NavLink>
              </Form>
            </div>
          </Content>

          <Footer style={{ textAlign: "center" }}>
            <p>
              <a href="http://opensource.org/licenses/mit-license.php"> MIT</a>.
              The website content is licensed{" "}
              <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
                CC BY NC SA 4.0
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Landingpage);
