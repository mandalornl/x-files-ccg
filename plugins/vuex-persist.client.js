import VuexPersistence from 'vuex-persist';

export default ({ store }) => {
  new VuexPersistence({
    key: 'x-files-ccg',
    storage: localStorage,
    modules: [
      'agentSelector',
      'deckBuilding'
    ]
  }).plugin(store);

  new VuexPersistence({
    key: 'x-files-ccg',
    storage: sessionStorage,
    modules: [
      'checklist'
    ]
  }).plugin(store);
};
