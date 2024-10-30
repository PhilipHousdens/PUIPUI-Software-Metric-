<template>
    <div class="min-h-screen bg-logo-cream py-8 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <div class="flex items-center justify-between mb-8">
          <h1 class="text-3xl font-bold text-gray-900">Shopping Bag</h1>
          <router-link 
            to="/" 
            class="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            Continue Shopping
          </router-link>
        </div>
        
        <div v-if="cartItems.length > 0" class="space-y-6">
          <!-- Cart Items Container -->
          <div class="bg-white rounded-xl shadow-sm overflow-hidden">
            <div class="divide-y divide-gray-200">
              <ShoppingBagItem 
                v-for="item in cartItems" 
                :key="item.id"
                :item="item"
                @update-quantity="updateQuantity"
                @remove-item="removeItem"
              />
            </div>
          </div>
  
          <!-- Order Summary Card -->
          <div class="bg-white rounded-xl shadow-sm p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
            <div class="space-y-3">
              <div class="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span class="font-medium text-gray-900">฿{{ calculateTotal().toFixed(2) }}</span>
              </div>
              <div class="border-t border-gray-200 pt-3">
                <button 
                  @click="checkout"
                  class="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Empty Cart State -->
        <div v-else class="text-center py-16 bg-white rounded-xl shadow-sm">
          <div class="mb-6">
            <span class="text-5xl">🛍️</span>
          </div>
          <p class="text-gray-600 text-lg mb-8">Your shopping bag is empty</p>
          <router-link 
            to="/" 
            class="inline-block bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium"
          >
            Start Shopping
          </router-link>
        </div>
      </div>
    </div>
  </template>

<script setup>
import { ref, onMounted } from 'vue';
import ShoppingBagItem from '@/component/ShoppingBagItem.vue';
import { useToast } from 'vue-toastification';

const toast = useToast();
const cartItems = ref([]);

const loadCartItems = () => {
  try {
    const savedItems = localStorage.getItem('cartItems');
    if (savedItems) {
      cartItems.value = JSON.parse(savedItems);
    }
  } catch (error) {
    console.error('Error loading cart items:', error);
    toast.error('Failed to load cart items');
  }
};

const updateQuantity = (itemId, newQuantity) => {
  try {
    const item = cartItems.value.find(item => item.id === itemId);
    if (item) {
      if (newQuantity > 0 && newQuantity <= 10) { 
        item.quantity = newQuantity;
        saveCartItems();
        toast.success('Quantity updated');
      } else {
        toast.warning('Quantity must be between 1 and 10');
      }
    }
  } catch (error) {
    console.error('Error updating quantity:', error);
    toast.error('Failed to update quantity');
  }
};

const removeItem = (itemId) => {
  try {
    cartItems.value = cartItems.value.filter(item => item.id !== itemId);
    saveCartItems();
    toast.success('Item removed from cart');
  } catch (error) {
    console.error('Error removing item:', error);
    toast.error('Failed to remove item');
  }
};

const saveCartItems = () => {
  try {
    localStorage.setItem('cartItems', JSON.stringify(cartItems.value));
  } catch (error) {
    console.error('Error saving cart items:', error);
    toast.error('Failed to save cart changes');
  }
};

const calculateTotal = () => {
  return cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0);
};

const checkout = () => {
  if (cartItems.value.length === 0) {
    toast.warning('Your cart is empty');
    return;
  }
  
  try {
    toast.info('Proceeding to checkout...');
    cartItems.value = [];
    saveCartItems();
  } catch (error) {
    console.error('Error during checkout:', error);
    toast.error('Checkout failed');
  }
};

onMounted(() => {
  loadCartItems();
});
</script>