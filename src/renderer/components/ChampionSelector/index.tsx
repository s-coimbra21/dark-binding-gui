import React, { PureComponent } from 'react';
import { Checkbox, TextInput } from 'react-hextech';
import { equals, get, flow } from 'lodash/fp';
import cx from 'classnames';

import { ChampionTile } from '@components/ChampionTile';
import withChampionSearch from '../../containers/withChampionSearch';

const styles = require('./index.scss');

interface ChampionSelectorProps {
  champions: Champions;
  groupName: string;
  championGroups: GroupByChampion;
  onClickChampion: (championId: number) => any;

  search: string;
  updateSearch: (nextSearch: string) => any;
}

interface State {
  showUnowned: boolean;
}

const isOwned = flow(
  get('ownership.owned'),
  equals(true)
);

class ChampionSelector extends PureComponent<ChampionSelectorProps, State> {
  state = {
    showUnowned: false,
  };

  filters = {
    members: (champion: Champion) =>
      this.props.championGroups[champion.id] === this.props.groupName,
    unassigned: (champion: Champion) =>
      !this.props.championGroups[champion.id] ||
      this.props.championGroups[champion.id] === 'default',
    otherGroups: (champion: Champion) =>
      this.props.championGroups[champion.id] &&
      this.props.championGroups[champion.id] !== 'default' &&
      this.props.championGroups[champion.id] !== this.props.groupName,
  };

  groupChampions = (champions: Champions) =>
    champions.reduce(
      (acc, champion) => {
        if (!this.state.showUnowned && !isOwned(champion)) return acc;

        if (this.filters.members(champion)) {
          acc.members.push(champion);
        }

        if (this.filters.unassigned(champion)) {
          acc.unassigned.push(champion);
        }

        if (this.filters.otherGroups(champion)) {
          acc.otherGroups.push(champion);
        }

        return acc;
      },
      { members: [], unassigned: [], otherGroups: [] } as Record<
        string,
        Champions
      >
    );

  handleShowUnownedChange = () => {
    this.setState({
      showUnowned: !this.state.showUnowned,
    });
  };

  renderChampion = (champion: Champion) => (
    <ChampionTile
      key={champion.id}
      {...champion}
      onClick={this.props.onClickChampion}
    />
  );

  render() {
    const { groupName, champions, search, updateSearch } = this.props;

    const { members, unassigned, otherGroups } = this.groupChampions(champions);

    return (
      <section className={styles.championSelector}>
        <div className={styles.options}>
          <Checkbox
            className={styles.checkbox}
            value={this.state.showUnowned}
            onChange={this.handleShowUnownedChange}
          >
            Show Unowned
          </Checkbox>
          <TextInput
            type="search"
            placeholder="Search..."
            value={search}
            onChange={updateSearch}
          />
        </div>
        <div className={styles.scroller}>
          {!!members.length && (
            <div className={styles.separator}>
              <h3>In this group</h3>
            </div>
          )}
          {groupName !== 'default' && (
            <ul className={styles.grid}>{members.map(this.renderChampion)}</ul>
          )}
          {groupName !== 'default' && !!unassigned.length && (
            <div className={styles.separator}>
              <h3>Unassigned</h3>
            </div>
          )}
          <ul className={styles.grid}>{unassigned.map(this.renderChampion)}</ul>
          {!!otherGroups.length && (
            <div className={styles.separator}>
              <h3>In other groups</h3>
            </div>
          )}
          <ul className={cx(styles.grid, styles.dimmed)}>
            {otherGroups.map(this.renderChampion)}
          </ul>
        </div>
      </section>
    );
  }
}

const enhanced = withChampionSearch(ChampionSelector);

export { enhanced as ChampionSelector };
