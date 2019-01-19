import { RouterState } from 'connected-react-router';

export interface RootState {
  lcu: LCUState;
  groups: GroupsState;

  router: RouterState;
}
