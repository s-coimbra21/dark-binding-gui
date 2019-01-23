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
  squarePortraitPath,
  name,
  onClick,
}) => (
  <li className={cx(style.championTile, className)}>
    <div className={style.frame} onClick={() => onClick(id)}>
      <div
        className={style.portrait}
        style={{
          backgroundImage: `url(http://127.0.0.1:${
            global.proxyPort
          }${squarePortraitPath})`,
        }}
      />
    </div>
    <div className={style.text}>
      <span className={style.name}>{name}</span>
    </div>
  </li>
);
