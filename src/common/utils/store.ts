import Store from 'electron-store';

interface StoreShape {
  champions: Record<string | number, string>;
  groups: Record<string, BindingGroup>;
}

export default new Store<StoreShape>({
  defaults: {
    champions: {},
    groups: {},
  },
});
