import React, { FC, MouseEvent, memo } from 'react';
import cx from 'classnames';

import {
  getPrimaryMainKeyDisplay,
  getPrimaryModifierDisplay,
} from '@utils/parse-binding';

import binding from '../binding';

const style = require('./index.scss');

interface InnerProps {
  value: Binding;
  quickCast?: boolean;
  onClick: () => any;
  onToggleQuickcast?: () => any;
}

const handleToggleQuickcast = (handler?: () => any) => (event: MouseEvent) => {
  event.preventDefault();

  handler && handler();
};

const PrimaryHotKey: FC<InnerProps> = memo(
  ({ value, quickCast = false, onClick, onToggleQuickcast }) => (
    <div
      className={cx(style.primaryHotkey, {
        [style.quickcast]: quickCast,
      })}
    >
      <div className={style.background}>
        <div className={style.modifier}>
          {getPrimaryModifierDisplay([value])}
        </div>
        <div className={style.button} onClick={onClick}>
          {getPrimaryMainKeyDisplay([value])}
        </div>
        <div className={style.spacer} />
        <div
          className={cx(style.quickcastButton)}
          onClick={handleToggleQuickcast(onToggleQuickcast)}
        >
          <svg
            className={style.spark}
            x="0px"
            y="0px"
            viewBox="0 0 11.3 16"
            enableBackground="new 0 0 11.3 16"
          >
            <polygon points="11.3,7 6.8,7 8.3,0 0,8.8 4.2,8.8 2.8,16 " />
          </svg>
        </div>
      </div>
    </div>
  )
);

export default binding(PrimaryHotKey);
