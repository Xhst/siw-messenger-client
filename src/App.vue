<template>
  <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
    <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
    </symbol>
    <symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16">
      <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
    </symbol>
    <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
      <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
    </symbol>
  </svg>
  <template v-if="errors.length > 0"> 
    <div class="position-absolute w-100" style="z-index:3000; opacity:0.95">
      <div class="container p-5">
        <div class="alert alert-danger alert-dismissible w-100" role="alert">
          <h4 class="alert-heading">
          <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
          Oops!
          </h4>
          <button @click="closeErrorsAlert()" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          <hr>
          <ul>
            <li v-for="error in errors" v-bind:key="error">
              {{ error }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>

  <router-view />
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { Observable, Observer } from "./app/core/interfaces";
import { SiwMessenger } from "./app/SiwMessenger";

export default class AppVue extends Vue implements Observer {
  errors: string[] = []

  mounted(): void {
    SiwMessenger.instance.attach(this);
  }

  private displayErrors(errors: string[]): void {
    this.errors = errors;
  }

  private closeErrorsAlert(): void {
    this.errors = [];
  }

  update(observable: Observable): void {
    if (observable instanceof SiwMessenger) {
      console.log("ERRORS:" + observable.errors);
      this.displayErrors(observable.errors);
    }
  }
}
</script>

<style lang="scss">
@import "./assets/styles/custom.scss";

@font-face {
  font-family: roboto;
  src: url("./assets/fonts/Roboto-Medium.ttf");
}

body,
html {
  padding: 0;
  margin: 0;
  font-family: roboto, sans-serif;
  height: 100%;
}

#app {
  padding: 0;
  margin: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  background-color: #cee7e7;
  width: 100%;
  min-height: 100%;
}
</style>
