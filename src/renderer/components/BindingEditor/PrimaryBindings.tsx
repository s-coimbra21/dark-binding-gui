import React, { FC } from 'react';

import { PrimaryHotkey } from '../PrimaryHotkey';

const style = require('./index.scss');

interface Binding {
  label: string;
  section: string;
  dataKey: string;
  smartCastDataKey?: string;
}

interface Section {
  label: string;
  twoSets?: boolean;
  controls: Binding[];
}

const sections: Section[] = [
  {
    label: 'Abilities',
    controls: [1, 2, 3, 4].map(i => ({
      label: `Cast Ability ${i}`,
      section: 'GameEvents',
      dataKey: `evtNormalCastSpell${i}`,
      smartCastDataKey: `evtSmartCastSpell${i}`,
    })),
  },
  {
    label: 'Summoner Spells',
    controls: [1, 2].map(i => ({
      label: `Cast Summoner Spell ${1}`,
      section: 'GameEvents',
      dataKey: `evtCastAvatarSpell${i}`,
    })),
  },
  { label: 'Items', keybinds: [1, 2, 3, 4, 5, 6].map(n => `evtUseItem${n}`) },
  { label: 'Trinket', keybinds: ['evtUseVisionItem'] },
];

const PrimaryBindingRow: FC<Section> = ({ label, controls }) => (
  <div className={style.category}>
    <div className={style.label}>{label}</div>
    <div>
      {keybinds.map(k => {
        return <PrimaryHotkey key={k} />;
      })}
    </div>
  </div>
);

export const PrimaryBindings: FC = ({ name }) => (
  <section className={style.primaryBindingsWrapper}>
    <h3>Primary Bindings</h3>
    <div className={style.primaryBindings}>
      <div className={style.row}>
        <PrimaryBindingRow {...sections[0]} />
        <PrimaryBindingRow {...sections[1]} />
      </div>
      <div className={style.row}>
        <PrimaryBindingRow {...sections[2]} />
        <PrimaryBindingRow {...sections[3]} />
      </div>
    </div>
  </section>
);
