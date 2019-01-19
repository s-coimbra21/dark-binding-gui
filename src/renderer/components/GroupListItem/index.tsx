import React, {
  PureComponent,
  HTMLAttributes,
  ChangeEvent,
  FormEvent,
} from 'react';
import cx from 'classnames';

const styles = require('./index.scss');

interface GroupItemProps {
  className?: string;
  group?: BindingGroup;
  inputProps?: HTMLAttributes<HTMLInputElement>;
  onChange: (name: string) => void;
}

interface GroupItemState {
  name: string;
  editing: boolean;
}

export class GroupListItem extends PureComponent<
  GroupItemProps,
  GroupItemState
> {
  state: GroupItemState = {
    editing: false,
    name: this.props.group ? this.props.group.name : '+ New Group',
  };

  inputRef = React.createRef<HTMLInputElement>();

  input = {
    onClick: () => {
      const { editing } = this.state;
      const { group } = this.props;

      if (group || editing) return;

      this.setState(
        {
          name: '',
          editing: true,
        },
        () => {
          this.inputRef.current!.focus();
        }
      );
    },
    onChange: (evt: ChangeEvent<HTMLInputElement>) => {
      this.setState({ name: evt.target.value });
    },
    onBlur: () => {
      this.setState({
        editing: false,
        name: this.props.group ? this.props.group.name : '+ New Group',
      });
    },
  };

  handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!this.state.editing) return;

    this.props.onChange(this.state.name);
    this.inputRef.current!.blur();
  };

  render() {
    const { className, inputProps } = this.props;
    const { name, editing } = this.state;

    return (
      <div
        className={cx(styles.groupListItem, className, {
          [`${styles.editing}`]: editing,
        })}
      >
        <form onSubmit={this.handleSubmit} onClick={this.input.onClick}>
          <input
            disabled={!editing}
            ref={this.inputRef}
            type="text"
            value={name}
            {...this.input}
            {...inputProps}
          />
        </form>
      </div>
    );
  }
}
