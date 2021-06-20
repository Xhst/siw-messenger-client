<template>
  <div class="input-container">
    <button :id="name" class="btn btn-lg btn-success text-white text-shadow position-relative">
      {{ text }}
    </button>
  </div>
</template>


<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    name: String,
    text: String,
  },
})
export default class FormButtonVue extends Vue {
  name!: string;
}
</script>