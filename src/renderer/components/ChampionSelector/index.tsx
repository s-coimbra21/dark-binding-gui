import React, { PureComponent } from 'react';
import { equals, filter, get, flow, sortBy } from 'lodash/fp';
import cx from 'classnames';

import { ChampionTile } from '@components/ChampionTile';

const styles = require('./index.scss');

interface ChampionSelectorProps {
  champions: Champions;
  groupName: string;
  championGroups: GroupByChampion;
  onClickChampion: (championId: number) => any;
}

interface State {
  showUnowned: boolean;
}

const onlyOwned = filter(
  flow(
    get('ownership.owned'),
    equals(true)
  )
);

const sortChampions = sortBy<Champion>(['name']);

export class ChampionSelector extends PureComponent<
  ChampionSelectorProps,
  State
> {
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
    const { groupName } = this.props;
    const champions = sortChampions(
      this.state.showUnowned
        ? this.props.champions
        : onlyOwned(this.props.champions)
    );

    const unassigned = champions.filter(this.filters.unassigned);
    const members =
      groupName === 'default'
        ? unassigned
        : champions.filter(this.filters.members);
    const otherGroups = champions.filter(this.filters.otherGroups);

    return (
      <section className={styles.championSelector}>
        {/* <div className={styles.options}>
          <Checkbox
            className={styles.checkbox}
            value={this.state.showUnowned}
            onChange={this.handleShowUnownedChange}
          >
            Show Unowned
          </Checkbox>
        </div> */}
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
