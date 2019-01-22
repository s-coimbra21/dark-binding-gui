import React, { FC } from 'react';
import { connect, ResolveThunks } from 'react-redux';
import { get } from 'lodash/fp';

import { RootState } from '@types';
import { GroupList } from '@components/GroupList';
import { Actions } from '@components/Actions';
import * as groupsActions from '@groups/actions';

type StateProps = GroupsState;
type DispatchProps = ResolveThunks<typeof groupsActions>;

type GroupManagerProps = StateProps & DispatchProps;

const GroupManager: FC<GroupManagerProps> = ({
  groups,
  hasChanges: hasChanged,
  createGroup,
  loadGroups,
  saveGroups,
}) => (
  <div>
    <GroupList groups={Object.entries(groups)} createGroup={createGroup} />
    <Actions
      actions={[
        {
          text: 'Reset',
          disabled: !hasChanged,
          onClick: loadGroups,
        },
        {
          text: 'Save',
          disabled: !hasChanged,
          onClick: saveGroups,
        },
      ]}
    />
  </div>
);

export default connect(
  get<RootState, 'groups'>('groups'),
  groupsActions
)(GroupManager);
