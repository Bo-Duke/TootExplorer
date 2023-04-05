<template>
  <a
    :href="details.url"
    class="flex ml-auto mr-auto mt-5 flex-col items-center max-w-md bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700"
  >
      <div class="px-3 w-full mt-auto flex justify-between">
        <div class="flex items-center space-x-2 mr-5">
          <img class="w-10 h-10 rounded-full" :src="details.avatar" :alt="`${user}'s avatar`" />
          <div class="font-medium dark:text-white flex flex-col items-start text-left">
            <div class="whitespace-nowrap overflow-hidden overflow-ellipsis w-32">{{ details.display_name }}</div>
            <div class="text-sm text-gray-500 dark:text-gray-400">
              @{{ user }}
            </div>
          </div>
        </div>
        <div class="flex flex-col ml-5" :title="`${details.following_count} followings`">
          <dt class="mb-0 my-2 text-xl font-extrabold">
            {{
              details.following_count < 1000
                ? details.following_count.toString()
                : (details.following_count / 1000).toFixed(1) + 'k'
            }}
          </dt>
          <dd class="font-light text-gray-500 dark:text-gray-400">Followings</dd>
        </div>
        <div class="flex flex-col mb-2" :title="`${details.followers_count} followers`">
          <dt class="mb-0 my-2 text-xl font-extrabold">
            {{
              details.followers_count < 1000
                ? details.followers_count.toString()
                : (details.followers_count / 1000).toFixed(1) + 'k'
            }}
          </dt>
          <dd class="font-light text-gray-500 dark:text-gray-400">Followers</dd>
        </div>
      </div>
  </a>
</template>

<script setup>
const props = defineProps(['details']);

const url = new URL(props.details.url);
const user = props.details.acct + '@' + url.host;
</script>
