import React, { Component } from "react";
import {
  Card,
  CardBody,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  Col,
  Row,
  Input,
  InputGroup
} from "reactstrap";
class DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      currentPage: 1,
      itemPerPage: 10,
      isPrevDisabled: true,
      isNextDisabled: false
    };
  }

  handleClick = (dataCount, event) => {
    let page = this.state.currentPage;
    let maxPage = Math.ceil(dataCount / this.state.itemPerPage);
    if (event.target.id === "next") {
      page = page < maxPage ? page + 1 : page;
    } else if (event.target.id === "prev") {
      page = page > 1 ? page - 1 : page;
    } else {
      page = Number(event.target.id);
    }
    let isNextDisabled = !(page < maxPage);
    let isPrevDisabled = !(page > 1);
    this.setState({
      currentPage: page,
      isNextDisabled: isNextDisabled,
      isPrevDisabled: isPrevDisabled
    });
  };
  filter = evt => {
    this.setState({
      searchText: evt.target.value,
      currentPage: 1,
      isNextDisabled: false
    });
  };
  render() {
    const { data } = this.props;
    const { searchText, currentPage, itemPerPage } = this.state;
    const filteredList = [];
    data.filter(item => {
      Object.keys(item).forEach(h => {
        if (
          item[h]
            .toString()
            .toLowerCase()
            .match(searchText.toLowerCase()) != null &&
          filteredList.indexOf(item) === -1
        )
          filteredList.push(item);
      });
      return "";
    });

    const indexOfLastTodo = currentPage * itemPerPage;
    const indexOfFirstTodo = indexOfLastTodo - itemPerPage;
    const currentList = filteredList.slice(indexOfFirstTodo, indexOfLastTodo);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredList.length / itemPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <Row>
        <Col xs="12" lg="12">
          <Card>
            <CardBody>
              <Row>
                <Col md="2">
                  <InputGroup
                    onChange={evt =>
                      this.setState({
                        itemPerPage: evt.target.value,
                        currentPage: 1
                      })
                    }
                  >
                    <Input type="select" defaultValue="10">
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="25">25</option>
                    </Input>
                  </InputGroup>
                </Col>
                <Col md="7" />
                <Col md="3">
                  <InputGroup className="mb-3">
                    <Input
                      type="text"
                      placeholder="ARAMA"
                      value={searchText}
                      onChange={this.filter}
                    />
                  </InputGroup>
                </Col>
              </Row>
              {currentList.length > 0 ? (
                <Table hover bordered striped responsive size="sm">
                  <thead>
                    <tr>
                      {Object.keys(currentList[0]).map((item, i) => {
                        return <th key={i}>{item}</th>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {currentList.map((item, i) => {
                      return (
                        <tr key={i}>
                          {Object.keys(item).map((key, i) => (
                            <td key={i}>{item[key]}</td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              ) : (
                <Row>
                  <Col xs="12" lg="12">
                    <p className="text-muted" style={{ textAlign: "center" }}>
                      Kayıt Bulunamadı
                    </p>
                  </Col>
                </Row>
              )}
              <Row>
                <Col>
                  <Pagination>
                    <PaginationItem>
                      <PaginationLink
                        tag="button"
                        id={"prev"}
                        onClick={
                          !this.state.isPrevDisabled
                            ? this.handleClick.bind(this, filteredList.length)
                            : null
                        }
                        disabled={this.state.isPrevDisabled}
                      >
                        Geri
                      </PaginationLink>
                    </PaginationItem>
                    {pageNumbers.map(number => {
                      return (
                        <PaginationItem
                          active={number === currentPage}
                          key={number}
                        >
                          <PaginationLink
                            tag="button"
                            id={number}
                            onClick={this.handleClick.bind(
                              this,
                              filteredList.length
                            )}
                          >
                            {number}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    })}
                    <PaginationItem>
                      <PaginationLink
                        tag="button"
                        id={"next"}
                        onClick={
                          !this.state.isNextDisabled
                            ? this.handleClick.bind(this, filteredList.length)
                            : null
                        }
                        disabled={this.state.isNextDisabled}
                      >
                        İleri
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}
export default DataTable;
