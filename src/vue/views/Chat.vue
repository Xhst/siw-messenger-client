<template>
  <div class="main-box my-0">
    <div class="row mx-0">
      <div class="left-bar col-sm-5 col-md-4 col-lg-3 border-right p-0">
        <chat-left-bar 
          :chats="Array.from(chats.values())"
          :currentChat="currentChat"
          :setCurrentChat="setCurrentChat"
          @setShowGroupModal="showGroupModal=true"/>
      </div>
      <div class="col-md-8 col-lg-9 px-0">
        <conversation :currentChat="currentChat"/>
      </div>
    </div>
  </div>
  <template v-if="showGroupModal">
    <group-modal @setShowGroupModal="showGroupModal=false"/>
  </template>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { IMessage } from "@stomp/stompjs";
import { SiwMessenger } from "@/app/SiwMessenger";
import { GetAllChatsRequest } from "@/app/websocket/OutgoingPackets";
import { AddChatResponse, AllChatsResponse, MessageRecieved } from "@/app/websocket/IncomingPackets";
import { Chat } from "@/app/chat/Chat";
import { Observable, Observer } from "@/app/core/interfaces";
import { WebSocketClient } from "@/app/websocket/WebSocketClient";
import GroupModal from "../components/chat/GroupModal.vue"
import Conversation from "../components/chat/Conversation.vue"
import ChatLeftBar from "../components/chat/ChatLeftBar.vue"
import { namespace } from "vuex-class";
import { getCookie } from "@/app/utils/Cookie";
const Auth = namespace("Auth");

@Options({
  components: {
    ChatLeftBar,
    Conversation,
    GroupModal
  },
})
export default class ChatVue extends Vue implements Observer {
  private chats: Map<number, Chat> = new Map<number, Chat>();
  currentChat: Chat | null = null;

  showGroupModal = false;

  friendUsername = "";

  @Auth.State("user")
  private currentUser!: any;

	mounted(): void {
		if (!this.currentUser) {
			this.$router.push("/");
      return;
		}

    const sm = SiwMessenger.instance;

    sm.webSocketClient.connect(this.currentUser.token);
    sm.webSocketClient.attach(this);
	}

  private addChat(id: number, name: string, isGroup: boolean = false, ownerName: string = ""): Chat {
      const chat = new Chat(id, name, isGroup, ownerName);

      this.chats.set(id, chat);

      return chat;
  }

  setCurrentChat(id: number): void {
    const chat = this.chats.get(id);
    if (chat) {
      this.currentChat = chat;
      chat.resetNotifications();
    }
  }

  onAddChat(message: IMessage): void {
    const body = JSON.parse(message.body);
    
    if (body.name === "") return;

    const chat = this.addChat(body.id, body.name, body.groupChat, body.ownerName);

    this.currentChat = chat;
  }

  onMessage(message: IMessage): void {
    const body = JSON.parse(message.body);

    const chat = this.chats.get(body.id)

    if (chat) {
      chat.addMessage(body.text, body.sendDate, body.from, true);

      if (chat !== this.currentChat) {
        chat.addNotification();
      }
    }
  }

  onAllChats(message: IMessage): void {
    const body = JSON.parse(message.body);

    for (const chat of body) {
      this.addChat(chat.id, chat.name, chat.groupChat, chat.ownerName)
    }
  }

  update(observable: Observable): void {
    if (observable instanceof WebSocketClient && observable.isConnected) {
      observable.subscribe(new MessageRecieved(this.onMessage));
      observable.subscribe(new AddChatResponse(this.onAddChat));
      observable.subscribe(new AllChatsResponse(this.onAllChats));

      (new GetAllChatsRequest()).send();
    }
  }
}
</script>

<style lang="scss">
.left-bar {
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  max-height: 100vh;
}
.top-bar {
  height: 70px;
}
.btn-plus {
  position: absolute;
  font-size: 2em;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  line-height: 1.1;
}
</style>