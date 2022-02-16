<template>
  <div class="card w-auto bg-primary text-primary-content">
    <div class="card-body">
      <h2 class="card-title">Write a New Message</h2>
      <p>Whatever you write will stay in the blockchain forever 👽</p>
      <div>
        <textarea
          v-model="message"
          class="textarea textarea-primary w-full"
          placeholder="It's a wonderfull world"
        ></textarea>
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
  return 0 < message.value.length && message.value.length <= 280 && !loading.value;
});

const submit = async () => {
  if (submittable.value) {
    addMessage();
  }
};
</script>
