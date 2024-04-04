import React from "react";
import { Route, Routes } from "react-router-dom";
import Addproducts from "./screens/Addproducts";
import ProductsDetails from "./screens/ProductsDetails";
import ProductForm from "./screens/ProductForm";
import EditProduct from "./screens/EditProduct";
import NavbarComp from "./components/NavbarComp";
import Showcategory from "./screens/Showcategory";
import Addcategory from "./screens/Addcategory";
import Editcategory from "./screens/Editcategory";
// import './screens/Linkstyle.css'
export default function App() {
  return (
    <>
      <NavbarComp />
      <Routes>
        <Route path="/" element={<Addproducts />}></Route>
        <Route path="/product/:id" element={<ProductsDetails />}></Route>
        <Route path="/addProduct/:id" element={<ProductForm />}></Route>
        <Route path="/product/edit/:id" element={<EditProduct />}></Route>
        <Route path="/categorypage" element={<Showcategory />}></Route>
        <Route path="/addcategory" element={<Addcategory />}></Route>
        <Route path="/categorypage/edit/:id" element={<Editcategory />}></Route>
      </Routes>
    </>
  );
}
