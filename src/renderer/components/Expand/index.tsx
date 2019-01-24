import React, { PureComponent } from 'react';
import cx from 'classnames';

const styles = require('./index.scss');

interface ExpandProps {
  title?: string;
}

export class Expand extends PureComponent<ExpandProps> {
  state = {
    open: false,
  };

  handleToggle = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  render() {
    return (
      <div className={styles.expand}>
        <div className={styles.title} onClick={this.handleToggle}>
          <h4>{this.props.title}</h4>
        </div>
        <div
          className={cx(styles.content, {
            [`${styles.open}`]: this.state.open,
          })}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}
