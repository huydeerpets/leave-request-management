import React from "react";
import { connect } from "react-redux";
import HeaderNav from "./menu/HeaderNav";
import Footer from "./menu/Footer";
import { Layout } from "antd";
const { Content } = Layout;

export class SupervisorLandingPage extends React.Component {

  componentDidMount() {
    if (!localStorage.getItem("token")) {
      this.props.history.push("/");
    } else if (localStorage.getItem("role") !== "supervisor") {
      this.props.history.push("/");
    }
  }

  render() {
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
              paddingBottom: "336px"
            }}
          >
            <div style={{ padding: 150, background: "#fff", minHeight: 360 }}>
              <h1> Welcome! </h1>
            </div>
          </Content>

          <Footer />
        </Layout>
      </div>
    );
  }
}

export default connect()(SupervisorLandingPage);
