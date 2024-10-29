<script setup>
import { ref, computed } from 'vue';


const products = ref([
  {
    _id: "1",
    name: "Varsity M-Letter Sweater",
    description: "Retro collegiate style with bold color blocking in burgundy, forest green, and beige. Features a striking orange 'M' letter patch and ribbed crew neck. Perfect for achieving that preppy academic look.",
    price: 55,
    imgUrl: "https://imgur.com/WZQWmxj.jpg",
    stock: 65
  },
  {
    _id: "2",
    name: "Color Block N-Letter Pullover",
    description: "Classic horizontal stripe design in neutral tones of beige, black, and brown. Featuring a bold 'N' letter graphic and comfortable ribbed trim. Perfect for casual weekends and laid-back style.",
    price: 48,
    imgUrl: "https://imgur.com/VyUDou1.jpg",
    stock: 58
  },
  {
    _id: "3",
    name: "Speckled G-Letter Sweater",
    description: "Cozy cream-colored knit with multicolored flecks throughout. Features a bold black 'G' varsity letter. Oversized fit perfect for comfortable, street-style looks.",
    price: 52,
    imgUrl: "https://imgur.com/Y6ybAvk.jpg",
    stock: 54
  },
  {
    _id: "4",
    name: "Pastel Stripe B-Letter Sweater",
    description: "Soft color-block design in lavender, beige, and brown tones. Features a vintage-style 'B' letter patch and relaxed fit. Perfect for a cozy yet stylish lounge look.",
    price: 45,
    imgUrl: "https://imgur.com/AS6LCzL.jpg",
    stock: 62
  },
  {
    _id: "5",
    name: "Checkered E-Letter Pullover",
    description: "Light and airy white and pale blue checkered pattern with a bold 'E' letter design. Features a classic crew neck and relaxed fit. Perfect for a fresh, preppy aesthetic.",
    price: 50,
    imgUrl: "https://imgur.com/hlW5Qcd.jpg",
    stock: 60
  },
  {
    _id: "6",
    name: "Forest Holiday Stripe Sweater",
    description: "Festive horizontal stripes in rich dark green and maroon create a perfect Christmas mood. Features a cozy knit texture and classic fit. Ideal for winter gatherings and holiday celebrations.",
    price: 53,
    imgUrl: "https://imgur.com/DTdv8LQ.jpg",
    stock: 56
  },
]);

// Pagination state
const itemsPerPage = 4; // Display 4 products per page
const currentPage = ref(1);

// Computed pagination logic
const totalPages = computed(() => Math.ceil(products.value.length / itemsPerPage));
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return products.value.slice(start, start + itemsPerPage);
});

// Pagination control methods
function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++;
}

function prevPage() {
  if (currentPage.value > 1) currentPage.value--;
}
</script>

<template>
  <div class="mt-10">
    <!-- Product Grid (2x2 layout) -->
    <div class="grid grid-cols-2 gap-6 px-10">
      <div
        v-for="product in paginatedProducts"
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

    <!-- Pagination Controls -->
    <div class="flex justify-center mt-6 space-x-4">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
      >
        &lt;
      </button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
      >
        &gt;
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Custom styling */
</style>
