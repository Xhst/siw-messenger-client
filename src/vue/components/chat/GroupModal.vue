<template>
    <div class="modal fade show" style="display:block">
        <div class="modal-dialog modal-lg modal-fullscreen-md-down">
            <div class="modal-content">
            <div class="modal-header bg-secondary">
                <h5 class="modal-title">Crea gruppo</h5>
                <button @click="setShowGroupModal(false)" type="button" class="btn-close"></button>
            </div>
            <div class="modal-body">
                <h5 class="mb-0">Utenti aggiunti al gruppo:</h5>
                <div class="text-muted mb-2" style="font-size:0.75em">Premi la &#x2715; per rimuverli</div>
                <i v-if="groupUsernames.size == 0">Non hai ancora aggiunto nessuno</i>
                <ul class="p-0 m-0">
                    <li v-for="(username, index) in groupUsernames" :key="`chat-${index}`"
                        class="m-1 badge bg-secondary align-middle">
                        <span class="text-dark inline-block pe-2">{{ username }}</span>
                        <button @click="groupUsernames.delete(username)" type="button" class="btn-close" style="height:0.5em; width: 0.5em"></button>
                    </li>
                </ul>
                <hr>
                <h5 class="mt-3">Aggiungi:</h5>
                <div class="input-group mt-1 mb-3">
                    <input
                        v-model="groupUser"
                        @keyup.enter="addGroupUser"
                        type="text"
                        class="form-control"
                        placeholder="Username"/>
                    <button
                        @click.prevent="addGroupUser"
                        class="btn btn-success text-white text-shadow position-relative"
                        type="button"
                        id="add-friend-btn">
                        &nbsp;&nbsp;&nbsp;
                        <span class="btn-plus">+</span>
                    </button>
                </div>
                <p>
                Scrivi gli username degli utenti che vuoi aggiungere.
                </p>
                <h5 class="mt-3">Scegli un nome per il gruppo:</h5>
                <input
                    v-model="groupName"
                    type="text"
                    class="form-control"
                    placeholder="Nome gruppo"/>
            </div>
            <div class="modal-footer">
                <button @click="addGroupChat" type="button" class="btn btn-warning text-white text-shadow">Conferma</button>
            </div>
            </div>
        </div>
    </div>
    <div class="modal-backdrop fade show"></div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { AddGroupChatRequest } from "@/app/websocket/OutgoingPackets";

@Options({
  methods: {
    setShowGroupModal() {
        this.$emit('setShowGroupModal')
    }
  },
  emits: ['setShowGroupModal']
})
export default class GroupModal extends Vue {
    private groupUsernames: Set<string> = new Set<string>();
    private groupName = "";
    private groupUser = "";

    showGroupModal!: boolean;

    addGroupUser(): void {
        if (this.groupUser === "") return;

        this.groupUsernames.add(this.groupUser);
        this.groupUser = ""; 
    }

    addGroupChat(): void {
        if (this.groupUsernames.size == 0 || this.groupName == "") return;

        (new AddGroupChatRequest(this.groupName, this.groupUsernames)).send();

        this.groupName = "";
        this.groupUsernames.clear();
    }


}
</script>