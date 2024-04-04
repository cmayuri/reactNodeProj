import axios from "axios";
import React, { useEffect, useState } from "react";
// import ListGroup from 'react-bootstrap/ListGroup';
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/esm/Button";
import { Link, useNavigate } from "react-router-dom";

export default function Showcategory() {
  const [category, Setcategory] = useState("");

  useEffect(() => {
    const getCategory = async () => {
      const { data } = await axios.get("/api/category/allCategories");
      console.log(data);
      Setcategory(data);
      // Setproducts(data)
    };
    getCategory();
  }, []);
  const navigation = useNavigate();
  const handleDelete = async (id) => {
    await axios.delete(`/api/category/${id}`);
    navigation("/");
  };

  return (
    <>
      <Container className="mb-4">
        <Link to="/addcategory">
          {" "}
          <Button>Add Category</Button>
        </Link>
      </Container>

      <Container>
        <Row>
          {category &&
            category.map((cat) => {
              return (
                <Col md={4} lg={4} sm={4}>
                  <Link
                    to={`/addProduct/${cat.id}`}
                    className="text-decoration-none"
                  >
                    <Card className="m-2">
                      <Card.Body className="fs-5 text-center">
                        {cat.title}
                        <p className="pt-4 fs-4">
                          <Link to={`/categorypage/edit/${cat.id}`}>
                            {" "}
                            <i class="fas fa-edit float-start text-primary"></i>
                          </Link>
                          <i
                            class="fa fa-trash float-end text-danger"
                            aria-hidden="true"
                            onClick={() => handleDelete(cat.id)}
                          ></i>
                        </p>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              );
            })}
        </Row>
      </Container>
    </>
  );
}
