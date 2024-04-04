import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Addcategory() {
  const [title, Settitle] = useState("");
  const [validated, setValidated] = useState(false);
  const navigation = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    const data = {
      title: title,
    };

    await axios.post("/api/category/addCategory", data);
    Settitle("");
    navigation("/categorypage");
  };

  return (
    <Container>
      <h1>Add Category</h1>
      <hr />

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Category Name:</Form.Label>
            <Form.Control
              required
              type="text"
              value={title}
              onChange={(e) => Settitle(e.target.value)}
            />
          </Form.Group>
        </Row>

        <Button type="submit" onClick={handleSubmit}>
          Add category
        </Button>
      </Form>
    </Container>
  );
}
