<template>
  <div v-if="instances.length > 0" class="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 text-left" role="alert">
    <p class="mb-2">Some instances could not be queried, therefore they aren't shown :</p>
    <ul class="list-disc list-inside space-y-1">
        <li v-for="instance in instances" :key="instance.instance"><span class="font-medium"><a :href="instance.instance" class="hover:underline">{{ instance.instance }}</a> (<span :title="instance.users.map(e => e.acct).join(', ')" class="underline decoration-dashed">{{ instance.users.length }} friend{{instance.users.length > 1 ? 's' : ''}}</span>)</span> : {{ instance.error }}</li>
    </ul>
  </div>
</template>

<script setup>
defineProps(['instances']);
</script>
