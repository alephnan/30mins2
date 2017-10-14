<template>
  <div id="app">
    <hello-world/>
  </div>
</template>

<script>
import Vue from 'vue';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.css';
import HelloWorld from './components/HelloWorld';
import { store } from './store';

Vue.use(VueMaterial);

Vue.material.registerTheme({
  default: {
    primary: 'blue',
    accent: 'red',
    warn: 'red',
    background: 'white',
  },
  dark: {
    primary: 'white',
    background: 'grey',
  },
});

export default {
  name: 'app',
  store,
  components: {
    HelloWorld,
  },
};
</script>

<style>
</style>
