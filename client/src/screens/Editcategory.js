import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
// import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function Editcategory() {
  const { id } = useParams();
  const navigation = useNavigate();

  const [title, Settitle] = useState("");
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    const getDataById = async () => {
      const { data } = await axios.get(`/api/category/${id}`);
      Settitle(data.title);
    };
    getDataById();
  }, [id]);

  const updateHandler = async (event) => {
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

    await axios.put(`/api/category/${id}`, data);
    navigation("/");
  };
  return (
    <Container>
      <h1>Update Category</h1>
      <hr />
      <Form noValidate validated={validated} onSubmit={updateHandler}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Title:</Form.Label>
            <Form.Control
              required
              type="text"
              value={title}
              onChange={(e) => Settitle(e.target.value)}
            />
          </Form.Group>
        </Row>
        <Button type="submit" onClick={updateHandler}>
          Update Category
        </Button>
      </Form>
    </Container>
  );
}
