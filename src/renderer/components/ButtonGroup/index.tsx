import React, { FC } from 'react';
import cx from 'classnames';

const style = require('./index.scss');

interface ButtonGroupProps {
  className?: string;
}

export const ButtonGroup: FC<ButtonGroupProps> = ({ className, children }) => (
  <div className={cx(style.buttonGroup, className)}>
    <div className={style.content}>{children}</div>
  </div>
);
