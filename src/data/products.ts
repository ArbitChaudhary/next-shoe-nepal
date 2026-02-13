import product1 from "@/assets/product-1.png";
import product2 from "@/assets/product-2.png";
import product3 from "@/assets/product-3.png";
import product4 from "@/assets/product-4.png";
import { StaticImageData } from "next/image";

export interface Product {
  id: number;
  image: StaticImageData;
  name: string;
  category: string;
  price: number;
  isNew: boolean;
  description: string;
  sizes: number[];
  colors: string[];
}

export const products: Product[] = [
  {
    id: 1,
    image: product1,
    name: "Velocity Pro",
    category: "Running",
    price: 189,
    isNew: true,
    description:
      "Engineered for speed with responsive cushioning and a lightweight design. The Velocity Pro features our proprietary energy-return foam and breathable mesh upper.",
    sizes: [7, 8, 9, 10, 11, 12],
    colors: ["Black/Orange", "White/Blue", "Grey/Red"],
  },
  {
    id: 2,
    image: product2,
    name: "Cloud Walker",
    category: "Lifestyle",
    price: 159,
    isNew: false,
    description:
      "All-day comfort meets modern style. The Cloud Walker is designed for those who demand both aesthetics and functionality in their everyday footwear.",
    sizes: [6, 7, 8, 9, 10, 11, 12],
    colors: ["White/Grey", "Black/White", "Navy"],
  },
  {
    id: 3,
    image: product3,
    name: "Shadow Elite",
    category: "Basketball",
    price: 229,
    isNew: true,
    description:
      "Dominate the court with superior ankle support and explosive takeoff technology. Built for the modern athlete who refuses to compromise.",
    sizes: [8, 9, 10, 11, 12, 13],
    colors: ["Triple Black", "Black/Gold", "White/Red"],
  },
  {
    id: 4,
    image: product4,
    name: "Retro Classic",
    category: "Casual",
    price: 139,
    isNew: false,
    description:
      "A timeless silhouette reimagined for today. Premium leather construction with vintage-inspired colorways that never go out of style.",
    sizes: [6, 7, 8, 9, 10, 11],
    colors: ["Orange/Cream", "Green/White", "Brown/Tan"],
  },
  {
    id: 5,
    image: product1,
    name: "Turbo Max",
    category: "Running",
    price: 199,
    isNew: true,
    description:
      "Maximum cushioning for maximum distance. The Turbo Max features our most advanced foam technology for runners who push their limits.",
    sizes: [7, 8, 9, 10, 11, 12],
    colors: ["Black/Green", "Blue/White", "Red/Black"],
  },
  {
    id: 6,
    image: product2,
    name: "Street Edge",
    category: "Lifestyle",
    price: 169,
    isNew: false,
    description:
      "Bold design meets urban functionality. The Street Edge is for those who want to make a statement with every step.",
    sizes: [6, 7, 8, 9, 10, 11, 12],
    colors: ["Burgundy/Gold", "Black/Silver", "White/Pink"],
  },
  {
    id: 7,
    image: product3,
    name: "Court King",
    category: "Basketball",
    price: 249,
    isNew: false,
    description:
      "The signature shoe of champions. Engineered with input from professional athletes for unmatched performance.",
    sizes: [8, 9, 10, 11, 12, 13, 14],
    colors: ["Black/Red", "White/Blue", "Grey/Orange"],
  },
  {
    id: 8,
    image: product4,
    name: "Heritage Low",
    category: "Casual",
    price: 129,
    isNew: false,
    description:
      "Classic low-top design with modern comfort features. Perfect for everyday wear with any outfit.",
    sizes: [6, 7, 8, 9, 10, 11],
    colors: ["White/Green", "Black/Gum", "Navy/Red"],
  },
];

export const categories = [
  "All",
  "Running",
  "Basketball",
  "Lifestyle",
  "Casual",
];
