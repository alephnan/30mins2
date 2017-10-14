import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

function getEdgeKey(edge) {
  const { from, to } = edge;
  return `${from}_${to}`;
}

export default new Vuex.Store({
  state: {
    count: 0,
    nodes: {
      1: { id: 1, label: '1' },
      2: { id: 2, label: '2' },
      3: { id: 3, label: '3' },
      4: { id: 4, label: '4' },
    },
    edges: {
      '1_3': { from: 1, to: 3 },
      '1_2': { from: 1, to: 2 },
      '2_4': { from: 2, to: 4 },
    },
    upToDate: false,
  },
  mutations: {
    addnode(state, nodeid) {
      const id = nodeid.toString();
      Vue.set(state.nodes, id, { id, label: id });
      state.upToDate = false;
    },
    addedge(state, payload) {
      const key = getEdgeKey(payload);
      const { from, to } = payload;
      Vue.set(state.edges, key, { from, to });
      state.upToDate = false;
    },
    increment(state) {
      state.count++;
    },
    deletenode(state, nodeid) {
      const key = nodeid.toString();
      Vue.delete(state.nodes, key);
      state.upToDate = false;
    },
    deleteedge(state, payload) {
      const key = getEdgeKey(payload);
      Vue.delete(state.edges, key);
      state.upToDate = false;
    },
    updatedGraph(state) {
      state.upToDate = true;
    },
  },
});
