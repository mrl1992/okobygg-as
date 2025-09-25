import type { Category } from "./category.interface";

export interface Product {
  _id: string;
  title: string;
  price: number;
  description: string;
  slug: string;
  imageUrl?: string;
  category?: Category; // populated reference
  thickness?: number; // in cm
  unit?: string; // e.g., "m²", "m³", "stk"
  length?: number; // in cm
  width?: number; // in cm
  height?: number; // in cm
  weight?: number; // in kg
  meassurements?: number;
}
