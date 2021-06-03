<template>
  <router-view />
</template>


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
