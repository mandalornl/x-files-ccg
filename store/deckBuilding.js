export const defaultDeckName = 'New deck';

export const state = () => ({
  decks: {}
});

export const getters = {
  defaultDeck: (state) => state.decks[defaultDeckName] ?? {},

  deckByName: (state) => (name) => state.decks[name] ?? {},

  quantityByCardId: (state, getters) => (id) => getters.defaultDeck[id] ?? 0,

  sizeByName: (state) => (name = defaultDeckName) => {
    const values = Object.values(state.decks[name] ?? {});

    return values.reduce((total, quantity) => total + quantity, 0);
  },

  hasName: (state) => (name) => !!state.decks[name]
};

export const mutations = {
  load(state, name) {
    state.decks = {
      ...state.decks,
      [defaultDeckName]: { ...state.decks[name] ?? {} }
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
  },

  upload(state, {
    name,
    cards = {}
  }) {
    if (!name) {
      return;
    }

    state.decks = {
      ...state.decks,
      [name]: { ...cards }
    };
  },

  addCard(state, {
    id,
    name = defaultDeckName
  }) {
    const deck = { ...state.decks[name] ?? {} };
    const quantity = deck[id] ?? 0;

    if (quantity === 2) {
      return;
    }

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
    name = defaultDeckName
  }) {
    const deck = { ...state.decks[name] ?? {} };
    const quantity = deck[id] ?? 0;

    if (quantity === 0) {
      return;
    }

    state.decks = {
      ...state.decks,
      [name]: Object.fromEntries(
        Object.entries({
          ...deck,
          [id]: Math.max(0, quantity - 1)
        }).filter(([ , quantity ]) => quantity > 0)
      )
    };
  }
};

export const actions = {
  clear({ commit }) {
    commit('load', Date.now());
  }
};
