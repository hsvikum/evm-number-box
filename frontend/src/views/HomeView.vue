<script setup lang="ts">
import NewMessage from "../components/ui/NewMessage.vue";
import MessageList from "../components/ui/MessageList.vue";
import NoMetaMask from "../components/ui/NoMetaMask.vue";

import { storeToRefs } from "pinia";
import { useEtherStore } from "../stores/ether";
import { computed } from "vue";

const { messages, chainId, account, canInteract } = storeToRefs(useEtherStore());

</script>

<template>
  <div class="flex justify-center" v-if="!canInteract">
    <NoMetaMask />
  </div>
  <div class="flex justify-center" v-if="canInteract">
    <NewMessage />
  </div>
  <div class="flex justify-center" v-if="canInteract">
    <MessageList :messages="messages" />
  </div>
</template>
