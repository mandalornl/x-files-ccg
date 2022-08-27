export const state = () => ({
  title: null
});

export const mutations = {
  setTitle(state, value) {
    state.title = value;
  }
};
