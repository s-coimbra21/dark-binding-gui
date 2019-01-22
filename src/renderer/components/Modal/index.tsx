import React, { FC, ReactNode } from 'react';
import ReactModal from 'react-modal';
import cx from 'classnames';

import { ButtonGroup } from '@components/ButtonGroup';

import style from './index.scss';

interface ModalProps {
  className?: any;
  buttons: ReactNode;
}

export const Modal: FC<ModalProps> = ({ className, buttons, children }) => (
  <ReactModal
    isOpen
    ariaHideApp={false}
    className={cx(style.modal, className)}
    overlayClassName={style.overlay}
    contentLabel="modal"
  >
    <div className={cx(style.dialog, className)}>
      <div className={style.contentWrapper}>
        <div className={style.content}>{children}</div>
        <ButtonGroup className={style.buttonGroup}>{buttons}</ButtonGroup>
      </div>
      <div className={style.border} />
    </div>
  </ReactModal>
);
