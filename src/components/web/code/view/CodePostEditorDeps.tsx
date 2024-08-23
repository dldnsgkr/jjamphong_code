import '@style/components/web/code/view/codePostEditorDeps.scss';
import { useRef, useState } from 'react';

const CodePostEditorDeps = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isBold, setIsBold] = useState(false);

  const toggleBold = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      console.log(range);

      if (isBold) {
        // 이미 bold 상태라면, strong 태그 밖으로 커서를 이동
        const strongNode = findClosestStrong(
          range.commonAncestorContainer
        );
        if (strongNode) {
          range.setStartAfter(strongNode);
          range.collapse(true);
          selection.removeAllRanges();
          selection.addRange(range);
        }
        setIsBold(false);
      } else {
        // Bold 상태가 아니면, strong 태그 추가
        const newStrongNode =
          document.createElement('strong');
        range.surroundContents(newStrongNode);

        // 커서를 strong 태그 내부로 이동
        moveCursorToStrong(newStrongNode);

        selection.removeAllRanges();
        selection.addRange(range);
        setIsBold(true);
      }
    }
  };

  // strong 태그를 찾기 위한 헬퍼 함수
  const findClosestStrong = (
    node: Node
  ): HTMLElement | null => {
    let current: Node | null = node;
    while (current) {
      if (current.nodeType === Node.ELEMENT_NODE) {
        const element = current as HTMLElement;
        if (element.tagName === 'STRONG') {
          return element;
        }
      }
      current = current.parentNode;
    }
    return null;
  };

  const moveCursorToStrong = (
    strongElement: HTMLElement
  ) => {
    const range = document.createRange();
    range.selectNodeContents(strongElement);
    range.collapse(false); // 커서를 strong 태그의 끝으로 이동
    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  const handleInput = (
    e: React.FormEvent<HTMLDivElement>
  ) => {
    const selection = window.getSelection();
    if (isBold && selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const parentElement =
        range.commonAncestorContainer as HTMLElement;

      if (parentElement.tagName === 'STRONG') {
        // strong 태그 내부에서 입력 시
        range.deleteContents(); // 기존 내용 삭제
        const text = e.currentTarget.textContent || '';
        const textNode = document.createTextNode(text);
        range.insertNode(textNode);
        range.setStartAfter(textNode);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  };

  return (
    <div className="deps-wrapper">
      <div className="deps-controller">
        <button id="btn-bold" onClick={toggleBold}>
          <b>B</b>
        </button>
      </div>
      <div
        ref={editorRef}
        contentEditable={true}
        className="deps-contents"
        role="presentation"
        onInput={handleInput}
      ></div>
    </div>
  );
};

export default CodePostEditorDeps;
