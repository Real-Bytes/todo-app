import React, { Component } from "react";
import { Container, Nav, Navbar, Form, FormControl, Button } from "react-bootstrap";

class Navigation extends Component {

    constructor(props) {
        super(props);
        this.state = {color: "red"};
    }

    render() {
        var ryan = "hello";
        return(
            <Container>
                <Navbar bg="primary" variant="dark">
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing {this.state.color}</Nav.Link>
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-light">Search {ryan}</Button>
                    </Form>
                </Navbar>
            </Container>
        );
    }
}

export default Navigation;
