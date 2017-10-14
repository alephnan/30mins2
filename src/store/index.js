import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
    nodes: {
      1: { id: 1, label: '1' },
      2: { id: 2, label: '2' },
      3: { id: 3, label: '3' },
      4: { id: 4, label: '3' },
    },
    edges: [
      { from: 1, to: 3 },
      { from: 1, to: 2 },
      { from: 2, to: 4 },
    ],
    upToDate: false,
  },
  mutations: {
    addnode(state, nodeid) {
      const id = nodeid.toString();
      state.nodes[id] = { id, label: id };
      state.upToDate = false;
    },
    addedge(state, payload) {
      const { from, to } = payload;
      state.edges.push({ from, to });
      state.upToDate = false;
    },
    increment(state) {
      state.count++;
    },
    deletenode(state, nodeid) {
      delete state.nodes[nodeid.toString()];
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
