import React, { PureComponent, Fragment, ComponentType } from 'react';
import { get } from 'lodash';

import { parseBinding } from '@utils/parse-binding';
import { BindingChangeModal } from '@components/BindingChangeModal';

import { changeBinding, changeQuickcast } from '@groups/actions';

interface BindingProps {
  label: string;
  section: string;
  dataKey: string;
  secondary?: boolean;
}

interface BindingInnerProps {
  value: string;
  quickCast?: boolean;
  onClick: () => any;
  onToggleQuickcast?: () => any;
}

interface BindingContextProps {
  name: string;
  group: BindingGroup;
  changeBinding: typeof changeBinding;
  changeQuickcast: typeof changeQuickcast;
}

export const BindingContext = React.createContext<BindingContextProps>(
  {} as any
);

export default function binding(Comp: ComponentType<BindingInnerProps>) {
  class BindingContainer extends PureComponent<
    BindingProps,
    {},
    BindingContextProps
  > {
    static contextType = BindingContext;
    static defaultProps = {
      secondary: false,
    };

    state = {
      editing: false,
    };

    openModal = () => this.setState({ editing: true });
    closeModal = () => this.setState({ editing: false });

    handleChangeBinding = (value: string) => {
      const { group, changeBinding } = this.context as BindingContextProps;
      const { secondary, section, dataKey } = this.props;

      const [
        currentPrimary = '[<Unbound>]',
        currentSecondary = '[<Unbound>]',
      ] = parseBinding(get(group, [section, dataKey]));

      const nextValue = [currentPrimary, currentSecondary];

      !secondary ? (nextValue[0] = value) : (nextValue[1] = value);

      changeBinding(name, [section, dataKey].join('.'), nextValue);

      this.closeModal();
    };

    handleToggleQuickcast = () => {
      const { name, changeQuickcast } = this.context as BindingContextProps;
      const { dataKey } = this.props;

      changeQuickcast(name, dataKey);
    };

    render() {
      const { group } = this.context as BindingContextProps;
      const { section, dataKey, label, secondary } = this.props;

      const saved = parseBinding(get(group, [section, dataKey]));
      const quickCast = get(group, ['Quickbinds', dataKey + 'smart']);

      return (
        <Fragment>
          {this.state.editing && (
            <BindingChangeModal
              label={label}
              value={!secondary ? saved[0] : saved[1]}
              secondary={!!secondary}
              onCancel={this.closeModal}
              onChange={this.handleChangeBinding}
            />
          )}
          <Comp
            value={!secondary ? saved[0] : saved[1]}
            quickCast={quickCast}
            onClick={this.openModal}
            onToggleQuickcast={this.handleToggleQuickcast}
          />
        </Fragment>
      );
    }
  }

  return BindingContainer;
}
