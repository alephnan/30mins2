<template>
  <div class="hello">
    <!--<h1>{{ msg }}</h1>-->
    <button v-on:click="loadGraph">Load</button>
    <div id="graph">
    </div>
  </div>
</template>

<script>
import vis from 'vis';

const nodes = new vis.DataSet([
  { id: 1, label: 'Node 1' },
  { id: 2, label: 'Node 2' },
  { id: 3, label: 'Node 3' },
  { id: 4, label: 'Node 4' },
]);

const edges = new vis.DataSet([
  { from: 1, to: 3 },
  { from: 1, to: 2 },
  { from: 2, to: 4 },
]);

const data = {
  nodes,
  edges,
};
const options = {};


export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
  methods: {
    loadGraph() {
      const container = document.getElementById('graph');
      const network = new vis.Network(container, data, options);
      console.log(JSON.stringify(vis));
      console.log(JSON.stringify(network));
      console.log('hi');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
