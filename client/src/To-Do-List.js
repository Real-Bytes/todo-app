import React, { Component } from "react";
import axios from "axios";
// import { Card, Header, Form, Input, Icon } from "semantic-ui-react";
import { InputGroup, Form, FormControl, Button, Card, Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";
 
let endpoint = "http://localhost:8888";

class ToDoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      task: "",
      items: []
    };
  }

  componentDidMount() {
    this.getTask();
  }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onSubmit = () => {
    let { task } = this.state;
    // console.log("pRINTING task", this.state.task);
    if (task) {
      axios
        .post(
          endpoint + "/api/task",
          {
            task
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }
        )
        .then(res => {
          this.getTask();
          this.setState({
            task: ""
          });
          console.log(res);
        });
    }
  };

  getTask = () => {
    axios.get(endpoint + "/api/task").then(res => {
      console.log(res);
      if (res.data) {
        this.setState({
          items: res.data.map(item => {
            let color = "yellow";

            if (item.status) {
              color = "green";
            }

            if (item.progress === "") {
                return (
                    <ListGroupItem key={item._id}>
                        <div style={{ wordWrap: "break-word" }}>{item.task}</div>
                        <div class="btn-group">
                            <Button variant="outline-info" onClick={() => this.moveTask(item._id)}>Move to in progress</Button>
                            <Button variant="outline-info" onClick={() => this.undoTask(item._id)}>Undo</Button>
                            <Button variant="outline-info" onClick={() => this.deleteTask(item._id)}>Delete</Button>
                        </div>
                    </ListGroupItem>
                );
            }
          }),
          inProgressItems: res.data.map(item => {
            if (item.progress === "inProgress") {
                return (
                    <ListGroupItem key={item._id}>
                        <div style={{ wordWrap: "break-word" }}>{item.task}</div>
                        <div class="btn-group">
                            {/* Update below updated task to a done task where it then puts the item into the done column */}
                            <Button variant="outline-info" onClick={() => this.moveTask(item._id)}>Done</Button>
                            <Button variant="outline-info" onClick={() => this.undoTask(item._id)}>Undo</Button>
                            <Button variant="outline-info" onClick={() => this.deleteTask(item._id)}>Delete</Button>
                        </div>
                    </ListGroupItem>
                );
            }
          }),
          doneItems: res.data.map(item => {
            if (item.progress === "done") {
                return (
                    <ListGroupItem key={item._id}>
                        <div style={{ wordWrap: "break-word" }}>{item.task}</div>
                        <div class="btn-group">
                            {/* Update below updated task to a done task where it then puts the item into the completed column */}
                            <Button variant="outline-info" onClick={() => this.moveTask(item._id)}>Completed</Button>
                            <Button variant="outline-info" onClick={() => this.undoTask(item._id)}>Undo</Button>
                            <Button variant="outline-info" onClick={() => this.deleteTask(item._id)}>Delete</Button>
                        </div>
                    </ListGroupItem>
                );
            }
          })
        });
      } else {
        this.setState({
          items: []
        });
      }
    });
  };

  updateTask = id => {
    axios
      .put(endpoint + "/api/task/" + id, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
      .then(res => {
        console.log(res);
        this.getTask();
      });
  };

  moveTask = id => {
    let { task } = this.state;
    axios
      .put(endpoint + "/api/task/move/" + id,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(res => {
          console.log(res);
          this.getTask();
      });
  }

  undoTask = id => {
    axios
      .put(endpoint + "/api/undoTask/" + id, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
      .then(res => {
        console.log(res);
        this.getTask();
      });
  };

  deleteTask = id => {
    axios
      .delete(endpoint + "/api/deleteTask/" + id, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
      .then(res => {
        console.log(res);
        this.getTask();
      });
  };
  
  render() {
    return (
      <div>
        <Form onSubmit={this.onSubmit}>
            <InputGroup onChange={this.onChange} className="p-4">
                <FormControl
                name="task"
                placeholder="Todo task"
                aria-label="Todo task"
                aria-describedby="basic-addon2"
                value={this.state.task}
                />
                <InputGroup.Append>
                    <Button variant="outline-secondary" type="submit">Add</Button>
                    <Button variant="outline-warning">Clear</Button>
                </InputGroup.Append>
            </InputGroup>
        </Form>
        <Row>
            <Col sm={4}>
                <Card>
                    <Card.Header>TODO</Card.Header>
                    <ListGroup className="list-group-flush">
                        {this.state.items}
                    </ListGroup>
                </Card>
            </Col>
            <Col sm={4}>
                <Card>
                    <Card.Header>In Progress</Card.Header>
                    <ListGroup className="list-group-flush">
                        {this.state.inProgressItems}
                    </ListGroup>
                </Card>
            </Col>
            <Col sm={4}>
                <Card>
                    <Card.Header>Done</Card.Header>
                    <ListGroup className="list-group-flush">
                        {this.state.doneItems}
                    </ListGroup>
                </Card>
            </Col>
        </Row>
      </div>
    );
  }
}

export default ToDoList;