<script>
import { mapActions } from 'vuex';

const newContact = () => ({
  firstName: '',
  lastName: '',
  dob: '',
  addresses: [],
  emails: [{ value: '' }],
  phones: [{ value: '' }],
});

export default {
  props: {
    open: Boolean,
  },

  data: () => ({ contact: newContact() }),

  methods: {
    ...mapActions({
      addContact: 'addContact',
      createObject: 'createObject',
    }),

    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (!valid) return false;

        const { emails, phones } = this.contact;

        const data = {
          emails: [],
          phones: [],
        };

        for (let i = 0; i < emails.length; i += 1) {
          data.emails.push(emails[i].value);
        }

        for (let i = 0; i < phones.length; i += 1) {
          data.phones.push(phones[i].value);
        }

        const payload = { type: 'contacts', data: { ...this.contact, ...data } };

        return this.createObject(payload)
          .then(() => {
            this.contact = newContact();
            this.$emit('close');
          });
      });
    },

    addItem(type) {
      const data = type === 'addresses'
        ? {
          line1: '',
          line2: '',
          city: '',
          state: '',
          country: '',
        } : { value: '' };

      this.contact[type].push(data);
    },

    removeItem(type, item) {
      if (!['phones', 'emails'].includes(type)
        || this.contact[type].length > 1) {
        const index = this.contact[type].indexOf(item);
        if (index !== -1) {
          this.contact[type].splice(index, 1);
        }
      }
    },
  },
};
</script>

<template>
  <el-dialog
    title="Add Contact"
    :visible="open"
    @close="$emit('close')"
    width="70%">
    <el-form
      v-if="contact"
      ref="form"
      :model="contact"
      label-width="120px">
      <el-form-item
        label="First Name"
        :rules="[
          { required: true, message: 'Please input first name', trigger: 'blur' },
        ]">
        <el-input name="firstName" v-model="contact.firstName" />
      </el-form-item>
      <el-form-item
        label="Last Name"
        :rules="[
          { required: true, message: 'Please input last name', trigger: 'blur' },
        ]">
        <el-input name="lastName" v-model="contact.lastName" />
      </el-form-item>
      <el-form-item
        label="Date of Birth"
        :rules="[
          { type: 'date', required: true, message: 'Please pick a date', trigger: 'change' },
        ]">
        <el-date-picker
          type="date"
          name="birth"
          placeholder="Select Date"
          v-model="contact.dob"
          style="width: 100%;"
        />
      </el-form-item>
      <el-form-item
        v-for="(phone, index) in contact.phones"
        :label="!index ? 'Phone Number' : ''"
        :key="'p' + index"
        :prop="`phones.${index}.value`"
        :rules="{
          required: true, message: 'phone number can not be empty', trigger: 'blur'
        }">
        <el-input
          :name="`phone${index}`"
          v-model="phone.value" />
        <el-button
          @click.prevent="removeItem('phones', phone)"
          v-if="!!index">
          Delete
        </el-button>
      </el-form-item>
      <el-form-item
        v-for="(email, index) in contact.emails"
        :label="!index ? 'Email' : ''"
        :key="'e' + index"
        :prop="`emails.${index}.value`"
        :rules="[
          { type: 'email', message: 'Please input correct email address', trigger: 'blur' },
          { required: true, message: 'email can not be empty', trigger: 'blur' },
        ]">
        <el-input
          :name="`email${index}`"
          v-model="email.value" />
        <el-button
          @click.prevent="removeItem('emails', email)"
          v-if="!!index">
          Delete
        </el-button>
      </el-form-item>
      <template
        v-for="(address, index) in contact.addresses">
        <el-form-item
          :key="'a' + index + 'line1'"
          :prop="`addresses.${index}.line1`"
          :rules="{ required: true, message: 'line 1 can not be empty', trigger: 'blur' }"
          :label="!index ? 'Address' : ''">
          <el-input
            :name="`address${index}`"
            placeholder="Line 1"
            v-model="address.line1"/>
        </el-form-item>
        <el-form-item
          :key="'a' + index + 'line2'">
          <el-input
            placeholder="Line 2"
            v-model="address.line2"/>
        </el-form-item>
        <el-form-item
          :key="'a' + index + 'city'"
          :prop="`addresses.${index}.city`"
          :rules="{ required: true, message: 'city can not be empty', trigger: 'blur' }">
          <el-input
            placeholder="City"
            v-model="address.city"/>
        </el-form-item>
        <el-form-item
          :key="'a' + index + 'state'"
          :prop="`addresses.${index}.state`"
          :rules="{ required: true, message: 'state can not be empty', trigger: 'blur' }">
          <el-input
            placeholder="State"
            v-model="address.state"/>
        </el-form-item>
        <el-form-item
          :key="'a' + index + 'country'"
          :prop="`addresses.${index}.country`"
          :rules="{ required: true, message: 'country can not be empty', trigger: 'blur' }">
          <el-input
            placeholder="Country"
            v-model="address.country"/>
        </el-form-item>
        <el-button
          :key="'a' + index + 'delete'"
          @click.prevent="removeItem('addresses', address)">
          Delete
        </el-button>
      </template>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button name="addPhone" @click="addItem('phones')">Add phone</el-button>
      <el-button name="addEmail" @click="addItem('emails')">Add email</el-button>
      <el-button name="addAddress" @click="addItem('addresses')">Add address</el-button>
      <el-button name="submit" type="primary" @click="onSubmit">Submit</el-button>
    </span>
  </el-dialog>
</template>
