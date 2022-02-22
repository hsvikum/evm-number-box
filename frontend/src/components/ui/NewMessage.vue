<template>
  <div class="card w-auto bg-primary text-primary-content">
    <div class="card-body">
      <h2 class="card-title">Write a New Number</h2>
      <p>Whatever you write will stay in the blockchain forever 👽</p>
      <div>
        <input type="number"
          v-model="message"
          class="input input-bordered input-primary w-full"
          placeholder="Only possitive numbers"
        />
      </div>
      <div class="justify-end card-actions">
        <button
          class="btn"
          @click="submit"
          :class="{ 'btn-disabled': !submittable }"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

import { storeToRefs } from "pinia";
import { useEtherStore } from "../../stores/ether";
const { message, loading } = storeToRefs(useEtherStore());
const { addMessage } = useEtherStore();

const submittable = computed(() => {
  return parseInt(message.value) >= 0 && parseInt(message.value) < Number.MAX_SAFE_INTEGER && !loading.value;
});

const submit = async () => {
  if (submittable.value) {
    addMessage();
  }
};
</script>
