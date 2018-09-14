import React, { Component } from "react";
// Styles
// CoreUI Icons Set
import "@coreui/icons/css/coreui-icons.min.css";
// Import Flag Icons Set
import "flag-icon-css/css/flag-icon.min.css";
// Import Font Awesome Icons Set
import "font-awesome/css/font-awesome.min.css";
// Import Simple Line Icons Set
import "simple-line-icons/css/simple-line-icons.css";
// Import Main styles for this application
import "./scss/style.css";
import "./App.css";
import { Col, Row } from "reactstrap";
import DataTable from "./components/DataTable";
// Containers
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }
  componentWillMount() {
    let data = [
      { name: "S", surname: "E", birthYear: 1988, birthCity: "Karaman"}
    ];
    for (let index = 1; index < 100; index++) {
      let element = { name: "S"+index, surname: "E"+index, birthYear: 1988, birthCity: "Karaman" };
      data.push(element);
    }
    this.setState({ data: data });
  }

  render() {
    return (
      <Row>
        <Col xs="12" lg="12">
          <DataTable data={this.state.data} />
        </Col>
      </Row>
    );
  }
}

export default App;
