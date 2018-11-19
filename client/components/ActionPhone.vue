<script>
import { mapActions } from 'vuex';

export default {
  props: {
    id: Number,
    open: [Boolean, Object],
  },

  data: () => ({ phone: { phone: '' } }),

  watch: {
    open(val) {
      if (typeof val === 'object') {
        this.phone.phone = val.phone_number;
      }
    },
  },

  methods: {
    ...mapActions(['createObject', 'updateObject']),

    onClose() {
      this.$emit('close');
      this.phone.phone = '';
    },

    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (!valid) return false;
        let promise;
        if (typeof this.open === 'object') {
          const payload = { type: 'phones', id: this.open.id, data: this.phone };
          promise = this.updateObject(payload);
        } else {
          const payload = { type: 'phones', id: this.id, data: this.phone };
          promise = this.createObject(payload);
        }
        return promise
          .then(() => this.$emit('close'))
          .catch(err => this.$message.error(err))
          .finally(() => {
            this.phone.phone = '';
          });
      });
    },
  },
};
</script>

<template>
  <el-dialog
    title="Add Phone Number"
    :visible="!!open"
    @close="onClose"
    width="70%">
    <el-form
      ref="form"
      :model="phone"
      label-width="120px">
      <el-form-item
        prop="phone"
        label="Phone Number"
        :rules="[
          { required: true, message: 'phone number can not be empty', trigger: 'blur' },
        ]">
        <el-input name="phone" type="number" v-model="phone.phone" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button name="addPhone" type="primary" @click="onSubmit">Submit</el-button>
    </span>
  </el-dialog>
</template>
