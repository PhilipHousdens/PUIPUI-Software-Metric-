<script setup lang="ts">
import ProductCard from '@/component/ProductCard.vue';
import axiosInstance from '@/service/axiosIntance';
import type { Product } from '@/types'; 
import { ref, computed, onMounted, Ref } from 'vue';
import Pagination from '@/component/Pagination.vue';

const products = ref<Product[]>(null)
  const currentPage = ref(1);
const limit = ref(3); // Number of products per page
const totalPages = ref(0); // Total number of pages

async function fetchProducts() {
    try {
        const response = await axiosInstance.getProduct(limit.value, currentPage.value);
        console.log('API Response:', response.data); // Log the response data for debugging

        // Handle products and total pages from the response
        products.value = response.data.products || [];
        totalPages.value = response.data.totalPages !== undefined ? response.data.totalPages : 0;

        console.log("Products:", products.value);
        console.log("Total Pages:", totalPages.value);
    } catch (error) {
        console.error('Error fetching products:', error);
        products.value = [];
        totalPages.value = 0; // Reset total pages on error
    }
}

onMounted(() => {
  fetchProducts();
});

// Pagination
function handlePageChange(newPage: number) {
  currentPage.value = newPage;
  fetchProducts(); // Re-fetch products for the selected page
}

</script>

<template>
  <div class="pb-10">
    <div>
      <img class="w-full" src="../assets/Home/Banner_Puipui.jpg" alt="">
    </div>
    <div class="flex flex-col justify-center items-center">
      <div class="grid grid-cols-3 space-x-24">
        <ProductCard v-for="product in products" :key="product._id" :product="product" />
      </div>
    </div>
    <!-- Pagination Component -->
    <Pagination :totalPages="totalPages" :currentPage="currentPage" @pageChange="handlePageChange" />
  </div>
</template>