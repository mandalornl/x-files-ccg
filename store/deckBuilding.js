export const state = () => ({
  deck: {},
  decks: {}
});

export const getters = {
  hasName: (state) => (name) => !!state.decks[name],

  deckSize: (state) => Object.values(state.deck).reduce((total, quantity) => total + quantity, 0),

  quantityInDeck: (state) => (cardId) => state.deck[cardId] ?? 0
};

export const mutations = {
  setDeck(state, value) {
    state.deck = value;
  },

  saveDeck(state, name) {
    state.decks = {
      ...state.decks,
      [name]: { ...state.deck }
    };
  },

  loadDeck(state, name) {
    if (!state.decks[name]) {
      return;
    }

    state.deck = { ...state.decks[name] };
  },

  clearDeck(state) {
    state.deck = {};
  },

  renameDeck(state, {
    oldName,
    newName
  }) {
    const {
      [oldName]: deck,
      ...decks
    } = state.decks;

    state.decks = {
      ...decks,
      [newName]: deck
    };
  },

  removeDeck(state, name) {
    if (!state.decks[name]) {
      return;
    }

    const decks = { ...state.decks };

    delete decks[name];

    state.decks = decks;
  },

  uploadDeck(state, deck) {
    if (!deck.name) {
      return;
    }

    state.decks = {
      ...state.decks,
      [deck.name]: { ...deck.cards }
    };
  },

  addCardToDeck(state, cardId) {
    const {
      [cardId]:quantity = 0,
      ...cards
    } = state.deck;

    if (quantity === 2) {
      return;
    }

    state.deck = {
      ...cards,
      [cardId]: Math.min(2, quantity + 1)
    };
  },

  removeCardFromDeck(state, cardId) {
    const {
      [cardId]:quantity = 0,
      ...cards
    } = state.deck;

    if (quantity === 0){
      return;
    }

    state.deck = Object.fromEntries(
      Object.entries({
        ...cards,
        [cardId]: Math.max(0, quantity - 1)
      }).filter(([ , quantity ]) => quantity > 0)
    );
  }
};
