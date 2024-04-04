import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProductCards from "../components/ProductCards";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ReactPaginate from "react-paginate";

export default function Addproducts() {
  const [products, Setproducts] = useState([]);
  const [limit, Setlimt] = useState(6);
  const [pageCount, SetpageCount] = useState(1);
  const currentPage = useRef();

  useEffect(() => {
    currentPage.current = 1;

    const getProducts = async () => {
      const { data } = await axios.get("/api/products/allProducts");
      console.log(data);
      Setproducts(data);
    };
    getProducts();
    getPaginatedProducts();
  }, []);

  function handlePageClick(e) {
    console.log(e);
    // Setcurrentpage(e.selected+1)
    currentPage.current = e.selected + 1;
    getPaginatedProducts();
    // fetch(`http://localhost:8081/api/products/paginatedProduct?page=${currentPage}&limit=${limit}`,{
    //     method: 'GET',
    // })
    // .then((res)=> res.json())
    // .then((data)=>{
    //     console.log(data,"product data");
    // Setproducts(data)
    // })
  }

  const getPaginatedProducts = () => {
    const productpages = async () => {
      const { data } = await axios.get(
        `/api/products/paginatedProduct?page=${currentPage.current}&limit=${limit}`
      );
      console.log(data);
      // Setproducts(data)
      SetpageCount(data.pageCount);
      Setproducts(data.result);
    };
    productpages();
  };

  return (
    <>
      <Container>
        <h1 className="text-center">Show all Products</h1>
        <hr />
        <Row>
          {products &&
            products.map((product) => {
              return (
                <Col md={4} lg={4} sm={4} key={product.id}>
                  <ProductCards product={product} />
                </Col>
              );
            })}
        </Row>
      </Container>

      <Container className="d-flex justify-content-center mt-5 mb-5">
        <ReactPaginate
          breakLabel="..."
          nextLabel=" next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={5}
          previousLabel=" previous"
          renderOnZeroPageCount={null}
          containerClassName={"pagination"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          activeClassName={"active"}
        />
      </Container>
    </>
  );
}
