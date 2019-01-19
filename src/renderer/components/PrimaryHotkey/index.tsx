import React, { Component } from 'react';
import cx from 'classnames';

const style = require('./index.scss');

export class PrimaryHotkey extends Component {
  // static propTypes = {
  //   bind: PropTypes.object.isRequired,
  //   quickcastBind: PropTypes.object.isRequired
  // }

  render() {
    const { bind, quickcastBind } = this.props;

    return (
      <div
        className={cx(style.primaryHotkey, {
          [style.quickcast]: quickcastBind
            ? !!quickcastBind.value
            : Math.random() > 0.5,
        })}
      >
        <div className={style.background}>
          <div className={style.button}>{bind ? bind.value : 'Q'}</div>
          <div className={style.spacer} />
          <div className={cx(style.quickcastButton)}>
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
    );
  }
}
