import type { Category } from "./category.interface";

export type SanitySlug = { _type?: "slug"; current: string };

export type SanityImage = {
  _type?: "image";
  asset?: { _ref: string; _type?: "reference" };
  caption?: string;
  attribution?: string;
};

export interface Product {
  _id: string;
  title: string;
  price: number;
  description?: string;
  slug: SanitySlug;
  poster?: SanityImage; // corresponds to the `poster` image field in Sanity
  // convenience: resolved image URL (if you resolve the asset on the client)
  imageUrl?: string;

  // references
  category?: Category | string;
  usage?: { _id: string; title: string; slug: string | null }[];
  coverage?: number; // Dekning (m² per enhet)

  // moved from top-level into `specs` per your schema (values in the schema are mm for dimensions)
  specs?: {
    thickness?: number; // mm
    width?: number; // mm
    length?: number; // mm
    weight?: number; // kg
    unit?: "pcs" | "lm" | "m2" | "kg";
  } | null;
}
