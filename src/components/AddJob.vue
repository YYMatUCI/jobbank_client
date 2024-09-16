<template>
  <div>
    <h2>Add a New Job</h2>
    <form @submit.prevent="submitJob">
      <div>
        <label for="title">Job Title:</label>
        <input v-model="job.title" id="title" required>
      </div>
      <div>
        <label for="company">Company:</label>
        <input v-model="job.company" id="company" required>
      </div>
      <div>
        <label for="location">Location:</label>
        <input v-model="job.location" id="location" required>
      </div>
      <div>
        <label for="link">Link:</label>
        <input v-model="job.link" id="link" required>
      </div>
      <button type="submit">Add Job</button>
    </form>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import { useMutation } from '@vue/apollo-composable';

export default {
  data() {
    return {
      job: {
        title: '',
        company: '',
        location: '',
        link: '',
      },
    };
  },
  setup() {
    const ADD_JOB = gql`
      mutation($title: String!, $company: String!, $location: String!, $link: String!) {
        addJob(title: $title, company: $company, location: $location, link: $link) {
          id
          title
          company
          location
          link
        }
      }
    `;

    const { mutate: addJob } = useMutation(ADD_JOB);

    return { addJob };
  },
  methods: {
    async submitJob() {
      const { title, company, location, link } = this.job;
      try {
        await this.addJob({ title, company, location, link });
        alert('Job added successfully!');
        this.job = { title: '', company: '', location: '', link: '' }; // Reset the form
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
