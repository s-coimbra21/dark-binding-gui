import React, {
  PureComponent,
  HTMLAttributes,
  ChangeEvent,
  FormEvent,
} from 'react';
import cx from 'classnames';

import { ChampionCircle } from '@components/ChampionCircle';
import { ContextMenuConsumer } from '../../containers/ContextMenu';

const styles = require('./index.scss');

interface GroupItemProps {
  className?: string;
  name?: string;
  inputProps?: HTMLAttributes<HTMLInputElement>;
  champions?: Champion[];
  onChange: (name: string, oldName?: string) => any;
  onRemove: (name: string) => any;
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
    name: this.props.name || '+ New Group',
  };

  inputRef = React.createRef<HTMLInputElement>();

  input = {
    onClick: () => {
      const { editing } = this.state;
      const { name } = this.props;

      if (name || editing) return;

      this.editName();
    },
    onChange: (evt: ChangeEvent<HTMLInputElement>) => {
      this.setState({
        name: evt.target.value.replace('.', '').substring(0, 12),
      });
    },
    onBlur: () => {
      this.setState({
        editing: false,
        name: this.props.name || '+ New Group',
      });
    },
  };

  editName = () => {
    this.setState(
      {
        name: '',
        editing: true,
      },
      () => {
        this.inputRef.current!.focus();
      }
    );
  };

  handleRemove = () => {
    this.props.onRemove(this.props.name!);
  };

  handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    if (!this.props.onChange) return;

    evt.preventDefault();

    if (!this.state.editing) return;

    this.props.onChange(this.state.name, this.props.name);
    this.inputRef.current!.blur();
  };

  render() {
    const { className, inputProps, champions = [] } = this.props;
    const { name, editing } = this.state;

    const isDefault = this.props.name === 'Default';
    const hasContextMenu = !isDefault && this.props.name;

    return (
      <ContextMenuConsumer>
        {({ openContextMenu }) => (
          <div
            onContextMenu={
              hasContextMenu
                ? openContextMenu([
                    { label: 'Rename', onClick: this.editName },
                    { label: `Delete`, onClick: this.handleRemove },
                  ])
                : undefined
            }
            onClick={this.input.onClick}
            className={cx(styles.groupListItem, className, {
              [`${styles.editing}`]: editing,
            })}
          >
            <form onSubmit={this.handleSubmit}>
              <input
                disabled={!editing}
                ref={this.inputRef}
                type="text"
                value={name}
                {...this.input}
                {...inputProps}
              />
            </form>
            <div className={styles.champions}>
              {champions.map(champion => (
                <ChampionCircle key={champion.id} {...champion} />
              ))}
              {isDefault &&
                'The default group contains every unassigned champion.'}
            </div>
          </div>
        )}
      </ContextMenuConsumer>
    );
  }
}
