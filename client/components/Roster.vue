<script>
export default {
  props: {
    open: Array,
    contacts: Array,
  },

  methods: {
    onClick(data) {
      const { open } = this;
      const contacts = open.filter(contact => contact.id === data.id);
      if (!contacts.length) this.$emit('open', data);
    },
  },
};
</script>

<template>
  <el-table
    :data="contacts"
    border
    stripe
    @row-click="onClick"
    style="width: 100%">
    <el-table-column
      prop="firstName"
      label="First"
    />
    <el-table-column
      prop="lastName"
      label="Last"
    />
    <el-table-column
      prop="dob"
      label="Birthday"
    />
  </el-table>
</template>
