import { createApp, provide, h } from 'vue';
import App from './App.vue';
import router from './router'; // Import Vue Router
import { ApolloClients } from '@vue/apollo-composable';
import apolloClient from './apollo'; // Import the Apollo Client configuration

const app = createApp({
  setup() {
    // Provide Apollo Client globally to all components
    provide(ApolloClients, {
      default: apolloClient,
    });
  },
  render: () => h(App),
});

// Use Vue Router
app.use(router);

// Mount the app
app.mount('#app');
