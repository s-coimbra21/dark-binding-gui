import React, { FC, memo } from 'react';
import { remote } from 'electron';
import cx from 'classnames';

const styles = require('./index.scss');

const close = () => remote.getCurrentWindow().close();
const minimize = () => remote.getCurrentWindow().minimize();

export const TitleBar: FC = memo(({ children }) => (
  <div className={styles.app}>
    <div className={styles.titleBar}>
      <div className={styles.title}>
        <div className={styles.icon} />
        <h2>Dark Binding</h2>
      </div>
      <div>
        <button
          className={cx(styles.button, styles.minimize)}
          onClick={minimize}
        />
        <button className={cx(styles.button, styles.close)} onClick={close} />
      </div>
    </div>
    <div className={styles.content}>{children}</div>
  </div>
));
