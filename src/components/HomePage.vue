<template>
  <div>
    <h1>Welcome to the Job Portal</h1>
    <p>
      <router-link to="/jobs">View Job Listings</router-link>
    </p>
    <p>
      <router-link to="/add-job">Add a New Job</router-link>
    </p>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
};
</script>

<style scoped>
h1 {
  margin-bottom: 20px;
}
p {
  margin-bottom: 10px;
}
</style>
