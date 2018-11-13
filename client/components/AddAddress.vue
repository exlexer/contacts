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
  props: {
    contact: Number,
    open: Boolean,
  },

  data: () => ({ form: newAddress() }),

  methods: {
    onClose() {
      this.$emit('close');
    },

    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (!valid) return false;
        api.post(`contacts/${this.contact}/addresses`, this.form)
          .then(() => {
            this.form = newAddress();
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
    title="Add Address"
    :visible="open"
    @close="onClose"
    width="70%">
    <el-form
      ref="form"
      :model="form"
      label-width="120px">
      <el-form-item
        label="Line 1"
        :rules="{ required: true, message: 'line 1 can not be empty', trigger: 'blur' }"
        :label="!index ? 'Address' : ''">
        <el-input
          placeholder="Line 1"
          v-model="form.line1"/>
      </el-form-item>
      <el-form-item
        label="Line 2">
        <el-input
          placeholder="Line 2"
          v-model="form.line2"/>
      </el-form-item>
      <el-form-item
        label="City"
        :rules="{ required: true, message: 'city can not be empty', trigger: 'blur' }">
        <el-input
          placeholder="City"
          v-model="form.city"/>
      </el-form-item>
      <el-form-item
        label="State"
        :rules="{ required: true, message: 'state can not be empty', trigger: 'blur' }">
        <el-input
          placeholder="State"
          v-model="form.state"/>
      </el-form-item>
      <el-form-item
        label="country"
        :rules="{ required: true, message: 'country can not be empty', trigger: 'blur' }">
        <el-input
          placeholder="Country"
          v-model="form.country"/>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="onSubmit">Submit</el-button>
    </span>
  </el-dialog>
</template>
