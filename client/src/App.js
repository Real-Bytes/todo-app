import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// import the Container Component from the bootstrap-react
import { Container, Button, Badge, Jumbotron } from "react-bootstrap";

// import custom components
import Navigation from "./components/Navigation/Navigation"

// import the ToDoList component
import ToDoList from "./To-Do-List";

function App() {
  return (
    <div>
      <Navigation/>
      <Container border>
        <Jumbotron>
          <p>A ToDo App for keeping up with what is required and needed to complete those pescy tasks we have day to day. <span class="badge badge-secondary">New</span></p>
        </Jumbotron>
        <Container>
          <div class="btn-group">
            <Button variant="primary">
              Profile <Badge variant="light">9</Badge>
              <span className="sr-only">unread messages</span>
            </Button>
            <Button variant="outline-primary">Refresh</Button>
            <Button variant="outline-primary">Upload</Button>
            <Button variant="outline-primary">Delete</Button>
          </div>
        </Container>
        <ToDoList/>
      </Container>
    </div>
  );
}
export default App;
