import { useSanity } from "~/composables/useSanity";

export const sanityService = {
  // Fetch all products
  async getProducts() {
    const client = useSanity(); // ✅ call inside function
    const query = `*[_type == "product"]{
  _id,
  title,
  price,
  description,
  "slug": slug.current,
  "imageUrl": poster.asset->url,
  "category": category->{
    _id,
    title,
    "slug": slug.current
  }
}`;
    return await client.fetch(query);
  },

  async getProductBySlug(slug: string) {
    const client = useSanity();
    const query = `*[_type == "product" && slug.current == $slug][0]{
      _id,
      title,
      price,
      description,
      "category": category->{
        _id,
        title,
        description,
        "imageUrl": poster.asset->url,
      },
      "slug": slug.current,
      "imageUrl": poster.asset->url,
      thickness,
      unit
    }`;
    return await client.fetch(query, { slug });
  },

  async getCategories() {
    const client = useSanity();
    const query = `*[_type == "categories"]{
      _id,
      title,
      description,
      "imageUrl": poster.asset->url
    }`;
    return await client.fetch(query);
  },

  async getProductsByCategory(slug: string) {
    const client = useSanity();
    const query = `*[_type == "product" && category->slug.current == $slug]{
      _id,
      title,
      price,
      description,
      "category": category->{
        _id,
        title,
        slug
      },
      "slug": slug.current,
      "imageUrl": poster.asset->url
    }`;
    return await client.fetch(query, { slug });
  },
  async getEmployees() {
    const client = useSanity();
    const query = `*[_type == "employees"]{
      _id,
      title,
      name,
      "imageUrl": photo.asset->url,
      email,
      phone
    }`;
    return await client.fetch(query);
  },

  async getPlacements() {
    const client = useSanity();
    const query = `*[_type == "placement"]{
    _id,
    title,
    value
  }`;
    return await client.fetch(query);
  },
  async getProductsByPlacement(value: string, thickness?: number) {
    const client = useSanity();
    let query = `*[_type == "product" && $value in placements[]->value`;
    if (thickness) {
      query += ` && thickness == $thickness`;
    }
    query += `]{
    _id,
    title,
    price,
    description,
    thickness,
    meassurement,
    "slug": slug.current,
    "imageUrl": poster.asset->url,
    placements[]->{
      _id,
      title,
      value
    },
    "category": category->{
      _id,
      title
    }
  }`;

    return await client.fetch(query, { value, thickness });
  },
};
