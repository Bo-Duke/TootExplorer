<template>
    <div class="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        <p class="font-medium text-lg">Unable to find followings</p><br/>
        Did you hide your social graph?<br/><br/>
        You can check this in your user settings <a :href="`https://${instance}/settings/profile`" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">here</a>
    </div>
</template>

<script setup>
defineProps(['instance']);
</script>
