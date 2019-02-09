import React, {
  PureComponent,
  Fragment,
  KeyboardEvent,
  MouseEvent,
} from 'react';
import { Modal } from '@components/Modal';
import { eventToSaved, formatSaved } from '@utils/parse-binding';
import { Button, Checkbox } from 'react-hextech';

const styles = require('./index.scss');

interface Props {
  label: string;
  value: string;
  secondary: boolean;
  onChange: (path: string, allowDuplicates: boolean) => void;
  onCancel: () => void;
}

interface State {
  allowDuplicates: boolean;
  value: string;
}

export class BindingChangeModal extends PureComponent<Props, State> {
  static defaultProps = {
    value: '',
  };

  state = {
    allowDuplicates: false,
    value: this.props.value,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown as any);
    window.addEventListener('mousedown', this.handleKeydown as any);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown as any);
    window.removeEventListener('mousedown', this.handleKeydown as any);
  }

  handleKeydown = (event: KeyboardEvent & MouseEvent) => {
    if (event.button === 1) return;

    event.preventDefault();

    const value = eventToSaved(event);

    if (!value) return;

    this.setState({ value });
  };

  unbind = () => {
    this.setState({
      value: '[<Unbound>]',
    });
  };

  handleSave = () => {
    this.props.onChange(this.state.value, this.state.allowDuplicates);
  };

  handleAllowDuplicatesToggle = () => {
    this.setState({
      allowDuplicates: !this.state.allowDuplicates,
    });
  };

  handleCancel = () => {
    this.props.onCancel();
  };

  render() {
    const { label, secondary } = this.props;
    const { allowDuplicates } = this.state;
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
          <p>
            {label} ({secondary ? 'Secondary' : 'Primary'})
          </p>
          {formatted && <h1 className={styles.binding}>{formatted}</h1>}
          {!formatted && <h1 style={{ opacity: 0.5 }}>EMPTY</h1>}
          <button
            className={styles.unbind}
            onClick={this.unbind}
            disabled={!formatted}
          >
            Unbind
          </button>
          <Checkbox
            onChange={this.handleAllowDuplicatesToggle}
            value={allowDuplicates}
          >
            Allow Duplicate Binding
          </Checkbox>
        </div>
      </Modal>
    );
  }
}
