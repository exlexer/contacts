<script>
import api from '@/api';
import { Header, Roster, Contact, AddContact } from '@/components';

export default {
  components: { Header, Roster, Contact, AddContact },

  data: () => ({
    contacts: [],
    open: [],
    active: 'home',
    adding: false,
  }),

  mounted() {
    this.getContacts();
  },

  methods: {
    onUpdate() {
      this.getContacts()
        .then(() => {
          const { open, contacts } = this;
          for (let i = 0; i < open.length; i += 1) {
            open[i] = contacts.filter(c => c.id == open[i].id)[0];
          }
        });
    },

    getContacts() {
      const promise = api.get('contacts');

      promise.then(({ data }) => {
        this.contacts = data;
      });

      return promise;
    },

    onContactDelete() {
      const { open } = this;
      this.getContacts();
      for (let i = 0; i < open.length; i += 1) {
        console.log(open[i].id);
        console.log(this.active);
        if (open[i].id === +this.active) {
          this.onClose(i);
        }
      }
      this.active = 'home';
    },

    onOpen(data) {
      const { open } = this;
      open.push(data);
      this.active = data.id.toString();
    },

    onClose(index) {
      this.open.splice(index, 1);
    },

    onNavigate(targetName, action) {
      if (action === 'add') {
        // Open Dialog for adding.
        this.adding = true;
      }
      if (action === 'remove') {
        if (targetName === 'home') this.$message.error('Oops, you can\'t close home');
        this.open = this.open.filter(tab => tab.id.toString() !== targetName);
        this.active = 'home';
      }
    },
  },
};
</script>

<template>
  <el-container>
    <el-main>

      <!-- Tabs -->
      <el-tabs
        type="card"
        editable
        v-model="active"
        @edit="onNavigate">
        <el-tab-pane
          label="Home"
          name="home">
          <Roster
            :open="open"
            :contacts="contacts"
            @open="onOpen"
          />
        </el-tab-pane>
        <el-tab-pane
          v-for="item in open"
          :key="item.id.toString()"
          :label="`${item.firstName} ${item.lastName}`"
          :name="item.id.toString()">
          <Contact
            :contact="item"
            @delete="onContactDelete"
            @update="onUpdate"
          />
        </el-tab-pane>
      </el-tabs>
    </el-main>

    <!-- Dialogs -->
    <AddContact
      :open="adding"
      @close="adding = false"
      @update="getContacts"
    />
  </el-container>
</template>

<style>
body, html {
  width: 100%;
  height: 100%;
  margin: 0;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.el-header {
  background-color: #545c64;
  color: #333;
  line-height: 60px;
}
</style>
