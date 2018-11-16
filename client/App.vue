<script>
import { mapMutations, mapActions, mapState } from 'vuex';
import { Roster, Contact, ActionContact } from '@/components';

export default {
  components: { Roster, Contact, ActionContact },

  data: () => ({
    adding: false,
  }),

  mounted() {
    this.getContacts();
  },

  computed: {
    ...mapState({
      open: state => state.open,
      activeState: state => state.active,
    }),
    active: {
      get() { return this.activeState; },
      set(value) { this.navigate(value); },
    },
  },

  methods: {
    ...mapActions({
      getContacts: 'getContacts',
    }),
    ...mapMutations({
      navigate: 'NAVIGATE',
      closeContact: 'CLOSE_CONTACT',
    }),

    onContactDelete() {
      const { open } = this;
      this.getContacts();
      for (let i = 0; i < open.length; i += 1) {
        if (open[i].id === +this.active) {
          this.onClose(i);
        }
      }
      this.navigate('home');
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
        else {
          this.closeContact({ id: targetName });
          this.navigate('home');
        }
      }
    },
  },
};
</script>

<template>
  <el-container>
    <el-header>
      Contacts
    </el-header>
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
          <Roster />
        </el-tab-pane>
        <el-tab-pane
          v-for="item in open"
          :key="item.id.toString()"
          :label="`${item.firstName} ${item.lastName}`"
          :name="item.id.toString()">
          <Contact :id="item.id" />
        </el-tab-pane>
      </el-tabs>
    </el-main>

    <!-- Dialogs -->
    <ActionContact
      :open="adding"
      @close="adding = false"
    />
  </el-container>
</template>

<style>
.el-header {
  background-color: #409EFF;
  color: #fff;
  font-weight: 500;
  font-size: 20px;
  line-height: 60px;
}

body, html {
  width: 100%;
  height: 100%;
  margin: 0;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}
</style>
