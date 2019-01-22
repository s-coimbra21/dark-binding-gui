import React, { FC, memo } from 'react';

import PrimaryHotkey from '../../containers/PrimaryHotkey';

const style = require('./index.scss');

const sections: Section[] = [
  {
    label: 'Abilities',
    controls: [1, 2, 3, 4].map(i => ({
      label: `Cast Ability ${i}`,
      section: 'GameEvents',
      dataKey: `evtCastSpell${i}`,
    })),
  },
  {
    label: 'Summoner Spells',
    controls: [1, 2].map(i => ({
      label: `Cast Summoner Spell ${i}`,
      section: 'GameEvents',
      dataKey: `evtCastAvatarSpell${i}`,
    })),
  },
  {
    label: 'Items',
    controls: [1, 2, 3, 4, 5, 6].map(i => ({
      label: `Use Item ${i}`,
      section: 'GameEvents',
      dataKey: `evtUseItem${i}`,
    })),
  },
  {
    label: 'Trinket',
    controls: [
      {
        label: 'Use Trinket',
        section: 'GameEvents',
        dataKey: 'evtUseVisionItem',
      },
    ],
  },
];

const PrimaryBindingRow: FC<Section> = memo(({ label, controls }) => (
  <div className={style.category}>
    <div className={style.label}>{label}</div>
    <div>
      {controls.map(c => {
        return <PrimaryHotkey key={c.label} {...c} />;
      })}
    </div>
  </div>
));

export const PrimaryBindings: FC = memo(() => (
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
));
