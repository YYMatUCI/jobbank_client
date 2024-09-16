<template>
  <div>
    <h1>Job Listings</h1>
    <p v-if="loading">Loading jobs...</p>
    <p v-if="error">Error loading jobs: {{ error.message }}</p>
    <ul v-if="jobs && jobs.length">
      <li v-for="(job, index) in jobs" :key="index">
        <h2>{{ job.title }}</h2>
        <p>Company: {{ job.company }}</p>
        <p>Location: {{ job.location }}</p>
        <a :href="job.link" target="_blank">Apply here</a>
        <!-- Delete Button -->
        <button @click="deleteJob(job.id)">Delete</button>
      </li>
    </ul>
    <p v-else>No jobs available</p>
  </div>
</template>

<script>
import { ref, watch, onMounted } from 'vue';
import { useQuery, useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { useRouter, onBeforeRouteUpdate } from 'vue-router';

export default {
  setup() {
    const router = useRouter(); // Get the current route
    const jobs = ref([]);
    const loading = ref(true);
    const error = ref(null);

    // GraphQL query to fetch jobs
    const GET_JOBS = gql`
      query {
        jobs {
          id
          title
          company
          location
          link
        }
      }
    `;

    // GraphQL mutation to delete a job
    const DELETE_JOB = gql`
      mutation($id: ID!) {
        deleteJob(id: $id) {
          id
        }
      }
    `;

    // Apollo query to fetch jobs
    const { result, loading: queryLoading, error: queryError, refetch } = useQuery(GET_JOBS, {
      fetchPolicy: 'network-only',
    });

    // Apollo mutation to delete a job
    const { mutate: deleteJobMutation } = useMutation(DELETE_JOB);

    // Watch the result of the query and update jobs when available
    watch(result, (newResult) => {
      if (newResult && newResult.jobs) {
        jobs.value = newResult.jobs;
      }
      loading.value = false; // Set loading to false when data is fetched
    });

    // Delete a job by calling the mutation
    const deleteJob = async (id) => {
      try {
        await deleteJobMutation({ id }); // Pass job id to delete
        jobs.value = jobs.value.filter((job) => job.id !== id); // Update local job list
        alert('Job deleted successfully');
      } catch (err) {
        console.error('Error deleting job:', err);
        alert('Failed to delete job');
      }
    };

    // Refetch jobs when the route changes using beforeRouteUpdate
    router.beforeEach((to, from, next) => {
      if (to.path === '/jobs') {
        loading.value = true; // Reset loading state
        refetch(); // Refetch the jobs when navigating back
      }
      next();
    });

    // Use beforeRouteUpdate to refetch jobs when navigating back to this page
    onBeforeRouteUpdate((to, from, next) => {
      if (to.path === '/jobs') {
        loading.value = true;
        refetch();
      }
      next();
    });

    onMounted(() => {
      console.log('Component mounted, loading state:', queryLoading.value); // Debugging log
      console.log('jobs:', jobs); // Debugging log
      loading.value = false;
      error.value = queryError.value;
    });

    return {
      jobs,
      loading,
      error,
      deleteJob,
    };
  },
};
</script>

<style scoped>
button {
  background-color: red;
  color: white;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: darkred;
}
</style>
