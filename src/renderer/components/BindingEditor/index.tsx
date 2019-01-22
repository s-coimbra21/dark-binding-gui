import React, { FC, memo } from 'react';

import { PrimaryBindings } from './PrimaryBindings';

const style = require('./index.scss');

interface BindingEditorProps {}

export const BindingEditor: FC<BindingEditorProps> = memo(() => (
  <section className={style.editor}>
    <PrimaryBindings />
  </section>
));
