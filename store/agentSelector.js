export const state = () => ({
  presents: {}
});

export const getters = {
  hasName: (state) => (name) => !!state.presents[name]
};

export const mutations = {
  addPreset(state, {
    key,
    value
  }) {
    state.presents = {
      ...state.presents,
      [key]: value
    };
  },

  removePreset(state, key) {
    const presets = { ...state.presents };

    delete presets[key];

    state.presents = presets;
  }
};
