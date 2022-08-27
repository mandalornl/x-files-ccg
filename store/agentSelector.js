export const state = () => ({
  presents: {}
});

export const mutations = {
  setPresets(state, value) {
    state.presents = value;
  },

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
