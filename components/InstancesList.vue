<template>
  <div v-if="instances.length > 0" class="grid grid-cols-1 gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-5">
    <instance :v-for="instanceObject in instances" :key="instanceObject.domain" :instance="instanceObject" />
  </div>
  <no-followings-error v-else :instance="instance" />
</template>

<script setup>
defineProps(['instances', 'instance']);
</script>
