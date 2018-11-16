<script>
import { mapActions, mapState } from 'vuex';
import AddAddress from './AddAddress.vue';
import AddEmail from './AddEmail.vue';
import AddPhone from './AddPhone.vue';

export default {
  props: {
    id: { type: Number },
  },

  components: {
    AddAddress,
    AddEmail,
    AddPhone,
  },

  data: () => ({
    addingAddress: false,
    addingPhone: false,
    addingEmail: false,
    info: [
      {
        prop: 'addresses',
        columns: [
          { prop: 'line1', label: 'Line 1' },
          { prop: 'line2', label: 'Line 2' },
          { prop: 'city', label: 'City' },
          { prop: 'state', label: 'State' },
          { prop: 'country', label: 'Country' },
        ],
      },
      {
        prop: 'phones',
        columns: [{ prop: 'phone_number', label: 'Number' }],
      },
      {
        prop: 'emails',
        columns: [{ prop: 'email', label: 'Email Address' }],
      },
    ],
  }),

  methods: {
    ...mapActions(['deleteObject']),

    onDelete(type, id) {
      this.deleteObject({ type, id });
    },

    onEdit() { },
  },

  computed: {
    ...mapState({
      contacts: state => state.contacts,
    }),
    contact() {
      const { id, contacts } = this;
      const found = contacts.filter(c => c.id === id)[0];
      return found || {};
    },
  },
};
</script>

<template>
  <div>
    <el-row class="info">
      <el-col :span="6">
        {{ contact.firstName | capitalize }} {{ contact.lastName | capitalize }}
        <br />
        {{ contact.dob }}
      </el-col>
      <el-col :span="18" style="text-align: right;">
        <el-button @click="addingPhone = true">Add phone</el-button>
        <el-button @click="addingAddress = true">Add address</el-button>
        <el-button @click="addingEmail = true">Add email</el-button>
        <el-button @click="onEdit">Edit</el-button>
        <el-button
          type="danger"
          @click="onDelete('contacts', contact.id)">Delete</el-button>
      </el-col>
    </el-row>
    <template v-for="(object, index) in info">
      <div
        :key="'h' + index"
        class="title">
        {{ object.prop | capitalize }}
      </div>
      <el-table
        :key="'t' + index"
        :data="contact[object.prop]"
        border
        stripe
        style="width: 100%">
        <el-table-column
          v-for="(column, i) in object.columns"
          :key="`col_${column.prop}${i}`"
          :prop="column.prop"
          :label="column.label"
        />
        <el-table-column
          width="180"
          label="Operations">
          <template slot-scope="{ row }">
            <el-button
              size="mini"
              @click="onEdit(row)">Edit</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="onDelete(object.prop, row.id)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <!-- Adding Dialogs -->
    <AddAddress
      :open="addingAddress"
      :contact="contact.id"
      @close="addingAddress = false"
    />
    <AddEmail
      :open="addingEmail"
      :contact="contact.id"
      @close="addingEmail = false"
    />
    <AddPhone
      :open="addingPhone"
      :contact="contact.id"
      @close="addingPhone = false"
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
