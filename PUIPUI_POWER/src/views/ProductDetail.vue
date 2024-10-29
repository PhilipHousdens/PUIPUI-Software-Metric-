<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Product } from '@/types'; 
import ProductService from '@/service/axiosIntance';
import router from '@/router';

const product = ref<Product>();
const id = router.currentRoute.value.params.id;

onMounted(() => {
  ProductService.getProductById(id)
    .then((response) => {
      product.value = response.data;
    }).catch((error) => {
      console.error("Error fetching product:", error);
    });
});

const selectedSize = ref('');
const quantity = ref(1);

function increaseQuantity() {
  quantity.value++;
}

function decreaseQuantity() {
  if (quantity.value > 1) {
    quantity.value--;
  }
}

function buyNow() {
  alert(`Buying ${quantity.value} of ${product.value.name}`);
}

function addToBag() {
  alert(`Added ${quantity.value} of ${product.value.name} to bag`);
}
</script>

<template>
  <div v-if="product" class="product-page py-10 max-w-5xl mx-auto">
    <div class="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
      <!-- Product Image -->
      <div class="flex-none w-full md:w-1/3">
        <img :src="product.imgUrl" alt="Product Image" class="w-full h-auto object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none transition-transform duration-300 transform hover:scale-105"/>
      </div>

      <!-- Product Details -->
      <div class="flex-grow p-6">
        <h1 class="text-4xl font-bold text-gray-800">{{ product.name }}</h1>
        <p class="text-2xl font-semibold text-green-600 mt-2">${{ product.price }}</p>
        <p class="text-gray-600 mt-2 mb-4">{{ product.description }}</p>
        
        <!-- Quantity Selection -->
        <div class="number-selection my-4 flex items-center">
          <label for="quantity" class="text-lg font-medium mr-2">Quantity:</label>
          <button @click="decreaseQuantity" class="bg-gray-300 px-3 py-1 rounded-lg transition-colors duration-200 hover:bg-gray-400">-</button>
          <input
            id="quantity"
            type="number"
            v-model="quantity"
            min="1"
            class="mx-2 w-16 text-center border border-gray-300 rounded-md shadow-md"
          />
          <button @click="increaseQuantity" class="bg-gray-300 px-3 py-1 rounded-lg transition-colors duration-200 hover:bg-gray-400">+</button>
        </div>

        <!-- Action Buttons -->
        <div class="action-buttons mt-6 flex space-x-4">
          <button @click="buyNow" class="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-lg transition-transform duration-200 transform hover:scale-105 hover:bg-blue-600">Buy Now</button>
          <button @click="addToBag" class="bg-green-500 text-white px-6 py-2 rounded-lg shadow-lg transition-transform duration-200 transform hover:scale-105 hover:bg-green-600">Add to Bag</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-page {
  background-color: #f3f4f6; /* Light gray background for contrast */
}
</style>
