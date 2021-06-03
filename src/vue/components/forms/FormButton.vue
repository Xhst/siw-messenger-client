<template>
  <div class="form-group">
    <button :id="name" class="btn btn-lg btn-success text-white text-shadow">
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