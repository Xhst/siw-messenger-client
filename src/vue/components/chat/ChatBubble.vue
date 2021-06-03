<template>
  <div
    v-bind:class="[chatBubble.isRight ? 'right' : 'left', chatBubble.isGroupMessage ? 'group' : '']"
    class="chat-bubble p-2 position-relative "
    :send-date="formatDate(chatBubble.sendDate)"
    :from="chatBubble.from">
	<span
	  :class="[
		chatBubble.isRight
		  ? 'float-end bg-primary'
		  : 'float-start bg-secondary',
	  ]"
    class="shadow-sm">
      <template v-if="chatBubble.isGroupMessage">
        <i class="group text-success">
          {{ chatBubble.from }}
        </i>
      </template>
      {{ chatBubble.text }}
    </span>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { ChatBubble } from "@/app/chat/Chat";

@Options({
  props: {
	  chatBubble: Object as () => ChatBubble,
  },
})
export default class ChatBubbleVue extends Vue {
  chatBubble!: ChatBubble;

  formatDate(str: string): string {
    const date = new Date(str);
    const hours = date.getHours();
    const minutes = (date.getMinutes() < 10 ? '0' : '' ) + date.getMinutes();

    return hours + ":" + minutes;
  }
}
</script>

<style lang="scss" scoped>
.chat-bubble {
  margin: 7px 0;
}
.chat-bubble .group {
  display: block;
  font-size: 0.75em;
  margin-bottom: -5px;
}
.chat-bubble span {
  display: block;
  border-radius: 18px;
  max-width: 75%;
  padding: 10px 20px;
  text-decoration: none;
}
.chat-bubble.left span {
  border-bottom-left-radius: 3px;
  color: #333;
}
.chat-bubble.right span {
  border-bottom-right-radius: 3px;
  color: #fff;
}
.chat-bubble:before {
  content: attr(send-date);
  position: absolute;
  bottom: -0.75em;
  display: block;
  font-size: 0.75rem;
  color: rgb(90, 90, 100);
}
.chat-bubble.left:before {
  left: 10px;
}
.chat-bubble.right:before {
  right: 10px;
}
</style>