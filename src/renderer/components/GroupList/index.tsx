import React, { FC } from 'react';

import { GroupListItem } from '../GroupListItem';
import { Link } from 'react-router-dom';

const styles = require('./index.scss');

interface GroupListProps {
  championGroups: GroupByChampion;
  userGroups?: [string, BindingGroup, Champions][];
  createGroup: (name: string) => any;
  removeGroup: (name: string) => any;
  renameGroup: (nextName: string, oldName?: string) => any;
}

export const GroupList: FC<GroupListProps> = ({
  userGroups = [],
  createGroup,
  renameGroup,
  removeGroup,
}) => (
  <div className={styles.groupList}>
    <div className={styles.header}>
      <h3>Name</h3>
      <h3>Champions</h3>
    </div>
    <div className={styles.list}>
      <Link to="/editor/default">
        <GroupListItem
          name="Default"
          onChange={renameGroup}
          onRemove={removeGroup}
        />
      </Link>
      {userGroups.map(([name, group, champions]) => (
        <Link key={name} to={`/editor/${name}`}>
          <GroupListItem
            name={name}
            champions={champions}
            onChange={renameGroup}
            onRemove={removeGroup}
          />
        </Link>
      ))}
      <GroupListItem onChange={createGroup} onRemove={removeGroup} />
    </div>
  </div>
);
