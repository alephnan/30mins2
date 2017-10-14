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

export default {
  name: 'app',
  store,
  components: {
    HelloWorld,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
