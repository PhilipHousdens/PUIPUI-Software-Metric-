<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue';

const props = defineProps<{
  totalPages: number;
  currentPage: number;
}>();

const emit = defineEmits<{
  (e: 'pageChange', page: number): void;
}>();

function goToPage(page: number) {
  if (page !== props.currentPage && page >= 1 && page <= props.totalPages) {
    emit('pageChange', page);
  }
}

// Generate page numbers
const pages = computed(() => {
  console.log("Total Pages:", props.totalPages); // Debugging line
  return Array.from({ length: props.totalPages }, (_, i) => i + 1);
});
</script>

<template>
  <div class="flex justify-center mt-8">
    <button @click="goToPage(props.currentPage - 1)" :disabled="props.currentPage === 1">
      Prev
    </button>

    <span v-for="page in pages" :key="page">
      <button 
        @click="goToPage(page)" 
        :class="{ 'font-bold': page === props.currentPage }">
        {{ page }}
      </button>
    </span>

    <button @click="goToPage(props.currentPage + 1)" :disabled="props.currentPage === props.totalPages">
      Next
    </button>
  </div>
</template>

<style scoped>
button {
  margin: 0 0.25rem;
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  background-color: white;
  cursor: pointer;
  transition: background-color 0.2s;
}
button:hover:not([disabled]) {
  background-color: #f0f0f0;
}
button[disabled] {
  color: #aaa;
  cursor: not-allowed;
}
.font-bold {
  font-weight: bold;
}
</style>
