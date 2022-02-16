<script setup lang="ts">
import NavBar from "./components/ui/NavBar.vue";
import { RouterView } from 'vue-router';

import { storeToRefs } from "pinia";
import { useEtherStore } from "./stores/ether";
const { connectWallet } = useEtherStore();
const { account } = storeToRefs(useEtherStore());
import { onMounted } from 'vue'

onMounted(() => {
  connectWallet(true);
})

</script>

<template>
  <div class="container mx-auto">
    <NavBar :wallet="account" @connectWallet="connectWallet" />
    <RouterView />
  </div>
</template>
