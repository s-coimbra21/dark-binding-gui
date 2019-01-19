import React, { FC } from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash/fp';
import { RootState } from '@types';
import { Button } from 'react-hextech';

import { GroupList } from '@components/GroupList';

import * as groupsActions from '@groups/actions';

type StateProps = GroupsState;
type DispatchProps = typeof groupsActions;

type GroupManagerProps = StateProps & DispatchProps;

const GroupManager: FC<GroupManagerProps> = ({
  groups,
  hasChanges: hasChanged,
  addGroup,
  loadGroups,
  saveGroups,
}) => (
  <div>
    <GroupList groups={groups} addGroup={addGroup} />
    <div>
      <Button onClick={loadGroups} disabled={!hasChanged}>
        Reset
      </Button>
      <Button onClick={saveGroups} disabled={!hasChanged}>
        Save
      </Button>
    </div>
  </div>
);

export default connect(
  get<RootState, 'groups'>('groups'),
  groupsActions
)(GroupManager);
