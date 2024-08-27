import '@style/components/web/code/view/codePostEditorDeps.scss';
import { useRef } from 'react';

const CodePostEditorDeps = () => {
  const editorRef = useRef<HTMLDivElement>(null);

  const toggleBold = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0); // 선택된 범위 가져오기
      const selectedText = selection.toString();

      if (selectedText) {
        const containerNode = range.commonAncestorContainer;
        const parentElement =
          containerNode.nodeType === 3
            ? containerNode.parentElement
            : containerNode;

        // parentElement가 요소 노드인지 확인
        if (
          parentElement instanceof HTMLElement &&
          parentElement.tagName === 'B'
        ) {
          // 현재 커서 위치가 <b> 태그 안에 있다면, <b> 태그 제거
          const parent = parentElement.parentNode;
          if (parent !== null) {
            while (parentElement.firstChild) {
              parent.insertBefore(
                parentElement.firstChild,
                parentElement
              );
            }
            parent.removeChild(parentElement);
          }
          return;
        }

        // 새로운 태그 요소 생성
        const wrapper = document.createElement('b');

        // 선택된 텍스트를 새로 만든 태그로 감싸기
        try {
          range.surroundContents(wrapper);
        } catch (e) {
          console.log(e);
          // surroundContents는 범위가 분리된 노드를 포함하는 경우 작동하지 않으므로,
          // 대체 방법으로 텍스트 노드를 감싸는 방법을 사용할 수 있습니다.
          wrapper.appendChild(range.extractContents());
          range.insertNode(wrapper);
        }

        // 선택을 해제하여 새로 감싼 텍스트가 다시 선택되지 않도록 함
        selection.removeAllRanges();
      } else {
        // 선택된 텍스트가 없는 경우, 현재 커서 위치에 새로운 <b> 태그 생성
        const wrapper = document.createElement('b');
        wrapper.appendChild(
          document.createTextNode('\u200B')
        ); // \u200B는 Zero-Width Space

        range.insertNode(wrapper);

        // 커서를 <b> 태그 내부로 이동시킴
        const newRange = document.createRange();
        newRange.setStart(
          wrapper.firstChild !== null
            ? wrapper.firstChild
            : wrapper,
          1
        );
        newRange.collapse(true);

        selection.removeAllRanges();
        selection.addRange(newRange);

        // 추가로 입력할 수 있도록 contentEditable이 활성화된 상태 유지
        editorRef.current?.focus();
      }
    }
  };

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
