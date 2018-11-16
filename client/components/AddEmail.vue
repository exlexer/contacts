<script>
import api from '@/api';

export default {
  props: {
    contact: Number,
    open: Boolean,
  },

  data: () => ({ form: { email: '' } }),

  methods: {
    onClose() {
      this.$emit('close');
    },

    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (!valid) return false;
        return api.post(`contacts/${this.contact}/emails`, this.form)
          .then(() => {
            this.form.email = '';
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
    title="Add Email"
    :visible="open"
    @close="onClose"
    width="70%">
    <el-form
      ref="form"
      :model="form"
      label-width="120px">
      <el-form-item
        label="Email Address"
        :rules="[
          { type: 'email', message: 'Please input correct email address', trigger: 'blur' },
          { required: true, message: 'email can not be empty', trigger: 'blur' },
        ]">
        <el-input name="email" v-model="form.email" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button name="addEmail" type="primary" @click="onSubmit">Submit</el-button>
    </span>
  </el-dialog>
</template>
