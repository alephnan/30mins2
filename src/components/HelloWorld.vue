<template>
  <div class="hello">
    <!--<h1>{{ msg }}</h1>-->
    <button v-on:click="loadGraph">Load</button>
    <div id="graph">
    </div>

    <!--<h1 v-if="outdated">Graph is outdated</h1>-->
    <h1>Nodes</h1>
    <ul>
      <li v-for="node in nodes">
        <b>Node Id:</b> {{node.id}}
         <button @click="deleteNode(node)">
          Delete
        </button>
      </li>
    </ul>
    <h2>Add node</h2>
    <input v-model="nodeid" placeholder="node id">
    <button @click="addNode()">
        Add
    </button>

    <h1>Edges</h1>
    <ul>
      <li v-for="edge in edges">
        {{edge.from}} -> {{edge.to}}
         <button @click="deleteEdge(edge)">
          Delete
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import vis from 'vis';
import store from '../store';

export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      nodeid: '',
    };
  },
  watch: {
    outdated(outdated) {
      if (outdated) {
        this.loadGraph();
      }
    },
  },
  computed: {
    nodes() {
      return store.state.nodes;
    },
    edges() {
      return store.state.edges;
    },
    outdated() {
      return !store.state.upToDate;
    },
  },
  methods: {
    addNode() {
      store.commit('addnode', this.$data.nodeid);
      this.$data.nodeid = '';
    },
    deleteNode(node) {
      store.commit('deletenode', node.id);
    },
    deleteEdge(edge) {
      store.commit('deleteedge', edge);
    },
    loadGraph() {
      const data = {
        nodes: new vis.DataSet(store.state.nodes),
        edges: new vis.DataSet(store.state.edges),
      };
      const options = {};
      const container = document.getElementById('graph');
      const network = new vis.Network(container, data, options);
      console.log(network);
      store.commit('updatedGraph');
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

a {
  color: #42b983;
}
</style>
