<script>
import { mapActions } from 'vuex';

const newAddress = () => ({
  line1: '',
  line2: '',
  city: '',
  state: '',
  country: '',
});

export default {
  props: {
    id: Number,
    open: [Boolean, Object],
  },

  data: () => ({ address: newAddress() }),

  watch: {
    open(val) {
      if (typeof val === 'object') {
        this.address = val;
      }
    },
  },

  methods: {
    ...mapActions(['createObject', 'updateObject']),

    onClose() {
      this.$emit('close');
      this.address = newAddress();
    },

    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (!valid) return false;
        let promise;
        if (typeof this.open === 'object') {
          const payload = { type: 'addresses', id: this.open.id, data: this.address };
          promise = this.updateObject(payload);
        } else {
          const payload = { type: 'addresses', id: this.id, data: this.address };
          promise = this.createObject(payload);
        }
        return promise
          .then(() => this.$emit('close'))
          .catch(err => this.$message.error(err))
          .finally(() => {
            this.address = newAddress();
          });
      });
    },
  },
};
</script>

<template>
  <el-dialog
    title="Add Address"
    :visible="!!open"
    @close="onClose"
    width="70%">
    <el-form
      ref="form"
      :model="address"
      label-width="120px">
      <el-form-item
        label="Line 1"
        :rules="{ required: true, message: 'line 1 can not be empty', trigger: 'blur' }">
        <el-input
          name="line1"
          placeholder="Line 1"
          v-model="address.line1"/>
      </el-form-item>
      <el-form-item
        label="Line 2">
        <el-input
          name="line2"
          placeholder="Line 2"
          v-model="address.line2"/>
      </el-form-item>
      <el-form-item
        label="City"
        :rules="{ required: true, message: 'city can not be empty', trigger: 'blur' }">
        <el-input
          name="city"
          placeholder="City"
          v-model="address.city"/>
      </el-form-item>
      <el-form-item
        label="State"
        :rules="{ required: true, message: 'state can not be empty', trigger: 'blur' }">
        <el-input
          name="state"
          placeholder="State"
          v-model="address.state"/>
      </el-form-item>
      <el-form-item
        label="Country"
        :rules="{ required: true, message: 'country can not be empty', trigger: 'blur' }">
        <el-input
          name="country"
          placeholder="Country"
          v-model="address.country"/>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button name="addAddress" type="primary" @click="onSubmit">Submit</el-button>
    </span>
  </el-dialog>
</template>
