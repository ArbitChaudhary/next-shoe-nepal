import { getProductById } from "@/actions/product.actions";
import { cache } from "react";
import SectionEditProduct from "./_components/section-edit-product";

const getProduct = cache(async (productId: string) => {
  const res = await getProductById(productId);
  return res;
});
async function EditProductPage({ params }: { params: { productId: string } }) {
  const { productId } = await params;
  const result = await getProduct(productId);
  if (!result.success) {
    return (
      <div>
        <div>{result?.error}</div>
      </div>
    );
  }
  return <SectionEditProduct product={result?.data} />;
}

export default EditProductPage;
