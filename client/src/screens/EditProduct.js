import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
// import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditProduct() {
  const { id } = useParams();
  const navigation = useNavigate();

  const [title, Settitle] = useState("");
  const [price, Setprice] = useState(0);
  const [description, Setdescription] = useState("");
  const [category, Setcategory] = useState("");
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    const getDataById = async () => {
      const { data } = await axios.get(`/api/products/${id}`);
      Settitle(data.title);
      Setprice(data.price);
      Setdescription(data.description);
      Setcategory(data.category);
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
      price: price,
      description: description,
      category: category,
      published: true,
    };

    await axios.put(`/api/products/${id}`, data);
    navigation("/");
  };

  return (
    <>
      <Container>
        <h1>Update Product</h1>
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
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom02">
              <Form.Label>Price($)</Form.Label>
              <Form.Control
                required
                type="number"
                value={price}
                onChange={(e) => Setprice(e.target.value)}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom02">
              <Form.Label>Description</Form.Label>
              <Form.Control
                required
                type="text"
                value={description}
                onChange={(e) => Setdescription(e.target.value)}
              />
            </Form.Group>
          </Row>

          <Button type="submit" onClick={updateHandler}>
            Update Product
          </Button>
        </Form>
      </Container>
    </>
  );
}
