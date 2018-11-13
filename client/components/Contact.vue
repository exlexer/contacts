<script>
import api from '@/api';

export default {
  props: {
    contact: Object,
  },

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
        <el-button @click="onContactDelete">Delete</el-button>
        <el-button @click="onEdit">Edit</el-button>
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
