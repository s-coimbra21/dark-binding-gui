import React, { FC } from 'react';
import cx from 'classnames';

import style from './index.scss';

interface ChampionTileProps extends Champion {
  className?: string;
  onClick: (championId: number) => any;
}

export const ChampionTile: FC<ChampionTileProps> = ({
  className,
  id,
  name,
  onClick,
}) => (
  <li className={cx(style.championTile, className)}>
    <div className={style.frame} onClick={() => onClick(id)}>
      <div
        className={style.portrait}
        style={{
          backgroundImage: `url(lcu:///lol-game-data/assets/v1/champion-icons/${id}.png)`,
        }}
      />
    </div>
    <div className={style.text}>
      <span className={style.name}>{name}</span>
    </div>
  </li>
);
