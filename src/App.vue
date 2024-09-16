<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/jobs">Job Listings</router-link> |
      <router-link to="/add-job">Add Job</router-link>
    </nav>
    <router-view></router-view> <!-- This will display the routed components -->
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style scoped>
nav {
  margin-bottom: 20px;
}
</style>
