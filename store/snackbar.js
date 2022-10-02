/**
 * Set
 *
 * @param {{
 *  visible: boolean,
 *  message: string,
 *  type: string
 * }} state
 * @param {string} message
 * @param {string} type
 */
const set = (state, message, type) => {
  state.visible = false;
  state.message = message;
  state.type = type;
  state.visible = true;
};

export const state = () => ({
  visible: false,
  message: '',
  type: 'info'
});

export const mutations = {
  setVisible(state, value) {
    state.visible = value;
  },
  setSuccess: (state, message) => set(state, message, 'success'),
  setInfo: (state, message) => set(state, message, 'info'),
  setWarning: (state, message) => set(state, message, 'warning'),
  setError: (state, message) => set(state, message, 'error')
};
