<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <BaseFormField :title="title" :error="error">
    <textarea v-model="dataValue"
    class="form__input form__input--area"
    :name="name" :placeholder="placeholder"></textarea>
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
