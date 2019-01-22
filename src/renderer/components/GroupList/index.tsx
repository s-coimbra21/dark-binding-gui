import React, { FC } from 'react';

import { GroupListItem } from '../GroupListItem';
import { Link } from 'react-router-dom';

const styles = require('./index.scss');

interface GroupListProps {
  groups: [string, BindingGroup][];
  createGroup: (name: string) => void;
}

export const GroupList: FC<GroupListProps> = ({ groups = [], createGroup }) => (
  <div className={styles.groupList}>
    <div className={styles.header}>
      <h3>Name</h3>
      <h3>Champions</h3>
    </div>
    {groups.map(([name, group]) => (
      <Link key={name} to={`/editor/${name}`}>
        <GroupListItem name={name} onChange={console.log} />
      </Link>
    ))}
    <GroupListItem onChange={createGroup} />
  </div>
);
