<template>
  <div class="grid grid-cols-1 gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-5">
    <instance v-for="instanceObject in instances" :instance="instanceObject" />
  </div>
</template>

<script setup>
defineProps(['instances']);
</script>
