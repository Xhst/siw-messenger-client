<template>
<div class="card border-0">
    <template v-if="currentChat">
        <div class="card-header top-bar py-1 px-2 overflow-hidden border-0">
            <h4>
              <strong>{{ currentChat.isGroup ? 'Nome gruppo' : 'Chat con'}}: </strong>
              {{ currentChat.name }}
            </h4>
            <h5 v-if="currentChat.isGroup">
              <strong>Proprietario:</strong> {{ currentChat.ownerName }}
            </h5> 
        </div>
        <div class="chat-conversation card-body card background border-0 overflow-auto">
            <chat-bubble-vue
                v-for="cb in currentChat.conversation"
                v-bind:key="cb.id"
                v-bind:chatBubble="cb">
            </chat-bubble-vue>
        </div>
        <div class="w-100 card-footer p-0 bg-secondary border-0">
            <form @submit.prevent>
                <div class="row m-0 p-1">
                    <div class="col-9 m-0 p-1">
                    <input
                        v-model="chatText"
                        id="text"
                        class="rounded form-control form-control-lg"
                        type="text"
                        name="text"
                        placeholder="Scrivi un messaggio.."
                        required/>
                    </div>
                    <div class="col-3 m-0 p-1">
                        <button
                            @click.prevent="sendMessage"
                            class="btn btn-lg btn-success text-white text-shadow w-100">
                            Invia
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </template> 
</div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Chat } from "@/app/chat/Chat";
import { ChatMessage } from "@/app/websocket/OutgoingPackets";
import ChatBubbleVue from "./ChatBubble.vue";


@Options({
  components: {
    ChatBubbleVue,
  },
  props: {
    currentChat: Object as () => Chat,
  },
})
export default class Conversation extends Vue {
    private chatText = "";

    currentChat!: Chat | null;

    sendMessage(): void {
        if (!this.currentChat || this.chatText === "") return;

        let date = new Date();

        this.currentChat.addMessage(this.chatText, date.toString());

        new ChatMessage(
        this.currentChat.id,
        this.chatText
        ).send();

        this.chatText = "";
        this.$forceUpdate();
  }
    
}
</script>

<style lang="scss" scoped>
.top-bar.card-header {
  background-color: #efefef;
}

.card {
  background-color: transparent;
  height: 100vh;
}

.chat-conversation {
  flex:1;
}
</style>

