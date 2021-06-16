<template>
  <div class="mb-4 p-3">
    <h2 class="text-primary mb-4">Register</h2>
    <form @submit.prevent>
      <form-input
        v-model="username"
        name="register_username"
        text="Username"
        type="text"
        description="L'username deve avere un minimo di 3 caratteri e un massimo di 10. Può contenere solo caratteri alfanumerici."
      />
      <form-input
        v-model="email"
        name="register_email"
        text="E-mail"
        type="text"
        description="Inserisci la tua e-mail."
      />
      <form-input
        v-model="password"
        name="register_password"
        text="Password"
        type="password"
        description="La password deve contenere almeno 6 caratteri di cui almeno uno numerico."
      />
      <form-input
        v-model="repeatPassword"
        name="register_repeat_password"
        text="Ripeti password"
        type="password"
      />
      <div class="pt-4"></div>
      <form-button
        @click.prevent="buttonPressed()"
        name="register_btn"
        text="Registrati"
      />
    </form>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import FormInput from "../forms/FormInput.vue";
import FormButton from "../forms/FormButton.vue";
import { namespace } from "vuex-class";
import { RegisterData } from "@/vue/store/modules/AuthModule";

const Auth = namespace("Auth");

@Options({
  components: {
    FormInput,
    FormButton,
  },
})
export default class RegisterVue extends Vue {
  username = "";
  email = "";
  password = "";
  repeatPassword = "";

  message = "";


  @Auth.Getter
  private isLoggedIn!: boolean;

  @Auth.Action
  private register!: (data: RegisterData) => Promise<any>;

  buttonPressed(): void {
    this.updateUsernameInput();
    this.updateEmailInput();
    this.updatePasswordInput();
    this.updateRepeatPasswordInput();

    if (
      //!this.checkUsername(this.username) ||
      !this.checkPassword(this.password) ||
      this.password != this.repeatPassword
    ) return;

    this.register({ username: this.username, email: this.email, password: this.password }).then(
          (data) => {
            this.message = data.message;
            //this.successful = true;
          },
          (error) => {
            this.message = error;
            //this.successful = false;
          }
        );
  }

  private checkUsername(username: string): boolean {
    const usernameRegExp = new RegExp(
      "(?=.{3,10}$)[a-zA-Z0-9]*$"
    );
    return usernameRegExp.test(username);
  }

  private checkEmail(email: string): boolean {
    return email !== "";
  }

  private checkPassword(password: string): boolean {
    const passwordRegExp = new RegExp("^(?=.{6,100}$).*[0-9].*[a-zA-Z0-9._-]$");
    return passwordRegExp.test(password);
  }

  private updateUsernameInput(): void {
    let usernameElement = document.getElementById("register_username");

    if (this.checkUsername(this.username)) {
      usernameElement?.classList.remove("is-invalid");
    } else {
      usernameElement?.classList.add("is-invalid");
    }
  }

  private updateEmailInput(): void {
    let emailElement = document.getElementById("register_email");

    if (this.checkEmail(this.email)) {
      emailElement?.classList.remove("is-invalid");
    } else {
      emailElement?.classList.add("is-invalid");
    }
  }

  private updatePasswordInput(): void {
    let passwordElement = document.getElementById("register_password");

    if (this.checkPassword(this.password)) {
      passwordElement?.classList.remove("is-invalid");
    } else {
      passwordElement?.classList.add("is-invalid");
    }
  }

  private updateRepeatPasswordInput(): void {
    let repeatPasswordElement = document.getElementById(
      "register_repeat_password"
    );

    if (this.password === this.repeatPassword) {
      repeatPasswordElement?.classList.remove("is-invalid");
    } else {
      repeatPasswordElement?.classList.add("is-invalid");
    }
  }
}
</script>