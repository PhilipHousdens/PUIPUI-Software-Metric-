<script setup lang="ts">
import axiosInstance from '@/service/axiosIntance';
import type { Product } from '@/types'; // This will work if you're in TypeScript
import { ref, computed, onMounted, Ref } from 'vue';

const products: Ref<Product[]> = ref([]) // Declare products with type

// Fetch API 
async function fetchProduct() {
  try {
    const response = await axiosInstance.getProduct(); 
    products.value = response.data[0].products;
    console.log(products.value)
    
    
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

onMounted(() => {
  fetchProduct();
});
</script>

<template>
  <div class="py-10">
    <!-- Product Grid (2x2 layout) -->
    <div class="grid grid-cols-2 gap-6 px-10">
      <div
        v-for="product in products"
        :key="product._id"
        class="border p-4 rounded-lg shadow-md"
      >
        <img
          :src="product.imgUrl"
          alt="Product image"
          class="w-full h-40 object-cover rounded"
        />
        <div class="mt-2 text-center">
          <h2 class="text-xl font-semibold">{{ product.name }}</h2>
          <p class="text-gray-500">${{ product.price }}</p>
          <p class="text-sm text-gray-400">In stock: {{ product.stock }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom styling */
</style>
