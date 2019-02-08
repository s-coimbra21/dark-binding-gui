import fuzzysearch from 'fuzzysearch';
import {
  compose,
  withPropsOnChange,
  setDisplayName,
  withStateHandlers,
} from 'recompose';
import { ComponentType } from 'react';

interface OuterProps {
  champions: Champions;
}

interface InjectedProps {
  search: string;
  updateSearch: (nextValue: string) => any;
}

export default <P>(Comp: ComponentType<P>) =>
  compose<any, Omit<P, keyof InjectedProps>>(
    setDisplayName('withChampionSearch'),
    withStateHandlers(
      { search: '' },
      {
        updateSearch: () => (value: string) => ({
          search: value.toLowerCase(),
        }),
      }
    ),
    withPropsOnChange<any, OuterProps & InjectedProps>(
      ['champions', 'search'],
      ({ champions, search }) => ({
        champions: search
          ? champions.filter(c => fuzzysearch(search, c.name.toLowerCase()))
          : champions,
      })
    )
  )(Comp);
