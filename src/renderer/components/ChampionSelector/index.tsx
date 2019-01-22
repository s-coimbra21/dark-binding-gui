import React, { FC, memo } from 'react';

import { ChampionTile } from '@components/ChampionTile';

const styles = require('./index.scss');

interface ChampionSelectorProps {
  champions: Champions;
  onClickChampion: React.MouseEventHandler<HTMLDivElement>;
}

export const ChampionSelector: FC<ChampionSelectorProps> = memo(
  ({ champions, onClickChampion }) => (
    <section className={styles.championSelector}>
      {champions &&
        champions.map(champion => (
          <ChampionTile
            key={champion.name}
            {...champion}
            onClick={onClickChampion}
          />
        ))}
    </section>
  )
);
