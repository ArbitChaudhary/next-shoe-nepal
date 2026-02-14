"use client";
import { getProductById } from "@/actions/product.actions";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { IProduct } from "@/types/product-types";
import { Suspense, useCallback, useState } from "react";
import { toast } from "sonner";

interface ProductDetailModalProps {
  open: boolean;
  onClose: () => void;
  //   product: IProduct;
  productId: string;
}

const ProductDetailModal = ({
  open,
  onClose,
  productId,
  //   product,
}: ProductDetailModalProps) => {
  const [product, setProduct] = useState<IProduct | null>(null);
  const getProduct = useCallback(async () => {
    const result = await getProductById(productId);
    if (!result.success) {
      toast.error(result.error);
    } else {
      setProduct(result.data);
    }
  }, [productId]);
  getProduct();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogTitle>{product?.name}</DialogTitle>
        <DialogContent></DialogContent>
      </Dialog>
    </Suspense>
  );
};

export default ProductDetailModal;
