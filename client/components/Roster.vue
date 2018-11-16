<script>
import { mapMutations, mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      contacts: state => state.contacts,
    }),
  },

  methods: {
    ...mapMutations({
      openContact: 'OPEN_CONTACT',
    }),
  },
};
</script>

<template>
  <el-table
    :data="contacts"
    border
    stripe
    @row-click="openContact"
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
