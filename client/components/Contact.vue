<script>
import api from '@/api';
import AddAddress from './AddAddress.vue';
import AddEmail from './AddEmail.vue';
import AddPhone from './AddPhone.vue';

export default {
  components: {
    AddAddress,
    AddEmail,
    AddPhone,
  },

  props: {
    contact: Object,
  },

  data: () => ({
    addingAddress: false,
    addingPhone: false,
    addingEmail: false,
  }),

  methods: {
    onContactDelete() {
      api.delete(`contacts/${this.contact.id}`)
        .then(() => {
          this.$emit('delete');
        });
    },

    onEdit(id) {
      console.log(id);
    },

    onItemDelete(type, id) {
      api.delete(`${type}/${id}`)
        .then(() => {
          this.$emit('update');
        })
    },
  },
};
</script>

<template>
  <div>
    <el-row class="info">
      <el-col :span="12">
        {{ contact.firstName | capitalize }} {{ contact.lastName | capitalize }}
        <br />
        {{ contact.dob }}
      </el-col>
      <el-col :span="12" style="text-align: right;">
        <el-button @click="addingPhone = true">Add phone</el-button>
        <el-button @click="addingAddress = true">Add address</el-button>
        <el-button @click="addingEmail = true">Add email</el-button>
        <el-button @click="onEdit">Edit</el-button>
        <el-button 
          type="danger"
          @click="onContactDelete">Delete</el-button>
      </el-col>
    </el-row>
    <div class="title">Addresses</div>
    <el-table
      :data="contact.addresses"
      border
      stripe
      style="width: 100%">
      <el-table-column
        prop="line_1"
        label="Line 1"
      />
      <el-table-column
        prop="line_2"
        label="Line2"
      />
      <el-table-column
        prop="city"
        label="City"
      />
      <el-table-column
        prop="state"
        label="State"
      />
      <el-table-column
        prop="country"
        label="Country"
      />
      <el-table-column
        label="Operations">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="onEdit(scope.row.id)">Edit</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="onItemDelete('addresses', scope.row.id)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="title">Phones</div>
    <el-table
      :data="contact.phones"
      border
      stripe
      style="width: 100%">
      <el-table-column
        prop="phone_number"
        label="Number"
      />
      <el-table-column
        label="Operations">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="onEdit(scope.row.id)">Edit</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="onItemDelete('phones', scope.row.id)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="title">Emails</div>
    <el-table
      :data="contact.emails"
      border
      stripe
      style="width: 100%">
      <el-table-column
        prop="email"
        label="Email Address"
      />
      <el-table-column
        label="Operations">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="onEdit(scope.row.id)">Edit</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="onItemDelete('emails', scope.row.id)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- Adding Dialogs -->
    <AddAddress
      :open="addingAddress"
      :contact="contact.id"
      @close="addingAddress = false"
      @update="$emit('update')"
    />
    <AddEmail
      :open="addingEmail"
      :contact="contact.id"
      @close="addingEmail = false"
      @update="$emit('update')"
    />
    <AddPhone
      :open="addingPhone"
      :contact="contact.id"
      @close="addingPhone = false"
      @update="$emit('update')"
    />
  </div>
</template>

<style scopes>
.info {
  padding: 10px;
  background: #99a9bf;
  border-radius: 3px;
}
.title {
  padding: 10px;
}
</style>
