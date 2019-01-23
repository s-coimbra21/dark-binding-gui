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
  championGroups: GroupByChampion;
}

type DispatchProps = ResolveThunks<typeof groupsActions>;

type BindingEditorProps = StateProps & DispatchProps;

class BindingGroupEditor extends PureComponent<BindingEditorProps> {
  goBack = () => this.props.discardChanges('/');

  assignChampion = (championId: number) =>
    this.props.assignChampion({ group: this.props.name, championId });

  render() {
    const {
      name,
      hasChanges,
      group,
      changeBinding,
      changeQuickcast,
      saveGroups,
      champions,
      championGroups,
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
            groupName={name}
            championGroups={championGroups}
            champions={champions}
            onClickChampion={this.assignChampion}
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
    championGroups: state.groups.championGroups,
    group: state.groups.groups[groupName],
    champions: state.lcu.champions,
  }),
  groupsActions
)(BindingGroupEditor);
