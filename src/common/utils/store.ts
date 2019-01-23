import Store from 'electron-store';

interface StoreShape {
  championGroups: Record<string | number, string>;
  groups: Record<string, BindingGroup>;
}

const store = new Store<StoreShape>({
  defaults: {
    championGroups: {},
    groups: {
      default: {} as BindingGroup,
    },
  },
});

export default store;
