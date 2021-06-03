<template>
  <div class="chats">
    <ul class="list-group">
      <li v-for="(chat, index) in chats" :key="`chat-${index}`"
        class="list-group-item d-flex align-items-start"
        @click="setCurrentChat(chat.id)">
        <div 
          :class="chat.isGroup ? 'bg-warning' : 'bg-primary'" 
          class="chat-img rounded-circle text-shadow">
            {{ chat.name.charAt(0).toUpperCase() }}
        </div>
        <div class="chat-username">{{ chat.name }}</div>
        <template v-if="chat.notifications > 0">
          <span class="chat-notification badge bg-danger rounded-pill">{{ chat.notifications > 99 ? '99+' : chat.notifications }}</span>
        </template>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Chat } from "@/app/chat/Chat";

@Options({
  props: {
    chats: Array,
    setCurrentChat: Function
  },
})
export default class ActiveChats extends Vue {
  chats!: Chat[];
}
</script>

<style lang="scss" scoped>
.chats {
  width: 100%;
  flex: 1;
  overflow: auto;
}

.chats ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.chats ul li {
  width: 100%;
  padding: 0.5em;
  cursor: pointer;
  position: relative;
}

.chats ul li:nth-child(odd) {
  background-color: rgba(0, 0, 0, 0.025);
}

.chats ul li:hover::after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.05);
  border-right: 5px solid rgb(216, 136, 189);
}

.chats ul li .chat-img {
  width: 60px;
  height: 60px;
  color: #fff;
  font-size: 2em;
  font-weight: bold;
  text-align: center;
  line-height: 1.9;
  display: inline-block;
  margin-right: 20px;
}

.chats ul li .chat-username {
  display: inline-block;
  vertical-align: top;
  font-weight: 1.5em;
}

.chats ul li .chat-notification {
  display:block;
  position:absolute;
  top:10px;
  right:10px;
}
</style>