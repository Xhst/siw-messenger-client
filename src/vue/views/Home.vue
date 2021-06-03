<template>
	<div class="container-xl pt-4">
		<h1 class="mt-0">Messenger <span class="badge bg-success text-shadow">SIW</span></h1>

		<div class="main-box background shadow rounded my-5" :key="$route.path">
			<div class="row mx-0 vertical-divider">
				<div class="col-md-6">
					<login/>
				</div>
				<hr class="d-md-none col mx-4" />
				<div class="col-md-6">
					<register/>
				</div>
			</div>
		</div>
		<form class="form-inline">
			<div class="form-group">
				<input
					type="text"
					id="from"
					class="form-control"
					v-model="from"
					placeholder="from"/>
				<input
					type="text"
					id="to"
					class="form-control"
					v-model="to"
					placeholder="to"/>
				<input
					type="text"
					id="message"
					class="form-control"
					v-model="message"
					placeholder="message"/>
			</div>
			<button
				id="send"
				class="btn btn-default"
				type="submit"
				@click.prevent="send"
			>
				Send
			</button>
		</form>
	</div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Login from "../components/home/Login.vue";
import Register from "../components/home/Register.vue";
import { namespace } from "vuex-class";
const Auth = namespace("Auth");

@Options({
	components: {
		Login,
		Register,
	},
})
export default class HomeVue extends Vue {
	from = "";
	to = "";
	message = "";

	@Auth.State("user")
  	private currentUser!: any;

	mounted() {
		if (this.currentUser) {
			this.$router.push("/chat");
		}
	}
}
</script>
