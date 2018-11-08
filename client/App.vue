<script>
export default {
  data: () => ({
    msg: 'TESTING',
  }),
};
</script>

<template>
  <el-container>
    <el-header>{{ msg }}</el-header>
    <el-main>Main</el-main>
  </el-container>
</template>

<style>
body, html {
  width: 100%;
  height: 100%;
}
</style>
