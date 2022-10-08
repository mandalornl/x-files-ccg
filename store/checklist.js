export const state = () => ({
  selected: [],
  snapshot: []
});

export const mutations = {
  setSelected(state, value) {
    state.selected = value;
  },

  setSnapshot(state, value) {
    state.snapshot = value;
  }
};
