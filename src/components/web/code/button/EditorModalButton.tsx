import '@style/components/web/code/button/editorModalButton.scss';

type EditorModalButtonPropsType = {
  text: string;
};

const EditorModalButton = ({
  text,
}: EditorModalButtonPropsType) => {
  const renderTextSpans = (text: string) => {
    return text
      .split('')
      .map((char, index) => (
        <span key={index}>{char}</span>
      ));
  };
  return (
    <button
      className="button-nina-wrapper"
      data-text={text}
      onClick={() => {}}
    >
      {renderTextSpans(text)}
    </button>
  );
};

export default EditorModalButton;
