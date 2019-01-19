import React, { FC } from 'react';

import { PrimaryBindings } from './PrimaryBindings';

const style = require('./index.scss');

interface BindingEditorProps extends BindingGroup {
  settings: InputSettings;
}

export const BindingEditor: FC<BindingEditorProps> = ({ name }) => (
  <section className={style.editor}>
    <h1>Editing {name}</h1>
    <PrimaryBindings />
  </section>
);
