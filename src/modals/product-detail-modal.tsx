"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IProduct } from "@/types/product-types";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BarChart3, Package, Palette, Ruler, Tag, Weight } from "lucide-react";
import { Suspense } from "react";

interface ProductDetailModalProps {
  open: boolean;
  onClose: () => void;
  product?: IProduct;
}

const ProductDetailModal = ({
  open,
  onClose,
  product,
}: ProductDetailModalProps) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="overflow-y-auto max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>{product?.name}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-[160px_1fr] gap-6 mt-4">
            <div className="w-40 h-40 rounded-xl bg-secondary overflow-hidden relative">
              <Image
                src={product?.image || ""}
                alt={product?.name || ""}
                className="w-full h-full object-cover"
                fill
              />
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline">{product?.category}</Badge>
                {product?.isNewArrival && (
                  <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                    New
                  </Badge>
                )}
                {product?.isFeatured && (
                  <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20">
                    Featured
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground text-sm">
                {product?.shortDescription || ""}
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">${product?.price}</span>
                {product?.discountValue && (
                  <>
                    <span className="text-muted-foreground line-through text-sm">
                      ${product.price.toFixed(2)}
                    </span>
                    <Badge variant="destructive" className="text-[10px]">
                      {product.discountType === "percent"
                        ? `${product.discountValue}% OFF`
                        : `$${product.discountValue} OFF`}
                    </Badge>
                  </>
                )}
              </div>
              {/* {product.compareAtPrice && (
                      <p className="text-xs text-muted-foreground">Compare at: ${product?.compareAtPrice}</p>
                    )} */}
            </div>
          </div>
          <Separator className="my-4 bg-border/50" />
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Details
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <DetailItem
                icon={Package}
                label="SKU"
                value={product?.sku || "—"}
              />
              <DetailItem
                icon={BarChart3}
                label="Stock"
                value={
                  // <span className={stockStatus.color}>{product?.stock ?? '—'} ({stockStatus.label})</span>
                  <span className={""}>{product?.stock ?? "—"} </span>
                }
              />
              <DetailItem icon={Ruler} label="Sizes" value={product?.sizes} />
              <DetailItem
                icon={Palette}
                label="Colors"
                value={product?.colors}
              />
              <DetailItem
                icon={Tag}
                label="Material"
                value={product?.materials || "—"}
              />
              <DetailItem
                icon={Weight}
                label="Weight"
                value={
                  product?.weight
                    ? `${product?.weight} ${product?.weightUnit || "kg"}`
                    : "—"
                }
              />
            </div>
          </div>
          {product?.tags && (
            <>
              <Separator className="my-4 bg-border/50" />
              <div className="space-y-2">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Tags
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {/* {selectedProduct.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                        ))} */}
                  {product?.tags}
                </div>
              </div>
            </>
          )}
          <Separator className="my-4 bg-border/50" />
          <div className="space-y-2">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Description
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {product?.description}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </Suspense>
  );
};

const DetailItem = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
}) => (
  <div className="flex items-start gap-2 p-2.5 rounded-lg bg-secondary/50">
    <Icon className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
    <div>
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="text-sm font-medium">{value}</p>
    </div>
  </div>
);

export default ProductDetailModal;
