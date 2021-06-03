<template>
    <div class="top-bar py-3">
        <h3 class="text-center">
            Messenger <span class="badge bg-success text-shadow">SIW</span>
        </h3>
    </div>
    <div class="add-friend-box p-2 bg-secondary">
        <span v-if="currentUser">
            Ciao, <strong>{{ currentUser.username }}</strong>
            <button @click="logout" class="btn btn-sm btn-danger float-end">Logout</button>
        </span>
        <hr>
        <div class="flex-row xl-row"> 
            <div class="d-flex d-xl-inline-flex flex-column col-xl-7 pe-xl-1">
                <h6 class="mb-1">Aggiungi chat</h6>
                <form @submit.prevent>
                    <div class="input-group mb-3">
                        <input
                        v-model="friendUsername"
                        @keyup.enter="addPrivateChat"
                        type="text"
                        class="form-control"
                        placeholder="Username"/>
                        <button
                        @click.prevent="addPrivateChat"
                        class="btn btn-success text-white text-shadow position-relative"
                        type="button"
                        id="add-friend-btn">
                        &nbsp;&nbsp;&nbsp;
                        <span class="btn-plus">+</span>
                        </button>
                    </div>
                </form>
            </div>
            <div class="d-flex d-xl-inline-flex flex-column px-xl-1 col-xl-5">
                <h6 class="mb-1">Oppure</h6>
                <button  @click="setShowGroupModal(true)" type="button" class="btn btn-warning text-white text-shadow w-xl-100 text-nowrap" >Crea gruppo</button>
            </div> 
        </div>
    </div>
    <active-chats :chats="chats" :setCurrentChat="setCurrentChat"></active-chats>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { AddPrivateChatRequest } from "@/app/websocket/OutgoingPackets";
import { Chat } from "@/app/chat/Chat";
import { namespace } from "vuex-class";

import ActiveChats from "./ActiveChats.vue";

const Auth = namespace("Auth");

@Options({
  components: {
    ActiveChats,
  },
  props: {
    chats: Array,
    currentChat: Object as () => Chat,
    setCurrentChat: Function
  },
  methods: {
    setShowGroupModal() {
        this.$emit('setShowGroupModal')
    }
  },
  emits: ['setShowGroupModal']
})
export default class ChatLeftBar extends Vue {
  private friendUsername = "";

  @Auth.State("user")
  private currentUser!: any;

  @Auth.Action
  private signOut!: () => void

  currentChat!: Chat | null;

  addPrivateChat(): void {
    if (this.friendUsername === "") return;

    (new AddPrivateChatRequest(this.friendUsername)).send();
    this.friendUsername = "";
  }

  logout(): void {
    this.signOut();
    this.$router.push("/");
  }
}
</script>