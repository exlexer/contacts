<script>
import { mapState, mapMutations } from 'vuex';

export default {
  props: {
    openContacts: Array,
    activePage: String,
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
    ...mapMutations({
      navigate: 'NAVIGATE',
    }),

    onClose(e, index) {
      e.preventDefault();
      this.$emit('close', index);
    },

    onSelect(index) {
      this.$emit('navigate', index);
    },
  },
};
</script>

<template>
  <el-menu
    :default-active="active"
    mode="horizontal"
    background-color="#545c64"
    active-text-color="#ffd04b"
    text-color="#fff"
    @select="onSelect">
    <el-menu-item index="home">Home</el-menu-item>
    <el-menu-item
      v-for="(contact, index) in open"
      :key="index"
      :index="index.toString()">
      {{ contact.firstName | capitalize }} {{ contact.lastName | capitalize }}
      <button
        class="close"
        @click.prevent="e => onClose(e, index)">
        <i class="el-icon-close"></i>
      </button>
    </el-menu-item>
  </el-menu>
</template>

<style scoped>
.close:focus {
  outline: none;
}
.close {
  cursor: pointer;
  border: 1px solid #dcdfe6;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  color: #333;
  line-height: 0px;
  padding: 0px;
}

.close i {
  width: 11px;
  margin-right: 0px;
  margin-left: -10px;
  font-size: 11px;
}
</style>
