export const state = () => ({
  presets: {}
});

export const getters = {
  hasName: (state) => (name) => !!state.presets[name]
};

export const mutations = {
  addPreset(state, {
    key,
    value
  }) {
    state.presets = {
      ...state.presets,
      [key]: value
    };
  },

  removePreset(state, name) {
    const presets = { ...state.presets };

    delete presets[name];

    state.presets = presets;
  }
};
