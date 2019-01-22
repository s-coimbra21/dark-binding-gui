import React, { memo, FC, HTMLAttributes } from 'react';
import { Button } from 'react-hextech';

const styles = require('./index.scss');

interface ActionsProps {
  actions: ({ text: string; disabled?: boolean } & HTMLAttributes<
    HTMLButtonElement
  >)[];
}

export const Actions: FC<ActionsProps> = memo(({ actions, children }) => (
  <div className={styles.actions}>
    <div>{children}</div>
    <div className={styles.buttons}>
      {actions.map(({ text, ...props }) => (
        <Button key={text} {...props}>
          {text}
        </Button>
      ))}
    </div>
  </div>
));
