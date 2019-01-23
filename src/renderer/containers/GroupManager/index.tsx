import React, { FC, Fragment } from 'react';
import { connect, ResolveThunks } from 'react-redux';

import { RootState } from '@types';
import { GroupList } from '@components/GroupList';
import { Actions } from '@components/Actions';
import * as groupsActions from '@groups/actions';
import * as groupsSelectors from '@groups/selectors';

interface StateProps {
  championGroups: GroupByChampion;
  userGroups: ReturnType<typeof groupsSelectors.userGroups>;
  hasChanges: boolean;
}

type DispatchProps = ResolveThunks<typeof groupsActions>;

type GroupManagerProps = StateProps & DispatchProps;

const GroupManager: FC<GroupManagerProps> = ({
  championGroups,
  userGroups,
  hasChanges: hasChanged,
  createGroup,
  loadGroups,
  saveGroups,
  changeName,
  removeGroup,
}) => (
  <Fragment>
    <GroupList
      championGroups={championGroups}
      userGroups={userGroups}
      createGroup={createGroup}
      renameGroup={changeName}
      removeGroup={removeGroup}
    />
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
  </Fragment>
);

export default connect(
  (state: RootState) => ({
    championGroups: state.groups.championGroups,
    userGroups: groupsSelectors.userGroups(state),
    hasChanges: state.groups.hasChanges,
  }),
  groupsActions
)(GroupManager);
