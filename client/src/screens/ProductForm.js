import React, { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function ProductForm() {
  const { id } = useParams();

  const [title, Settitle] = useState("");
  const [price, Setprice] = useState(0);
  const [description, Setdescription] = useState("");
  const [category, Setcategory] = useState("");
  console.log(category);
  // const [category_id, Setcatetgory_id] = useState()
  const [categoryName, SetcategoryName] = useState("");

  const [catList, Setcatlist] = useState("");
  const [validated, setValidated] = useState(false);
  const navigation = useNavigate();

  useEffect(() => {
    const getCategory = async () => {
      const { data } = await axios.get(`/api/category/${id}`);
      console.log(data);
      SetcategoryName(data.title);
    };
    getCategory();
  }, [id]);

  useEffect(() => {
    const allCategory = async () => {
      const { data } = await axios.get("/api/category/allCategories");
      console.log(data);
      Setcatlist(data);
    };
    allCategory();
  }, []);

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
      price: price,
      description: description,
      category: category,
      published: true,
    };

    await axios.post(`/api/products/addProduct/${id}`, data);
    Settitle("");
    Setprice("");
    Setdescription("");
    Setcategory("");
    navigation("/");
  };

  return (
    <>
      <Container>
        <h1>Add Product</h1>
        <hr />

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
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

          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom02">
              <Form.Select
                as={Col}
                md="4"
                onChange={(e) => Setcategory(e.target.value)}
              >
                {catList &&
                  catList.map((obj) => (
                    <option value={obj.title}>{obj.title}</option>
                  ))}
              </Form.Select>
            </Form.Group>
          </Row>

          <Button type="submit" className="mt-4" onClick={handleSubmit}>
            Add Product
          </Button>
        </Form>
      </Container>
    </>
  );
}
