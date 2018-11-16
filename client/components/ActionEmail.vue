<script>
import { mapActions } from 'vuex';

export default {
  props: {
    id: Number,
    open: [Boolean, Object],
  },

  data: () => ({ email: { email: '' } }),

  watch: {
    open(val) {
      if (typeof val === 'object') {
        this.email.email = val.email;
      }
    },
  },

  methods: {
    ...mapActions(['createObject', 'updateObject']),

    onClose() {
      this.$emit('close');
      this.email.email = '';
    },

    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (!valid) return false;
        let promise;
        if (typeof this.open === 'object') {
          const payload = { type: 'emails', id: this.open.id, data: this.email };
          promise = this.updateObject(payload);
        } else {
          const payload = { type: 'emails', id: this.id, data: this.email };
          promise = this.createObject(payload);
        }
        return promise
          .then(() => this.$emit('close'))
          .catch(err => this.$message.error(err))
          .finally(() => {
            this.email.email = '';
          });
      });
    },
  },
};
</script>

<template>
  <el-dialog
    title="Add Email"
    :visible="!!open"
    @close="onClose"
    width="70%">
    <el-form
      ref="form"
      :model="email"
      label-width="120px">
      <el-form-item
        label="Email Address"
        :rules="[
          { type: 'email', message: 'Please input correct email address', trigger: 'blur' },
          { required: true, message: 'email can not be empty', trigger: 'blur' },
        ]">
        <el-input name="email" v-model="email.email" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button name="addEmail" type="primary" @click="onSubmit">Submit</el-button>
    </span>
  </el-dialog>
</template>
