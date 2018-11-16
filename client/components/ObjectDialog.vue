<script>
import api from '@/api';

const newAddress = () => ({
  line1: '',
  line2: '',
  city: '',
  state: '',
  country: '',
});

export default {
  data: () => ({
    type: null,
    data: {},
    fields: [],
    contactId: null,
    id: null,
  }),

  computed() {
    title() {
      const { id, type } = this;
      return `${ id ? 'Editing' : 'Adding' } ${ type }`;
    },
  },

  mounted() {
    const { fields, data } = this;
    for (let i = 0; i < fields.length; i += 1) {
      if (!data[fields[i].prop]) {
        data[fields[i].prop] = fields[i].prop;
        this.id = data.id;
      } else {
        data[fields[i].prop] = null;
      }
    }
  },

  methods: {
    ...mapActions(['createObject', 'updateObject']),

    onComplete() {
      this.$refs.form.validate((valid) => {
        if (!valid) return false;
        const { object, contactId, type, data } = this;
        const payload = { type, id: contactId, data };
        const fn = !!object ? this.updateObject : this.createObject;

        fn(payload)
          .then(() => this.onClose())
          .catch(err => this.$message.error(err));
      });
    },
  },
};
</script>

<template>
  <el-dialog
    :title="title"
    :visible="true"
    @close="onClose"
    width="70%">
    <el-form
      ref="form"
      :model="form"
      label-width="120px">
      <template v-for="field in fields">
        <el-form-item
          v-if="field.type === 'text'"
          :key="field.prop"
          :label="field.label"
          :rules="field.rules">
          <el-input
            :name="field.prop"
            :placeholder="field.label"
            v-model="value[field.prop]"/>
        </el-form-item>
      </template>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button name="submit" type="primary" @click="onComplete">Submit</el-button>
    </span>
  </el-dialog>
</template>
