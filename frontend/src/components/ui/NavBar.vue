<template>
  <div class="navbar bg-base-100">
    <div class="navbar-start">
      <a class="btn btn-ghost normal-case text-xl">Message Box</a>
    </div>
    <div class="navbar-end">
      <a class="btn" :class="{loading: loading}" v-if="props.wallet != ''">{{ props.wallet }}</a>
      <a class="btn" :class="{loading: loading}" v-else @click="connectWallet">Connect MetaMask</a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useEtherStore } from "../../stores/ether";

const { loading } = storeToRefs(useEtherStore());

const props = defineProps({
  wallet: String,
});

const emits = defineEmits(["connectWallet"]);

const connectWallet = () => {
  emits("connectWallet");
};
</script>
