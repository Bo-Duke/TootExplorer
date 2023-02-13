<template>
  <div class="w-full bg-blue-400 dark:bg-blue-600 h-56 box">
    <a
      href="https://github.com/Bo-Duke/TootExplorer"
      title="Fork me on GitHub"
      class="flex items-center absolute right-5 top-5 py-2 pl-3 pr-4 transition-colors text-gray-700 fill-gray-700 rounded dark:text-gray-200 dark:fill-gray-200 hover:text-gray-50 dark:hover:text-white hover:fill-gray-50 dark:hover:fill-white"
      ><svg class="inline-block mr-1" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
        <path
          d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
        />
      </svg>GitHub</a
    >
    <h1 class="mx-auto text-5xl text-center pt-20">TootExplorer 💫</h1>
    <h4 class="mx-auto text-center italic">Explore nearby Mastodon instances</h4>
  </div>
  <div class="container mx-auto text-center">
    <h2 class="text-2xl my-5">What Mastodon instances are your friends on?</h2>
    <p class="mb-10">
      Want to switch instance? Want to know the most popular instance in your circles?
    </p>
    <p class="mb-2">Enter your or your friend's full Mastodon handle :</p>
    <form @submit.prevent="searchUser">
      <label
        for="default-search"
        class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >Search</label
      >
      <div class="relative max-w-sm mx-auto">
        <input
          type="search"
          id="default-search"
          v-model="user"
          class="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="@me@example.com"
          required
        />
        <button
          v-if="!isLoading"
          type="submit"
          class="text-white absolute right-2.5 bottom-2.5 bg-blue-400 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
        <div role="status" class="absolute right-2.5 bottom-2.5" v-if="isLoading">
          <svg
            aria-hidden="true"
            class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </form>
    <instances-list :instances="instanceList" />
  </div>
</template>

<script>
import { fetchWithHeaders } from '../helpers/fetchAllFollowings';
import { generateInstanceList } from '../helpers/generateInstanceList';
import { fetchInstancesDetails } from '../helpers/fetchInstancesDetails';

const Index = {
  data() {
    return {
      user: null,
      instanceList: [],
      isLoading: false,
    };
  },
  methods: {
    async searchUser() {
      this.isLoading = true;
      const regex = /(.*)@(.*)/;
      const [, pseudo, instance] = this.user.match(regex);
      const { data: account } = await useFetch(
        `https://${instance}/api/v1/accounts/lookup?acct=${pseudo}`,
      );
      const { data: followings } = await fetchWithHeaders(
        `https://${instance}/api/v1/accounts/${account.value.id}/following`,
      );
      const instanceList = generateInstanceList(followings);
      const instanceDetails = await fetchInstancesDetails(instanceList);
      this.instanceList = instanceDetails;
      this.isLoading = false;
    },
  },
};

export default Index;
</script>
