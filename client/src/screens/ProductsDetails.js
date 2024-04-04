import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function ProductsDetails() {
  const { id } = useParams();
  const [title, Settitle] = useState("");
  const [price, Setprice] = useState(0);
  const [description, Setdescription] = useState("");
  const [category, Setcategory] = useState("");
  const navigation = useNavigate();

  useEffect(() => {
    const getSingleProductdata = async () => {
      const { data } = await axios.get(`/api/products/${id}`);
      console.log(data);
      Settitle(data.title);
      Setprice(data.price);
      Setcategory(data.category);
      Setdescription(data.description);
    };
    getSingleProductdata();
  }, [id]);

  const handleDelete = async (id) => {
    await axios.delete(`/api/products/${id}`);
    navigation("/");
  };

  return (
    <>
      <Container>
        <Row>
          {
            <Col
              md={12}
              lg={12}
              sm={12}
              className="d-flex justify-content-center"
            >
              <Card className="shadow-lg m-2 p-3" style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Text>Title: {title}</Card.Text>
                  <Card.Text>Price: {price}</Card.Text>
                  <Card.Text>Description: {description}</Card.Text>

                  {/* <Card.Text>
      Description:  {description}
       </Card.Text> */}
                  <Card.Text>Category_Name: {category}</Card.Text>
                  <Card.Text>Category_Id: {id}</Card.Text>
                  <Link to={`/product/edit/${id}`}>
                    <Button variant="primary" className="me-4 mt-4">
                      Edit
                    </Button>
                  </Link>

                  <Button
                    variant="danger"
                    className="mt-4"
                    onClick={() => handleDelete(id)}
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          }
        </Row>
      </Container>
      {/* <div>ProductsDetails</div> */}
    </>
  );
}
