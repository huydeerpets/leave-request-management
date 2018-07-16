import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { userSummaryFetchData } from "../store/Actions/userSummaryAction";
import { userTypeFetch } from "../store/Actions/userTypeLeaveAction";
import HeaderNav from "./menu/HeaderNav";
import Footer from "./menu/Footer";
import { Layout, Row, Col } from "antd";
const { Content } = Layout;


export class LandingEmployeePage extends React.Component {
  componentDidMount() {
    if (!localStorage.getItem("token")) {
      this.props.history.push("/");
    } else if (localStorage.getItem("role") !== "employee") {
      this.props.history.push("/");
    }
    this.props.userTypeFetch();
    this.props.userSummaryFetchData();
  }

  render() {
    const summary = [];
    const typeLeave = [];
    const dataSummary = this.props.userSummary;
    const dataType = this.props.userType;
    if(dataSummary){
      for (let i = 0; i < dataSummary.length; i++) {
        summary.push(
          <p>
            {dataSummary[i].type_name}: {dataSummary[i].used} day out of{" "}
            {dataSummary[i].leave_remaining} day
          </p>
        );
      }
    }else {
      <p></p>
    }    

    for (let j in dataType) {
      if (dataType[j].type_name === "Sick Leave") {
        dataType[j].type_name = `${dataType[j].type_name} (up to 10 days)`;
      }
      typeLeave.push(
        <p>
          {" "}
          {dataType[j].type_name}: {dataType[j].leave_remaining} day{" "}
        </p>
      );
    }

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
              paddingBottom: "507px"
            }}
          >
            <div style={{ padding: 20, width: "50%", background: "#fff" }}>
              <Row>
                <Col span={12}>
                  <div
                    style={{
                      float: "left"
                    }}
                  >
                    <h3>
                      {" "}
                      Used so far
                      <hr
                        style={{
                          borderBottom: "1px solid black",
                          width: "276px"
                        }}
                      />
                    </h3>

                    {summary}
                  </div>
                </Col>
                <Col span={12}>
                <div style={{
                      float: "right"
                    }}>
                  <h3>
                    Available types
                    <hr
                      style={{
                        borderBottom: "1px solid black",
                        width: "276px"
                      }}
                    />
                  </h3>
                  {typeLeave}
                  </div>
                </Col>
              </Row>
            </div>
          </Content>

          <Footer />
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userSummary: state.fetchUserSummaryReducer.userSummary,
  userType: state.fetchUserTypeLeaveReducer.userType
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      userSummaryFetchData,
      userTypeFetch
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingEmployeePage);
