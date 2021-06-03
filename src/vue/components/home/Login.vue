<template>
  <div class="mb-4 p-3">
    <h2 class="text-primary mb-4">Login</h2>
    <form @submit.prevent>
      <form-input
        v-model="username"
        name="login_username"
        text="Username"
        type="text"
        description=""/>
      <form-input
        v-model="password"
        name="login_password"
        text="Password"
        type="password"/>
      <div class="pt-4"></div>
      <form-button
        @click.prevent="buttonPressed()"
        name="login_btn"
        text="Accedi"/>
    </form>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import FormInput from "../forms/FormInput.vue";
import FormButton from "../forms/FormButton.vue";
import { namespace } from "vuex-class";
import { LoginData } from "@/vue/store/modules/AuthModule";
const Auth = namespace("Auth");

@Options({
  components: {
    FormInput,
    FormButton,
  },
})
export default class LoginVue extends Vue {
  username = "";
  password = "";

  message = "";

  @Auth.Getter
  private isLoggedIn!: boolean;

  @Auth.Action
  private login!: (data: LoginData) => Promise<any>;

  buttonPressed(): void {
    if (this.username === "" || this.password === "") return;


    this.login({ username: this.username, password: this.password }).then(
      (data) => {
        this.$router.push("/chat");
      },
      (error) => {
        console.log(error)
        this.message = error;
      }
    );
  }
}
</script>