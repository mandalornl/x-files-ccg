export const state = () => ({
  presets: {}
});

export const getters = {
  hasName: (state) => (name) => !!state.presets[name]
};

export const mutations = {
  addPreset(state, {
    name,
    ids
  }) {
    state.presets = {
      ...state.presets,
      [name]: ids
    };
  },

  removePreset(state, name) {
    const presets = { ...state.presets };

    delete presets[name];

    state.presets = presets;
  }
};
