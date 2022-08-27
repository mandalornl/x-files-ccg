import VuexPersistence from 'vuex-persist';

export default ({ store }) => {
  new VuexPersistence({
    key: 'x-files-ccg',
    storage: localStorage,
    reducer: (state) => ({
      agentSelector: state.agentSelector
    })
  }).plugin(store);
};
