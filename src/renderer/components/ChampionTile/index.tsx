import React, { FC, MouseEventHandler } from 'react';

import { Image } from '../Image';

import style from './index.scss';

export const ChampionTile: FC<
  Champion & { onClick: MouseEventHandler<HTMLDivElement> }
> = ({ squarePortraitPath, name, onClick }) => (
  <li className={style.championTile}>
    <div className={style.frame} onClick={onClick}>
      <Image className={style.background} src={squarePortraitPath} />
    </div>
    <div className={style.text}>
      <span className={style.name}>{name}</span>
    </div>
  </li>
);
