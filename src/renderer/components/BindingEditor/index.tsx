import React, { FC, memo } from 'react';

import { PrimaryBindings } from './PrimaryBindings';
import { SecondaryBindings } from './SecondaryBindings';

const style = require('./index.scss');

interface BindingEditorProps {}

export const BindingEditor: FC<BindingEditorProps> = memo(() => (
  <section className={style.editor}>
    <PrimaryBindings />
    <SecondaryBindings />
  </section>
));
