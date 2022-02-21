<template>
  <div class="card w-auto bg-neutral text-neutral-content mt-12">
    <div class="card-body items-center text-center">
      <h2 class="card-title">Messages</h2>
      <div class="overflow-x-auto">
        <table class="table table-compact w-full" v-if="props.messages.length">
          <thead>
            <tr>
              <th>Posted On</th>
              <th>Message</th>
              <th>Author</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="message in sortedMessages" :key="message.index">
              <td>{{ formatTimeStamp(message.timestamp) }}</td>
              <td class="whitespace-normal">{{ message.content }}</td>
              <td>{{ message.author }}</td>
            </tr>
          </tbody>
        </table>
        <p v-else>No Messages Yet 🤷‍♂️</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type IMessage from "../../interfaces/IMessage";
import moment from 'moment';
import { computed } from "vue";

const formatTimeStamp = (value: any) => {
  return moment.unix(value.toNumber()).format('YYYY-MM-DD hh:mm');
} 
interface Iprops {
  messages: IMessage[];
}
const props = defineProps<Iprops>();

const sortedMessages = computed(() => {
  return [...props.messages].sort((a, b) => {
    return b.index - a.index;
  });
});
</script>
