import '@style/components/web/code/view/codePostEditorDeps.scss';
import { useRef } from 'react';

const CodePostEditorDeps = () => {
  const editorRef = useRef<HTMLDivElement>(null);

  const toggleBold = () => {};

  const handleClick = () =>
    // event: React.MouseEvent<HTMLDivElement>
    {
      const selection = window.getSelection();
      if (selection) {
        console.log(
          'Clicked position:',
          selection.anchorOffset
        );
        console.log(selection.getRangeAt(0));
      }
    };
  const handleDrag = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const selectedText = selection.toString();
      console.log('Selected text:', selectedText);
    }
  };

  return (
    <div className="deps-wrapper">
      <div className="deps-controller">
        <button className="editor_btn" onClick={toggleBold}>
          <b>B</b>
        </button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        className="deps-contents"
        role="presentation"
        onClick={handleClick}
        onMouseUp={handleDrag}
      ></div>
    </div>
  );
};

export default CodePostEditorDeps;
