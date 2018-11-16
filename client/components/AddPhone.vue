<script>
import { mapActions } from 'vuex';
import api from '@/api';

export default {
  props: {
    contact: Number,
    open: Boolean,
  },

  data: () => ({ form: { phone: '' } }),

  methods: {
    ...mapActions({
      createObject: 'createObject',
    }),

    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (!valid) return false;
        console.log(this.contact);
        const payload = { type: 'phones', id: this.contact, data: this.form };
        return this.createObject(payload)
          .then(() => {
            this.$emit('close');
          })
          .catch(err => this.$message.error(err));
      });
    },
  },
};
</script>

<template>
  <el-dialog
    title="Add Phone Number"
    :visible="open"
    @close="$emit('close');"
    width="70%">
    <el-form
      ref="form"
      :model="form"
      label-width="120px">
      <el-form-item
        label="Phone Number"
        :rules="[
          { required: true, message: 'phone number can not be empty', trigger: 'blur' },
        ]">
        <el-input name="phone" v-model="form.phone" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button name="addPhone" type="primary" @click="onSubmit">Submit</el-button>
    </span>
  </el-dialog>
</template>
