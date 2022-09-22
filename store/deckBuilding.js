const defaultName = 'newDeck';

export const state = () => ({
  decks: {}
});

export const getters = {
  quantityById: (state) => (id) => state.decks[defaultName]?.[id] ?? 0,

  totalQuantity: (state) => {
    const values = Object.values(state.decks[defaultName] ?? {});

    return values.reduce((total, quantity) => total + quantity, 0);
  }
};

export const mutations = {
  addCard(state, {
    id,
    name = defaultName
  }) {
    const deck = { ...state.decks[name] ?? {} };
    const quantity = deck[id] ?? 0;

    state.decks = {
      ...state.decks,
      [name]: {
        ...deck,
        [id]: Math.min(2, quantity + 1)
      }
    };
  },

  removeCard(state, {
    id,
    name = defaultName
  }) {
    const deck = { ...state.decks[name] ?? {} };
    const quantity = deck[id] ?? 0;

    state.decks = {
      ...state.decks,
      [name]: Object.fromEntries(
        Object.entries({
          ...deck,
          [id]: Math.max(0, quantity - 1)
        }).filter(([ , quantity ]) => quantity > 0)
      )
    };
  },

  rename(state, {
    from,
    to
  }) {
    const {
      [from]: deck,
      ...decks
    } = state.decks;

    state.decks = {
      ...decks,
      [to]: deck
    };
  },

  remove(state, name) {
    const decks = { ...state.decks };

    delete decks[name];

    state.decks = decks;
  }
};

export const actions = {
  save({ commit }, name) {
    commit('rename', {
      from: defaultName,
      to: name
    });
  }
};
