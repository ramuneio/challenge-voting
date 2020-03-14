import React from "react";
import "./Products.css";
import ProductsList from "./ProductsList";

function Products() {
  return (
    <div className="Products flex-c">
      <header>
        <h1>Popular Products</h1>
      </header>
      <ProductsList />
    </div>
  );
}
export default Products;
