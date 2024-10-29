<script setup lang="ts">
import axiosInstance from '@/service/axiosIntance';
import { Ref, onMounted , ref } from 'vue';
import type { Product } from '@/types'; 
import ProductService from '@/service/axiosIntance'

const id : Ref<number> = ref(1)

    ProductService.getProductById(id.value)
    .then((response) => {
      products.value = response.data[0].products;
    }).catch((error) => {
      console.error("KUY", error);
    })

const products = ref<Product[]>(null)

const product = ref({
  name: '',
  price: 0,
  pics: [],
  sizes: [],
});

const selectedSize = ref('');
const selectedAlphabet = ref('');
const quantity = ref(1);
const details = ref('');


async function fetchProduct() {
  try {
    const response = await axiosInstance.getProduct();
    product.value = response.data[0]; // Adjust based on actual API response structure
    selectedSize.value = product.value.sizes[0]; // Set default size if available
  } catch (error) {
    console.error("Error fetching product:", error);
  }
}

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

onMounted(() => {
  fetchProduct();
});
</script>

<template>
    <div v-if="product" class="product-page py-10 max-w-4xl mx-auto">
      <div class="flex">
       
        <!-- Product Details -->
        <div class="flex-grow ml-6">
          <h1 class="text-3xl font-bold text-gray-800">{{ product.name }}</h1>
          <p class="text-xl font-semibold text-green-600 mt-2">{{ product.price }}</p>
         <!-- Size Selection -->
<div class="size-selection my-4">
  <label for="size" class="text-sm font-medium">Size:</label>
  <select id="size" v-model="selectedSize" class="mt-1 block w-full border border-gray-300 rounded-md p-2">
    <option v-for="size in product.sizes" :key="size" :value="size">{{ size }}</option>
    <!-- Add predefined sizes if needed -->
    <option value="S">S</option>
    <option value="M">M</option>
    <option value="L">L</option>
    <option value="XL">XL</option>
    <option value="XXL">XXL</option>
  </select>
</div>

          
          <!-- Quantity Selection -->
          <div class="number-selection my-4 flex items-center">
            <label for="quantity" class="text-sm font-medium mr-2">Quantity:</label>
            <button @click="decreaseQuantity" class="bg-gray-300 px-3 py-1 rounded">-</button>
            <input
              id="quantity"
              type="number"
              v-model="quantity"
              min="1"
              class="mx-2 w-16 text-center border border-gray-300 rounded-md"
            />
            <button @click="increaseQuantity" class="bg-gray-300 px-3 py-1 rounded">+</button>
          </div>
          <!-- Detail/Material Textarea -->
          <textarea
            class="mt-4 w-full border border-gray-300 rounded-md p-2"
            placeholder="Detail/Material"
            v-model="details"
          ></textarea>
          <!-- Action Buttons -->
          <div class="action-buttons mt-6 flex space-x-4">
            <button @click="buyNow" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Buy Now</button>
            <button @click="addToBag" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Add to Bag</button>
          </div>
          {{ product.name }}

        </div>
      </div>
    </div>
  </template>
  
