import '@style/components/web/code/modalBackground/modalBackground.scss';
import { ModalPropsType } from '@type/web/modalTypes';
import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useState,
} from 'react';

type ModalBackgroundPropsType = {
  showModalBackground: boolean;
  setShowModalBackground: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  children: React.ReactNode;
};

const ModalBackground = ({
  showModalBackground,
  setShowModalBackground,
  children,
}: ModalBackgroundPropsType) => {
  const [showModal, setShowModal] =
    useState<boolean>(false);

  const closeModal = () => {
    setShowModal(false);
  };

  const childrenWithProps = Children.map(
    children,
    (child) => {
      if (isValidElement<ModalPropsType>(child)) {
        return cloneElement(child, {
          closeModal: closeModal,
          setShowModalBackground: setShowModalBackground,
        });
      }
      return child;
    }
  );

  useEffect(() => {
    if (showModalBackground === true) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [showModalBackground]);
  return (
    <div
      className={`modal-background-wrapper ${showModalBackground ? 'show' : ''}`}
    >
      <div
        className={`modal-wrapper ${showModal ? 'show' : 'close'}`}
      >
        {childrenWithProps}
      </div>
    </div>
  );
};

export default ModalBackground;
