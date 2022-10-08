import VuexPersistence from 'vuex-persist';

export default ({ store }) => {
  new VuexPersistence({
    key: 'x-files-ccg',
    storage: localStorage,
    reducer: ({
      agentSelector,
      deckBuilding
    }) => ({
      agentSelector,
      deckBuilding
    })
  }).plugin(store);

  new VuexPersistence({
    key: 'x-files-ccg',
    storage: sessionStorage,
    reducer: ({
      checklist
    }) => ({
      checklist
    })
  }).plugin(store);
};
