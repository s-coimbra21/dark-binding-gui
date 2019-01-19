import React, { PureComponent, FC } from 'react';
import { remote } from 'electron';
import cx from 'classnames';

const style = require('./index.scss');

const close = () => remote.getCurrentWindow().close();
const minimize = () => remote.getCurrentWindow().minimize();

export const TitleBar: FC = () => (
  <div className={style.titleBar}>
    <button className={cx(style.button, style.minimize)} onClick={minimize} />
    <button className={cx(style.button, style.close)} onClick={close} />
  </div>
);
