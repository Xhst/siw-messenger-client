<template>
  <div class="input-container">
    <div class="form-floating">
      <input
        :type="type"
        :id="name"
        :aria-describedby="name + '_help'"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="form-control"
        placeholder="placeholder"
      />
      <label :for="name">{{ text }}</label>
    </div>
    <small :id="name + '_help'" class="form-text text-muted">{{
      description
    }}</small>
  </div>
</template>


<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    name: String,
    text: String,
    type: String,
    description: String,
    modelValue: String,
  },
})
export default class FormInputVue extends Vue {
  name!: string;
  type!: string;
  description!: string;
}
</script>

<style scoped lang="scss">
.input-container {
  margin-bottom: 15px;
}
</style>