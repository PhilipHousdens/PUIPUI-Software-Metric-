<script setup lang="ts">
import { type Product } from '@/ProductTypes'

defineProps<{
    product: Product
}>()

</script>

<template>
  <div class="py-10">
    <RouterLink :to="{name: 'productDetail',params:{id: product._id}}" >
      <div >
        <div class="border p-4 rounded-lg shadow-md">
          <img :src="product.imgUrl" alt="display product" class="w-full h-40 object-cover rounded"/>
          <div class="mt-2 text-center">
            <h2 class="text-xl font-semibold">{{ product.name }}</h2>
            <p class="text-gray-500">${{ product.price }}</p>
            <p class="text-sm text-gray-400">In stock: {{ product.stock }}</p>
          </div>
        </div>
      </div>
    </RouterLink>
  </div>
  
</template>