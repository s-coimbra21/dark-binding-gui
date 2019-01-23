import React, { MouseEvent, PureComponent, Fragment } from 'react';
import { createPortal } from 'react-dom';
import { Dropdown, Option } from 'react-hextech';

const el = document.body.appendChild(document.createElement('div'));

export type ContextMenu = {
  label: string;
  onClick: Function;
}[];

interface ContextMenuContext {
  openContextMenu: (menu: ContextMenu) => any;
}

export const ContextMenu = React.createContext<ContextMenuContext>({
  openContextMenu: () => undefined,
});

export const ContextMenuConsumer = ContextMenu.Consumer;

interface State {
  menu?: { x: number; y: number; options: ContextMenu };
}

export class ContextMenuProvider extends PureComponent<{}, State> {
  state: State = {};

  closeContextMenu = () => {
    this.setState({ menu: undefined });
  };

  openContextMenu = (options: ContextMenu) => (
    event: MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault();

    const x = event.clientX;
    const y = event.clientY;

    this.setState({ menu: { x, y, options } });
  };

  handleMenuOptionClick = (option: Option<any>) => {
    if (!this.state.menu) return;

    const menuOption = this.state.menu!.options.find(
      o => o.label === option.label
    );

    if (menuOption) {
      menuOption.onClick();

      this.closeContextMenu();
    }
  };

  renderContextMenu = () => {
    if (!this.state.menu) return null;

    const { x, y } = this.state.menu;

    return (
      <div
        style={{ position: 'fixed', top: y, left: x }}
        onClick={event => event.preventDefault()}
      >
        <Dropdown
          placeholder={false}
          transparent
          isOpen
          hideIcon
          options={this.state.menu.options as any}
          onChange={this.handleMenuOptionClick}
          onToggle={this.closeContextMenu}
        >
          Options
        </Dropdown>
      </div>
    );
  };

  render() {
    return (
      <Fragment>
        {createPortal(this.renderContextMenu(), el)}
        <ContextMenu.Provider value={{ openContextMenu: this.openContextMenu }}>
          {this.props.children}
        </ContextMenu.Provider>
      </Fragment>
    );
  }
}
