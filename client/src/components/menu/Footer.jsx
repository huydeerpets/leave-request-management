import React from "react";
import { Layout, Icon } from "antd";
const { Footer } = Layout;

export default class FooterLayout extends React.Component {
  render() {
    return (
      <Footer className="App-footer">
        <p>
          <a href="http://opensource.org/licenses/mit-license.php"> MIT</a>. The
          website content is licensed{" "}
          <a href="http://www.tnis.com" target="_blank">
          &copy; P.T TNIS Service Indonesia
          </a>.
        </p>
      </Footer>
    );
  }
}
