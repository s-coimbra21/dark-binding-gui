import React, { FC } from 'react';

import { RouteComponentProps } from 'react-router';

import BindingGroupEditor from '../../containers/BindingGroupEditor';

const Editor: FC<RouteComponentProps<{ group: string }>> = ({
  match: {
    params: { group },
  },
}) => <BindingGroupEditor groupName={group} />;

export default Editor;
