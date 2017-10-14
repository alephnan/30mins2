<template>
  <div class="hello">
    <md-tabs class="md-transparent" md-centered>
      <md-tab md-icon="share" md-label="Graph">
        <button v-on:click="loadGraph">Load</button>
        <div id="graph">
        </div>
      </md-tab>
      <md-tab md-icon="grain" md-label="Nodes" :md-options="{new_badge: 3}">
        <h1>Nodes</h1>
        <ul>
          <li v-for="node in nodes">
            <md-chip md-deletable @delete="deleteNode(node)">{{node.id}}</md-chip>
          </li>
        </ul>
        <h2>Add node</h2>
        <form novalidate @submit.stop.prevent="submit">
          <md-input-container>
            <label>Node Id</label>
            <md-input v-model="nodeid"></md-input>
          </md-input-container>
          <md-button class="md-icon-button md-raised md-accent" @click="addNode()">
            <md-icon>add </md-icon>
          </md-button>
          <md-snackbar :md-position="'bottom left'" ref="snackbarAddnode" :md-duration="'2000'">
            <span>Adding node</span>
            <md-button class="md-accent" md-theme="light-blue" @click="$refs.snackbar.close()">Dismiss</md-button>
          </md-snackbar>
        </form>
      </md-tab>
      <md-tab md-icon="compare_arrows" md-label="Edges" :md-options="{new_badge: 1}">
        <h1>Edges</h1>
        <ul>
          <li v-for="edge in edges">
            <md-chip md-deletable @delete="deleteEdge(edge)"> {{edge.from}} -> {{edge.to}}</md-chip>
          </li>
        </ul>
        <h2>Add Edge</h2>
        <form novalidate @submit.stop.prevent="submit">
          <md-input-container>
            <label>From</label>
            <md-input v-model="edgefrom"></md-input>
          </md-input-container>
          <md-input-container>
            <label>To</label>
            <md-input v-model="edgeto"></md-input>
          </md-input-container>
          <md-snackbar :md-position="'bottom left'" ref="snackbarAddedge" :md-duration="'2000'">
            <span>Adding edge</span>
            <md-button class="md-accent" md-theme="light-blue" @click="$refs.snackbar.close()">Dismiss</md-button>
          </md-snackbar>
        </form>
        <md-button class="md-icon-button md-raised md-accent" @click="addEdge()">
          <md-icon>add</md-icon>
        </md-button>
      </md-tab>
    </md-tabs>
  </div>
</template>

<script>
import vis from 'vis';
import { store, getEdgeKey } from '../store';

export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      nodeid: '',
      edgefrom: '',
      edgeto: '',
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
      return Object.values(store.state.nodes);
    },
    edges() {
      return Object.values(store.state.edges);
    },
    outdated() {
      return !store.state.upToDate;
    },
  },
  methods: {
    addNode() {
      const id = this.$data.nodeid;
      if (store.state.nodes[id]) {
        alert('Node already exists');
        return;
      }
      this.$refs.snackbarAddnode.open();
      store.commit('addnode', id);
      this.$data.nodeid = '';
    },
    addEdge() {
      const payload = {
        from: this.$data.edgefrom.toString(),
        to: this.$data.edgeto.toString(),
      };
      // TODO(alephNaN): use getters
      if (store.state.edges[getEdgeKey(payload)]) {
        alert('Edge already exists');
        return;
      }
      this.$refs.snackbarAddedge.open();
      store.commit('addedge', payload);
      this.$data.edgefrom = '';
      this.$data.edgeto = '';
    },
    deleteNode(node) {
      store.commit('deletenode', node.id);
    },
    deleteEdge(edge) {
      store.commit('deleteedge', edge);
    },
    loadGraph() {
      const data = {
        nodes: new vis.DataSet(Object.values(store.state.nodes)),
        edges: new vis.DataSet(Object.values(store.state.edges)),
      };
      const options = {
        layout: {
          randomSeed: 2,
        },
      };
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
