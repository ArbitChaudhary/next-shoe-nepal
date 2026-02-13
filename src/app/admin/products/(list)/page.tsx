import { cache } from "react";
import Products from "./_components/section-products";

const getProducts = cache(async () => {
  const res = await fetch(`http://localhost:3000/api/products`, {
    method: "GET",
    cache: "no-cache",
  });
  const result = await res.json();
  return result;
});

const ProductsPage = async () => {
  const products = await getProducts();
  if (products?.success === false) {
    return (
      <div className="min-h-screen">
        <div className="text-center text-xl text-destructive font-medium mt-5">
          {products?.error?.message ||
            products?.message ||
            "Error fetching products"}
        </div>
      </div>
    );
  }
  return <Products products={products?.data || []} />;
};

export default ProductsPage;
