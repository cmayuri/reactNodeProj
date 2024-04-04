import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { Link } from "react-router-dom";
// import '../screens/Linkstyle.css'

export default function ProductCards({ product }) {
  return (
    <>
      <Row>
        <Col md={4} lg={4} sm={4}>
          <Link to={`product/${product.id}`} className="text-decoration-none">
            <Card className="shadow-lg m-2 p-3" style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>Id: {product.id}</Card.Title>

                <Card.Text>Title: {product.title}</Card.Text>
                <Card.Text>Price: {product.price}</Card.Text>
                <Card.Text>Category_Name: {product.category}</Card.Text>
                <Card.Text>Category_Id: {product.category_id}</Card.Text>

                {/* <Card.Text>
      Description:  {product.description}
       </Card.Text> */}
                <Link to={`product/${product.id}`}>
                  <Button variant="primary">Details</Button>
                </Link>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      </Row>
    </>
  );
}
