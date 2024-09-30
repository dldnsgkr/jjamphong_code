import '@style/components/web/code/modal/linkModal.scss';
import iconX from '@icon/icon-x.svg';
import {
  //   check,
  //   LinkData,
  ModalPropsType,
} from '@type/web/modalTypes';
import AbsoluteUnderLine from '../underLine/AbsoluteUnderLine';
import BasicInput from '../input/BasicInput';
import Checkout from '../input/CheckboxInput';
import EditorModalButton from '../button/EditorModalButton';
import { useEffect, useState } from 'react';
// import typia from 'typia';

const LinkModal = ({
  closeModal,
  setShowModalBackground,
}: ModalPropsType) => {
  const [textData, setTextData] = useState('');
  const [urlData, setUrlData] = useState('');
  console.log(textData);
  console.log(urlData);
  const [windowData, setWindowData] = useState(false);
  const [protocolData, setProtocolData] = useState(false);
  console.log(windowData, protocolData);
  useEffect(() => {
    // const validationResult = typia.validateEquals<LinkData>(
    //   {
    //     text: textData,
    //     url: urlData,
    //     window: windowData,
    //     protocol: protocolData,
    //   }
    // );
  }, [textData, urlData]);
  return (
    <>
      <div className="modal-title-wrapper">
        <h1 className="modal-title">Insert Link</h1>
        <button
          className="close-button"
          onClick={() => {
            if (closeModal && setShowModalBackground) {
              closeModal();
              setTimeout(() => {
                setShowModalBackground(false);
              }, 500);
            }
          }}
        >
          <img src={iconX} alt="close button" />
        </button>
      </div>
      <AbsoluteUnderLine />
      <div className="link-information-input-wrapper">
        <div>
          <p style={{ paddingBottom: '0.5rem' }}>
            Text to display
          </p>
          <BasicInput
            placeholder="input text"
            setInputData={setTextData}
          />
        </div>
        <div>
          <p style={{ paddingBottom: '0.5rem' }}>
            To what URL should this link go?
          </p>
          <BasicInput
            placeholder="input url"
            setInputData={setUrlData}
          />
        </div>
        <div className="checkbox-wrapper">
          <Checkout
            checkboxId="new-window"
            text="Open in new window"
            setInputData={setWindowData}
          />
          <Checkout
            checkboxId="protocol"
            text="Use default protocol"
            setInputData={setProtocolData}
          />
        </div>
      </div>
      <AbsoluteUnderLine />
      <div className="button-area">
        <EditorModalButton text="Insert Link" />
      </div>
    </>
  );
};

export default LinkModal;
