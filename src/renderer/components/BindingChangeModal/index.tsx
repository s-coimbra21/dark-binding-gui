import React, { PureComponent, Fragment } from 'react';
import { Modal } from '@components/Modal';
import { keyboardEventToSaved, formatSaved } from '@utils/parse-binding';
import { Button } from 'react-hextech';

const styles = require('./index.scss');

interface Props {
  value: string;
  onChange: (path: string) => void;
  onCancel: () => void;
}

interface State {
  value: string;
}

export class BindingChangeModal extends PureComponent<Props, State> {
  static defaultProps = {
    value: '',
  };

  state = {
    value: this.props.value,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  }

  handleKeydown = (event: KeyboardEvent) => {
    event.preventDefault();

    const value = keyboardEventToSaved(event);

    if (!value) return;

    this.setState({ value });
  };

  unbind = () => {
    this.setState({
      value: '[<Unbound>]',
    });
  };

  handleSave = () => {
    this.props.onChange(this.state.value);
  };

  handleCancel = () => {
    this.props.onCancel();
  };

  render() {
    const formatted = formatSaved(this.state.value);

    const buttons = (
      <Fragment>
        <Button onClick={this.handleSave}>Save</Button>
        <Button onClick={this.handleCancel}>Cancel</Button>
      </Fragment>
    );

    return (
      <Modal buttons={buttons}>
        <div className={styles.modal}>
          <h2 className={styles.title}>Press a key to bind</h2>
          <p>Item 1 (Primary)</p>
          {formatted && <h1 className={styles.binding}>{formatted}</h1>}
          {!formatted && <h1 style={{ opacity: 0.5 }}>EMPTY</h1>}
          <button
            className={styles.unbind}
            onClick={this.unbind}
            disabled={!formatted}
          >
            Unbind
          </button>
        </div>
      </Modal>
    );
  }
}
