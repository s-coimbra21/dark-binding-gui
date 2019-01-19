import React, { PureComponent, PropTypes } from 'react';
import { forceCheck } from 'react-lazyload';
import FlipMove from 'react-flip-move';

import style from './index.scss';

import ChampionTile from '../ChampionTile';

export default class ChampionSelector extends PureComponent {
  static propTypes = {
    disableAnimations: PropTypes.bool,
    champions: PropTypes.array.isRequired,
    onClick: PropTypes.func
  }

  static defaultProps = {
    disableAnimations: false,
    onClick: undefined
  }

  componentDidUpdate (prevProps) {
    if (this.areAnimationsDisabled() && prevProps.champions !== this.props.champions) {
      forceCheck();
    }
  }

  areAnimationsDisabled = () => this.props.champions.length > 200 || this.props.disableAnimations

  render () {
    const { champions, onClick } = this.props;
    return (
      <section className={style.championSelector}>
        <FlipMove
          typeName="ul"
          onFinishAll={forceCheck}
          disableAllAnimations={this.areAnimationsDisabled()}
        >
          {champions && champions.map(champion => <ChampionTile key={champion.id} {...champion} onClick={onClick} />)}
        </FlipMove>
      </section>
    );
  }
}
