<script setup>
</script>

<template>
  <!-- Header and the Banner -->
  <div class=" bg-logo-cream h-screen">
    <header class="">
      <!-- Banner -->
     <div class="bg-logo-cream" >
        <div class="flex justify-center items-center">
          <RouterLink :to="{name: 'home'}">
            <img class="ml-5 w-20 rounded-full text-center" src="./assets/PUIPUI.png" alt="logo">
          </RouterLink>
        </div>
     </div>
    </header>
    <main>
    </main>
    <RouterView />
  </div>
</template>

