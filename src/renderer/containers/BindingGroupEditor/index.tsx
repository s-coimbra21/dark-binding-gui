import React, { FC } from 'react';
import { connect } from 'react-redux';
import { RootState } from '@types';

import { BindingEditor } from '@components/BindingEditor';

import * as groupsActions from '@groups/actions';

interface OuterProps {
  group: string;
}

interface StateProps {
  group: BindingGroup;
}

type DispatchProps = typeof groupsActions;

type BindingEditorProps = StateProps & DispatchProps;

const BindingGroupEditor: FC<BindingEditorProps> = ({ group }) => (
  <BindingEditor {...group as Required<BindingGroup>} />
);

export default connect(
  (state: RootState, { group }: OuterProps) => ({
    group: state.groups.groups.find(({ name }) => name === group)!,
  }),
  groupsActions
)(BindingGroupEditor);
