<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <BaseFormField :title="title" :error="error">
    <input v-model="dataValue"
      class="form__input" :type="type" :name="name" :placeholder="placeholder">
  </BaseFormField>
 </template>

<script>
import formFieldMixin from '@/mixins/formFieldMixin';

export default {
  props: {
    type: {
      default: 'text',
    },
  },
  mixins: [formFieldMixin],
};
</script>
