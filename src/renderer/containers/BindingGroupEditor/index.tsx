import React, { PureComponent } from 'react';
import { connect, ResolveThunks } from 'react-redux';
import { RootState } from '@types';

import { BindingEditor } from '@components/BindingEditor';
import { Actions } from '@components/Actions';
import * as groupsActions from '@groups/actions';

import { BindingContext } from '../binding';
import { Redirect } from 'react-router-dom';
import { ChampionSelector } from '@components/ChampionSelector';

const styles = require('./index.scss');

interface OuterProps {
  groupName: string;
}

interface StateProps {
  name: string;
  hasChanges: boolean;
  group: BindingGroup;
  champions: Champions;
}

type DispatchProps = ResolveThunks<typeof groupsActions>;

type BindingEditorProps = StateProps & DispatchProps;

class BindingGroupEditor extends PureComponent<BindingEditorProps> {
  goBack = () => this.props.discardChanges('/');

  render() {
    const {
      name,
      hasChanges,
      group,
      changeBinding,
      changeQuickcast,
      saveGroups,
      champions,
    } = this.props;

    if (!group) return <Redirect to="/" />;

    return (
      <div className={styles.bindingGroupEditor}>
        <BindingContext.Provider
          value={{
            name,
            group,
            changeBinding,
            changeQuickcast,
          }}
        >
          <BindingEditor />
          <ChampionSelector
            champions={champions}
            onClickChampion={console.log}
          />
          <Actions
            actions={[
              {
                text: hasChanges ? 'Cancel' : 'Back',
                onClick: this.goBack,
              },
              {
                text: 'Save Changes',
                disabled: !hasChanges,
                onClick: saveGroups,
              },
            ]}
          >
            <h1>Editing Group: {name}</h1>
          </Actions>
        </BindingContext.Provider>
      </div>
    );
  }
}

export default connect(
  (state: RootState, { groupName }: OuterProps) => ({
    name: groupName,
    hasChanges: state.groups.hasChanges,
    group: state.groups.groups[groupName],
    champions: state.lcu.champions,
  }),
  groupsActions
)(BindingGroupEditor);
