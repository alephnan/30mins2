import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
    nodes: [
      { id: 1, label: '1' },
      { id: 2, label: '2' },
      { id: 3, label: '3' },
      { id: 4, label: '3' },
    ],
    edges: [
      { from: 1, to: 3 },
      { from: 1, to: 2 },
      { from: 2, to: 4 },
    ],
    upToDate: false,
  },
  mutations: {
    addnode(state, nodeid) {
      const label = nodeid.toString();
      state.nodes.push({ id: nodeid, label });
      state.upToDate = false;
    },
    addedge(state, payload) {
      const { from, to } = payload;
      console.log(`from: ${from}`);
      console.log(`to: ${to}`);
      state.edges.push({ from, to });
      state.upToDate = false;
    },
    increment(state) {
      state.count++;
    },
    deletenode(state, nodeid) {
      state.nodes = state.nodes.filter(({ id }) => id !== nodeid);
      state.upToDate = false;
    },
    deleteedge(state, edge) {
      state.edges = state.edges.filter(({ from, to }) => from !== edge.from || to !== edge.to);
      state.upToDate = false;
    },
    updatedGraph(state) {
      state.upToDate = true;
    },
  },
});
