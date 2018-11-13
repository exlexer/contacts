<script>
import api from '@/api';

export default {
  props: {
    contact: Number,
    open: Boolean,
  },

  data: () => ({ form: { phone: '' } }),

  methods: {
    onClose() {
      this.$emit('close');
    },

    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (!valid) return false;
        api.post(`contacts/${this.contact}/phones`, this.form)
          .then(() => {
            this.form.phone = '';
            this.$emit('update');
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
    @close="onClose"
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
        <el-input v-model="form.phone" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="onSubmit">Submit</el-button>
    </span>
  </el-dialog>
</template>
