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
