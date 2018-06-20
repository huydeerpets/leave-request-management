import React from "react";
import { connect } from "react-redux";
import HeaderNav from "./menu/HeaderNav";
import Footer from "./menu/Footer";
import { Layout } from "antd";
const { Content } = Layout;

export class LandingSupervisor extends React.Component {
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

export default connect()(LandingSupervisor);
