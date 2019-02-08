import React, { FC } from 'react';
import cx from 'classnames';

const styles = require('./index.scss');

interface ChampionCircleProps extends Champion {
  className?: string;
}

export const ChampionCircle: FC<ChampionCircleProps> = ({
  className,
  id,
  squarePortraitPath,
}) => (
  <div className={cx(styles.frame, className)}>
    <div
      className={styles.portrait}
      style={{
        backgroundImage: `url(lcu://${squarePortraitPath})`,
      }}
    />
  </div>
);
