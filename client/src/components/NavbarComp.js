import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function NavbarComp() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">ModernBrand</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/categorypage">Category</Nav.Link>
            <Nav.Link href="/">Product</Nav.Link>
            {/* <Nav.Link href="#pricing">Review</Nav.Link> */}
          </Nav>
        </Container>
      </Navbar>
      <br />
    </>
  );
}
