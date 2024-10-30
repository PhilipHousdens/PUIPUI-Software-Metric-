<template>
    <div class="flex items-center gap-6 p-6 hover:bg-gray-50 transition-colors duration-200">
      <!-- Product Image with subtle shadow and rounded corners -->
      <div class="relative w-24 h-24">
        <img 
          :src="item.image" 
          :alt="item.name"
          class="w-full h-full object-cover rounded-lg shadow-sm"
        />
      </div>
      
      <!-- Product Details with improved typography -->
      <div class="flex-grow">
        <h3 class="text-lg font-medium text-gray-900">{{ item.name }}</h3>
        <p class="text-gray-600 mt-1">฿{{ item.price.toFixed(2) }}</p>
        
        <!-- Quantity Controls with improved styling -->
        <div class="flex items-center gap-4 mt-3">
          <div class="flex items-center border border-gray-200 rounded-lg overflow-hidden">
            <button 
              @click="updateQuantity(item.id, Math.max(1, item.quantity - 1))"
              class="px-3 py-1 hover:bg-gray-100 transition-colors text-gray-600"
            >
              −
            </button>
            <span class="px-4 py-1 text-gray-900 font-medium border-x border-gray-200">
              {{ item.quantity }}
            </span>
            <button 
              @click="updateQuantity(item.id, item.quantity + 1)"
              class="px-3 py-1 hover:bg-gray-100 transition-colors text-gray-600"
            >
              +
            </button>
          </div>
          
          <button 
            @click="removeItem(item.id)"
            class="text-sm text-red-500 hover:text-red-700 transition-colors"
          >
            Remove
          </button>
        </div>
      </div>
      
      <!-- Item Total with improved prominence -->
      <div class="text-right">
        <p class="font-semibold text-lg text-gray-900">
          ฿{{ (item.price * item.quantity).toFixed(2) }}
        </p>
      </div>
    </div>
  </template>
    
  <script setup>
  defineProps({
    item: {
      type: Object,
      required: true
    }
  });
  
  const emit = defineEmits(['updateQuantity', 'removeItem']);
  
  const updateQuantity = (itemId, newQuantity) => {
    emit('updateQuantity', itemId, newQuantity);
  };
  
  const removeItem = (itemId) => {
    emit('removeItem', itemId);
  };
  </script>