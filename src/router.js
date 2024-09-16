import { createRouter, createWebHistory } from 'vue-router';
import JobList from './components/JobList.vue';
import AddJob from './components/AddJob.vue';
import HomePage from './components/HomePage.vue';

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/jobs', name: 'JobList', component: JobList },
  { path: '/add-job', name: 'AddJob', component: AddJob },
];

const router = createRouter({
  history: createWebHistory(), // Use createWebHistory for clean URLs
  routes,
});

export default router;
