import type { Category } from "./../models/category.interface";
import { defineStore } from "pinia";
import { useSanity } from "~/composables/useSanity";
import { ref } from "vue";
import { sanityService } from "~/services/sanity-service";
import type { Product } from "~/models/product.interface";

export const useProductsStore = defineStore("products", () => {
  const products = ref<Product[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchProducts() {
    console.log("[store] fetchProducts called");

    loading.value = true;
    error.value = null;
    try {
      products.value = await sanityService.getProducts();
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  }

  const categories = ref<Category[]>([]);

  async function fetchCategories() {
    loading.value = true;
    error.value = null;
    try {
      categories.value = await sanityService.getCategories();
      console.log("Fetched categories:", categories.value);
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  }

  const cartItems = ref<Product[]>([]);
  function addToCart(product: Product, quantity = 1) {
    console.log("🚀 ~ product:", product, "quantity:", quantity);
    const qty = Math.max(1, Math.floor(Number(quantity) || 1));
    for (let i = 0; i < qty; i++) {
      cartItems.value.push(product);
    }
    console.log(`Added ${qty} item(s) to cart:`, cartItems.value);
  }

  const fetchProductBySlug = async (slug: string) => {
    loading.value = true;
    error.value = null;
    try {
      const product = await sanityService.getProductBySlug(slug);
      return product;
    } catch (err: any) {
      error.value = err.message;
      return null;
    } finally {
      loading.value = false;
    }
  };

  const currentCategory = ref("");

  return {
    products,
    loading,
    error,
    fetchProducts,
    categories,
    fetchCategories,
    cartItems,
    addToCart,
    fetchProductBySlug,
    currentCategory,
  };
});
