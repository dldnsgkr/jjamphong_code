import '@style/components/web/code/view/codePostEditorDeps.scss';
import { useEffect, useRef, useState } from 'react';

const CodePostEditorDeps = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [editorButton, setEditorButton] = useState({
    bold: {
      state: false,
    },
  });

  // const toggleBold = () => {
  //   const selection = window.getSelection();
  //   if (selection && selection.rangeCount > 0) {
  //     const range = selection.getRangeAt(0); // 선택된 범위 가져오기
  //     const selectedText = selection.toString();
  //     console.log(selectedText);

  //     if (selectedText) {
  //       const containerNode = range.commonAncestorContainer;
  //       const parentElement =
  //         containerNode.nodeType === 3
  //           ? containerNode.parentElement
  //           : containerNode;
  //       // parentElement가 요소 노드인지 확인
  //       if (
  //         parentElement instanceof HTMLElement &&
  //         parentElement.tagName === 'B'
  //       ) {
  //         console.log('부모가 p태그 임');
  //         // 현재 커서 위치가 <b> 태그 안에 있다면, <b> 태그 제거
  //         const parent = parentElement.parentNode;
  //         if (parent !== null) {
  //           while (parentElement.firstChild) {
  //             parent.insertBefore(
  //               parentElement.firstChild,
  //               parentElement
  //             );
  //           }
  //           parent.removeChild(parentElement);
  //           setEditorButton({ bold: { state: false } });
  //         }
  //         return;
  //       }

  //       // 새로운 태그 요소 생성
  //       const wrapper = document.createElement('b');

  //       // 선택된 텍스트를 새로 만든 태그로 감싸기
  //       try {
  //         range.surroundContents(wrapper);
  //       } catch (e) {
  //         console.log(e);
  //         // surroundContents는 범위가 분리된 노드를 포함하는 경우 작동하지 않으므로,
  //         // 대체 방법으로 텍스트 노드를 감싸는 방법을 사용할 수 있습니다.
  //         wrapper.appendChild(range.extractContents());
  //         range.insertNode(wrapper);
  //       }

  //       // 선택을 해제하여 새로 감싼 텍스트가 다시 선택되지 않도록 함
  //       selection.removeAllRanges();
  //     } else {
  //       // 선택된 텍스트가 없는 경우, 현재 커서 위치에 새로운 <b> 태그 생성
  //       const wrapper = document.createElement('b');
  //       wrapper.appendChild(
  //         document.createTextNode('\u200B')
  //       ); // \u200B는 Zero-Width Space

  //       range.insertNode(wrapper);

  //       // 커서를 <b> 태그 내부로 이동시킴
  //       const newRange = document.createRange();
  //       newRange.setStart(
  //         wrapper.firstChild !== null
  //           ? wrapper.firstChild
  //           : wrapper,
  //         1
  //       );
  //       newRange.collapse(true);

  //       selection.removeAllRanges();
  //       selection.addRange(newRange);

  //       // 추가로 입력할 수 있도록 contentEditable이 활성화된 상태 유지
  //       editorRef.current?.focus();
  //     }
  //   }
  // };

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

  useEffect(() => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const selectedText = selection.toString();
      if (selectedText) {
        const containerNode = range.commonAncestorContainer;
        const parentElement =
          containerNode.nodeType === 3
            ? containerNode.parentElement
            : containerNode;
        switch (true) {
          case parentElement instanceof HTMLElement &&
            parentElement.tagName === 'B':
            // 특정 조건이 true일 때 실행할 코드
            setEditorButton({ bold: { state: true } });
            console.log(
              'The parent element is an instance of HTMLElement and the tag name is B.'
            );
            break;

          // 다른 조건들을 추가하고 싶다면 추가적으로 case를 작성할 수 있습니다.
          case parentElement instanceof HTMLElement &&
            parentElement.tagName === 'DIV':
            console.log(
              'The parent element is an instance of HTMLElement and the tag name is DIV.'
            );
            break;

          default:
            // 어떤 조건도 해당되지 않을 때 실행할 코드
            console.log('No matching condition was found.');
            break;
        }
      }
    }
  });
  const handleBoldClick = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);

      if (range.collapsed) {
        // 선택된 텍스트가 없을 때, 커서 위치에 b 태그 삽입
        const b = document.createElement('strong');
        const textNode = document.createTextNode('\u200B'); // 빈 텍스트 노드 삽입 (Zero-width space)
        b.appendChild(textNode);
        range.insertNode(b);

        // 커서를 b 태그 안으로 이동시킴
        const newRange = document.createRange();
        newRange.setStart(textNode, 1);
        newRange.collapse(true);
        sel.removeAllRanges();
        sel.addRange(newRange);
      } else {
        // 선택된 텍스트가 있을 때, 선택된 텍스트를 b 태그로 감싸기
        const b = document.createElement('strong');
        range.surroundContents(b);

        // 커서를 b 태그 끝으로 이동시킴
        const newRange = document.createRange();
        newRange.setStart(b, b.childNodes.length);
        newRange.collapse(true);
        sel.removeAllRanges();
        sel.addRange(newRange);
      }
    }
  };

  useEffect(() => {
    // 초기 렌더링 시 p 태그 생성
    if (editorRef.current) {
      const p = document.createElement('p');
      p.innerHTML = '<br>'; // p 태그 안에 빈 줄을 추가하여 커서를 위치시킴
      editorRef.current.appendChild(p);

      // 커서를 p 태그 안으로 이동시킴
      const range = document.createRange();
      const sel = window.getSelection();
      range.setStart(p, 0);
      range.collapse(true);
      if (sel) {
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  }, []);

  const handleDoubleClick = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    e.preventDefault();

    // strong 태그 또는 다른 요소가 더블 클릭되었을 때 부모 p 태그를 찾기
    const p = (e.target as HTMLElement).closest('p');

    if (p) {
      const range = document.createRange();
      range.selectNodeContents(p);
      const sel = window.getSelection();
      if (sel) {
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  };

  return (
    <div className="deps-wrapper">
      <div className="deps-controller">
        <button
          className={`editor_btn ${editorButton.bold.state === true ? 'active' : ''}`}
          onClick={handleBoldClick}
        >
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
        onDoubleClick={handleDoubleClick}
      ></div>
    </div>
  );
};

export default CodePostEditorDeps;
