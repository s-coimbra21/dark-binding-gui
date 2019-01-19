import React, { PropTypes, PureComponent } from 'react';
import LazyLoad from 'react-lazyload';

import Image from 'components/Image';

import style from './index.scss';

export default class ChampionTile extends PureComponent {
  static propTypes = {
    id: PropTypes.any.isRequired,
    name: PropTypes.string.isRequired,
    squarePortraitPath: PropTypes.string.isRequired,
    onClick: PropTypes.func
  }

  static defaultProps = {
    onClick: Function.prototype
  }

  handleClick = evt => {
    evt.preventDefault();
    const { onClick, id } = this.props;

    onClick(id);
  }

  render () {
    const { name, squarePortraitPath } = this.props;

    return (
      <li className={style.championTile}>
        <LazyLoad
          once
          overflow
          resize
          offset={550}
          placeholder={<div className={style.placeholder} />}
        >
          <div className={style.frame} onClick={this.handleClick}>
            <Image
              key={squarePortraitPath}
              className={style.background}
              path={squarePortraitPath}
            >
              <img role="presentation" width={70} height={70} style={{ opacity: 0 }} />
            </Image>
          </div>
        </LazyLoad>
        <div className={style.text}>
          <span className={style.name}>{name}</span>
        </div>
      </li>
    );
  }
}
