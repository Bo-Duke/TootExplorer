<template>
  <div
    class="flex flex-col items-center max-w-sm bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700"
  >
      <img class="rounded-t-lg aspect-[19/10] w-full" :src="instance.thumbnail.url" alt="" />
      <a :href="instance.instance" class="p-5 inline-flex items-baseline text-blue-600 hover:underline">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {{ instance.domain }}
        </h5>
        <svg
          class="w-5 h-5 ml-2"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"
          ></path>
          <path
            d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"
          ></path>
        </svg>
      </a>
      <p class="px-5 mb-3 font-normal text-gray-700 dark:text-gray-400">
        {{ instance.description }}
      </p>
      <div class="px-3 w-full mt-auto flex justify-between">
        <div class="flex items-center space-x-2">
          <img class="w-10 h-10 rounded-full" :src="instance.contact.account.avatar" alt="" />
          <div class="font-medium dark:text-white flex flex-col items-start text-left">
            <div :title="instance.contact.account.display_name" class="whitespace-nowrap overflow-hidden overflow-ellipsis w-32">{{ instance.contact.account.display_name }}</div>
            <div class="text-sm text-gray-500 dark:text-gray-400">
              @{{ instance.contact.account.username }}
            </div>
          </div>
        </div>
        <div class="flex flex-col" :title="`${instance.usage.users.active_month} active users`">
          <dt class="mb-2 text-xl font-extrabold">
            {{
              instance.usage.users.active_month < 1000
                ? instance.usage.users.active_month.toString()
                : (instance.usage.users.active_month / 1000).toFixed(1) + 'k'
            }}
          </dt>
          <dd class="font-light text-gray-500 dark:text-gray-400">Users</dd>
        </div>
        <div class="flex flex-col">
          <dt class="mb-2 text-xl font-extrabold">{{ instance.users.length }}</dt>
          <dd class="font-light text-gray-500 dark:text-gray-400">Friends</dd>
        </div>
      </div>
      <div class="px-5 pb-5 flex justify-center mt-5">
        <a
          v-for="user in instance.users.slice(0, 7)"
          class="-mr-3 hover:mr-0 transition-all"
          :title="`@${user.username}`"
          :href="user.url"
        >
          <img
            class="w-10 h-10 border-2 border-white bg-white dark:bg-gray-800 rounded-full dark:border-gray-800"
            :src="user.avatar"
            alt=""
          />
        </a>
        <button
          v-if="instance.users.length > 7"
          :data-dropdown-toggle="`dropdown-${instance.domain}`"
          class="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800"
        >
          +{{ instance.users.slice(7).length }}
        </button>
        <div
          :id="`dropdown-${instance.domain}`"
          class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700"
        >
          <ul
            class="py-2 text-left text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            <li v-for="user in instance.users.slice(7)">
              <a
                :href="user.url"
                class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <img
                  class="w-8 h-8 mr-2 border-2 border-white bg-white dark:bg-gray-800 rounded-full dark:border-gray-800"
                  :src="user.avatar"
                  alt=""
                />@{{ user.username }}
              </a>
            </li>
          </ul>
        </div>
      </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { initDropdowns } from 'flowbite';

defineProps(['instance']);

onMounted(() => {
  initDropdowns();
});
</script>
