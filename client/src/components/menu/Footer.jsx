import React from "react";
import { Layout, Icon } from "antd";
const { Footer } = Layout;

export default class FooterLayout extends React.Component {
  render() {
    return (
      <Footer style={{ background: "grey" }}>
        <p>
          <a href="http://opensource.org/licenses/mit-license.php"> MIT</a>. The
          website content is licensed{" "}
          <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
            CC BY NC SA 4.0
          </a>.
        </p>
      </Footer>
    );
  }
}
