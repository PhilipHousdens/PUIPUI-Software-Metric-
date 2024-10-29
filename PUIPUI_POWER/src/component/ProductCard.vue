<script setup lang="ts">
import {ref}  from 'vue'
import { type Product } from '@/types'

defineProps<{
    product: Product
}>()

</script>

<template>
  <RouterLink :to="{name: 'productDetail',params:{id: product._id}}" >
     <div class="grid grid-cols-2 gap-6 px-10">
      <div class="border p-4 rounded-lg shadow-md">
        <img :src="product.imgUrl" alt="Product image" class="w-full h-40 object-cover rounded"/>
        <div class="mt-2 text-center">
          <h2 class="text-xl font-semibold">{{ product.name }}</h2>
          <p class="text-gray-500">${{ product.price }}</p>
          <p class="text-sm text-gray-400">In stock: {{ product.stock }}</p>
        </div>
      </div>
    </div>
    </RouterLink>
</template>