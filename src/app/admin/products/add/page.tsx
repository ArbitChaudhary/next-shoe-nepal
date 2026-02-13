import Header from "@/components/reusables/header";
import React from "react";
import SectionAddProduct from "./_components/section-product-add";

const AddProductPage = () => {
  return (
    <div className="p-4 md:p-8 space-y-4 md:space-y-8 max-w-5xl">
      <Header
        title="Add Product"
        subtitle="Add a new product in your catalog."
      />
      <SectionAddProduct />
    </div>
  );
};

export default AddProductPage;
