import React, { FC } from 'react';

import { GroupListItem } from '../GroupListItem';
import { Link } from 'react-router-dom';

const styles = require('./index.scss');

interface GroupListProps {
  groups: BindingGroup[];
  addGroup: (name: string) => void;
}

export const GroupList: FC<GroupListProps> = ({ groups = [], addGroup }) => (
  <div className={styles.groupList}>
    <div className={styles.header}>
      <h3>Name</h3>
      <h3>Champions</h3>
    </div>
    {groups.map(group => (
      <Link to={`/editor/${group.name}`}>
        <GroupListItem key={group.name} group={group} onChange={console.log} />
      </Link>
    ))}
    <GroupListItem onChange={addGroup} />
  </div>
);
