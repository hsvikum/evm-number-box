<script setup lang="ts">
import NavBar from "./components/ui/NavBar.vue";
import { RouterView } from 'vue-router';

import { storeToRefs } from "pinia";
import { useEtherStore } from "./stores/ether";
import { inject, onMounted } from 'vue'
const { connectWallet, setupNotifications } = useEtherStore();
const { account } = storeToRefs(useEtherStore());

onMounted(() => {
  connectWallet(true);
  const toast = inject('toast');
  setupNotifications(toast);
})

</script>

<template>
  <div class="container mx-auto">
    <NavBar :wallet="account" @connectWallet="connectWallet" />
    <RouterView />
  </div>
</template>
