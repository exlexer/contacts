<script>
import { mapActions, mapState } from 'vuex';
import ActionAddress from './ActionAddress.vue';
import ActionEmail from './ActionEmail.vue';
import ActionPhone from './ActionPhone.vue';
import ActionContact from './ActionContact.vue';

export default {
  props: {
    id: { type: Number },
  },

  components: {
    ActionAddress,
    ActionEmail,
    ActionPhone,
    ActionContact,
  },

  data: () => ({
    editing: false,
    address: false,
    phone: false,
    email: false,
    info: [
      {
        prop: 'addresses',
        columns: [
          { prop: 'line_1', label: 'Line 1' },
          { prop: 'line_2', label: 'Line 2' },
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

    onEdit(type, obj) {
      this[this.parseType(type)] = obj;
    },


    onAdd(type) {
      this[this.parseType(type)] = true;
    },

    parseType(type) {
      return type.replace(/s$/, '').replace(/se$/, 's');
    },
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
        <span class="title">
        Full Name:
        </span>
        {{ contact.firstName | capitalize }} {{ contact.lastName | capitalize }}
        <br />
        <span class="title">
          Date of Birth:
        </span>
        {{ contact.dob }}
      </el-col>
      <el-col :span="18" style="text-align: right;">
        <el-button
          @click="editing = true"
          circle>
          <i class="el-icon-edit" />
        </el-button>
        <el-button
          type="danger"
          @click="onDelete('contacts', contact.id)"
          circle>
          <i class="el-icon-delete" />
        </el-button>
      </el-col>
    </el-row>
    <template v-for="(object, index) in info">
      <div
        :key="'h' + index"
        class="title">
        {{ object.prop | capitalize }}
        <el-button @click="onAdd(object.prop)" circle size="mini" style="margin-left: 5px;">
          <i class="el-icon-plus" />
        </el-button>
      </div>
      <el-table
        :key="'t' + index"
        :data="contact[object.prop]"
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
              @click="onEdit(object.prop, row)"
              circle>
              <i class="el-icon-edit" />
            </el-button>
            <el-button
              type="danger"
              @click="onDelete(object.prop, contact.id)"
              circle>
              <i class="el-icon-delete" />
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <!-- Adding Dialogs -->
    <ActionAddress
      :open="address"
      :id="contact.id"
      @close="address = false"
    />
    <ActionEmail
      :open="email"
      :id="contact.id"
      @close="email = false"
    />
    <ActionPhone
      :open="phone"
      :id="contact.id"
      @close="phone = false"
    />
    <ActionContact
      :open="editing ? contact : false"
      :id="contact.id"
      @close="editing = false"
    />
  </div>
</template>

<style scoped>
.info {
  padding: 10px;
  background: #FAFAFA;
  border-radius: 3px;
  color: #333;
  line-height: 20px;
}
.title {
  padding: 10px;
  color: #409EFF;
  margin: 10px;
}
</style>
