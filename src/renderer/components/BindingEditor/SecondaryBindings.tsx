import React, { FC, memo } from 'react';
import { formatSaved } from '@utils/parse-binding';

import { Expand } from '../Expand';
import binding from '../../containers/binding';

import bindings from './bindings';

const styles = require('./index.scss');

const Binding = binding(({ value, onClick }) => (
  <a className={styles.bindingButton} onClick={onClick}>
    {formatSaved(value)}
  </a>
));

const BindingRow: FC<Section> = memo(({ label, controls, twoSets }) => (
  <div className={styles.subCategory}>
    <div className={styles.binding}>
      <span className={styles.label}>{label}</span>
      <span>Set 1</span>
      {twoSets && <span>Set 2</span>}
    </div>
    {controls.map(c => (
      <div key={c.dataKey} className={styles.binding}>
        <span className={styles.label}>{c.label}</span>
        <Binding {...c} />
        {twoSets && <Binding {...c} secondary />}
      </div>
    ))}
  </div>
));

export const SecondaryBindings: FC = memo(() => (
  <section className={styles.secondaryBindingsWrapper}>
    <h3>Secondary Bindings</h3>
    <div className={styles.secondaryBindings}>
      {bindings.map(({ label, subgroups }) => (
        <Expand key={label} title={label}>
          {subgroups.map(subgroup => (
            <BindingRow key={subgroup.label} {...subgroup} />
          ))}
        </Expand>
      ))}
    </div>
  </section>
));
