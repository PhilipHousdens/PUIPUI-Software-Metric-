<script setup lang="ts">
import ProductCard from '@/component/ProductCard.vue';
import axiosInstance from '@/service/axiosIntance';
import type { Product } from '@/types'; 
import { ref, computed, onMounted, Ref } from 'vue';
import ProductService from '@/service/axiosIntance'

const products = ref<Product[]>(null)

onMounted(() => {
  ProductService.getProduct()
  .then((response) => {
    products.value = response.data[0].products;
  })
})

</script>

<template>
  <div class="pb-10 ">
    <div>
      <img class="w-full" src="../assets/Home/Banner_Puipui.jpg" alt="">
    </div>
    <!-- Product Grid (2x2 layout) -->
    <div class="flex flex-col justify-center items-center">
      <div class="grid grid-cols-3 gap-8">
        <ProductCard v-for="product in products" :key="product._id" :product="product" />
      </div>
    </div>
  </div>
</template>
