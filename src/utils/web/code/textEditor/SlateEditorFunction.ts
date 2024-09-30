import {
  BaseSelection,
  Editor,
  Element,
  Node,
  Path,
  Range,
  Transforms,
} from 'slate';
import { ReactEditor } from 'slate-react';
import { isCustomElement } from './SlateEditorSetup';
import { CustomElement } from '@type/web/slateTypes';

export const StyleEditor = {
  // text
  isBoldMarkActive(editor: ReactEditor) {
    const marks = Editor.marks(editor);
    return marks ? marks.bold === true : false;
  },
  // text
  isUnderlineMarkActive(editor: ReactEditor) {
    const marks = Editor.marks(editor);
    return marks ? marks.underline === true : false;
  },
  // text
  isItalicMarkActive(editor: ReactEditor) {
    const marks = Editor.marks(editor);
    return marks ? marks.italic === true : false;
  },
  //static-option
  toggleBoldMark(editor: ReactEditor) {
    const isActive = StyleEditor.isBoldMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, 'bold');
    } else {
      Editor.addMark(editor, 'bold', true);
    }
  },

  //static-option
  toggleUnderlineMark(editor: ReactEditor) {
    const isActive =
      StyleEditor.isUnderlineMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, 'underline');
    } else {
      Editor.addMark(editor, 'underline', true);
    }
  },

  // 이탤릭체 토글 함수
  toggleItalicMark(editor: ReactEditor) {
    const isActive = StyleEditor.isItalicMarkActive(editor);
    if (isActive) {
      // 활성화되어 있으면 이탤릭체 해제
      Editor.removeMark(editor, 'italic');
    } else {
      // 이탤릭체 적용
      Editor.addMark(editor, 'italic', true);
    }
  },
};

export const ElementEditor = {
  // block
  isCodeBlockActive(editor: ReactEditor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => isCustomElement(n) && n.type === 'code', // 타입 가드 적용
    });
    return !!match;
  },

  // block
  isH1BlockActive(editor: ReactEditor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => isCustomElement(n) && n.type === 'h1', // 타입 가드 적용
    });
    return !!match;
  },

  // block
  isH2BlockActive(editor: ReactEditor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => isCustomElement(n) && n.type === 'h2', // 타입 가드 적용
    });
    return !!match;
  },

  // block
  isH3BlockActive(editor: ReactEditor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => isCustomElement(n) && n.type === 'h3', // 타입 가드 적용
    });
    return !!match;
  },

  //static-option
  toggleCodeBlock(editor: ReactEditor) {
    const isActive =
      ElementEditor.isCodeBlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? 'paragraph' : 'code' },
      {
        match: (n) =>
          Element.isElement(n) && Editor.isBlock(editor, n),
      }
    );
  },

  //static-option
  toggleH1Block(editor: ReactEditor) {
    const isActive = ElementEditor.isH1BlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? 'paragraph' : 'h1' },
      {
        match: (n) =>
          Element.isElement(n) && Editor.isBlock(editor, n),
      }
    );
  },

  //static-option
  toggleH2Block(editor: ReactEditor) {
    const isActive = ElementEditor.isH2BlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? 'paragraph' : 'h2' },
      {
        match: (n) =>
          Element.isElement(n) && Editor.isBlock(editor, n),
      }
    );
  },

  //static-option
  toggleH3Block(editor: ReactEditor) {
    const isActive = ElementEditor.isH3BlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? 'paragraph' : 'h3' },
      {
        match: (n) =>
          Element.isElement(n) && Editor.isBlock(editor, n),
      }
    );
  },
};

export const ListEditor = {
  // block
  isOlBlockActive(editor: ReactEditor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => isCustomElement(n) && n.type === 'ol', // 타입 가드 적용
    });
    return !!match;
  },

  // block
  isUlBlockActive(editor: ReactEditor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => isCustomElement(n) && n.type === 'ul', // 타입 가드 적용
    });
    return !!match;
  },

  //static-option
  toggleUlBlock(editor: ReactEditor) {
    const isActive = ListEditor.isUlBlockActive(editor);

    if (isActive) {
      console.log('ul에서 다른거로 바뀜');
      // 이미 ul인 경우, ul을 paragraph로 변경하고 모든 li를 unwrap
      Transforms.setNodes(
        editor,
        { type: 'paragraph' },
        {
          match: (n) =>
            isCustomElement(n) &&
            n.type === 'li' &&
            Editor.isBlock(editor, n),
          mode: 'lowest', // 선택된 블록만 변경
        }
      );

      // 선택된 li 요소를 ul에서 unwrap (해제)
      Transforms.unwrapNodes(editor, {
        match: (n) => isCustomElement(n) && n.type === 'ul',
        split: true, // 선택된 부분만 unwrap
      });
    } else {
      console.log('ul로 생성됨');
      // 새로운 ul을 생성하고 li로 감싸기
      Transforms.wrapNodes(editor, {
        type: 'ul',
        children: [],
      });

      // li 요소가 없는 경우 li 요소를 추가
      Transforms.insertNodes(editor, {
        type: 'li',
        children: [{ text: '' }],
      });

      // 방금 생성한 ul 내부에서만 paragraph 노드를 삭제
      const [ulNodeEntry] = Editor.nodes(editor, {
        match: (n) =>
          Element.isElement(n) && n.type === 'ul',
        mode: 'highest', // 가장 상위 ul 노드만 선택
      });

      if (ulNodeEntry) {
        const [, ulPath] = ulNodeEntry;

        // ul 내부의 paragraph 노드를 삭제
        Transforms.removeNodes(editor, {
          at: ulPath, // 방금 생성한 ul 노드의 경로
          match: (n) =>
            Element.isElement(n) && n.type === 'paragraph',
        });
      }
    }
  },

  escapeUlBlock(
    editor: ReactEditor,
    event: React.KeyboardEvent<HTMLDivElement>,
    selection: BaseSelection
  ) {
    if (selection && Range.isCollapsed(selection)) {
      const liNodes = Array.from(
        Editor.nodes(editor, {
          at: selection.anchor.path,
          match: (n) =>
            Element.isElement(n) && n.type === 'li',
        })
      );

      // 마지막 li 요소가 빈 텍스트인지 확인
      const lastLiEmpty =
        liNodes.length > 0
          ? Node.string(
              liNodes[liNodes.length - 1][0]
            ).trim() === ''
          : true;
      if (lastLiEmpty) {
        // 마지막 li 요소의 경로를 가져옵니다.
        const lastLiPath = liNodes[liNodes.length - 1][1];

        // 마지막 li 요소를 제거합니다.
        Transforms.removeNodes(editor, {
          at: lastLiPath, // li 요소의 위치에서 제거
        });

        // 현재 ul의 경로를 가져옵니다.
        const [currentUl] = Editor.nodes(editor, {
          match: (n) =>
            Element.isElement(n) && n.type === 'ul',
        });

        if (currentUl) {
          const [, ulPath] = currentUl; // ul 요소의 경로를 가져옵니다.

          // 새 paragraph 요소를 생성합니다.
          const newParagraph: CustomElement = {
            type: 'paragraph',
            children: [{ text: '' }],
          };

          // ul 요소 아래에 새 paragraph 요소를 추가합니다.
          Transforms.insertNodes(editor, newParagraph, {
            at: Path.next(ulPath), // ul 다음 위치에 삽입
          });
          console.log('take ul');
          console.log(editor);
          event.preventDefault();
          // 커서를 새 paragraph의 끝으로 이동합니다.
          // 새 paragraph의 끝으로 커서를 이동합니다.
          const newParagraphPath = Path.next(ulPath); // 새 paragraph의 경로
          const endPath = Editor.end(
            editor,
            newParagraphPath
          ); // 새 paragraph의 끝 위치

          Transforms.select(editor, {
            anchor: endPath,
            focus: endPath,
          });
        }
      }
    }
  },

  removeEmptyUl(
    editor: ReactEditor,
    event: React.KeyboardEvent<HTMLDivElement>,
    selection: BaseSelection
  ) {
    // ul 내부의 li 요소 찾기
    if (selection && Range.isCollapsed(selection)) {
      const liNodes = Array.from(
        Editor.nodes(editor, {
          at: selection.anchor.path,
          match: (n) =>
            Element.isElement(n) && n.type === 'li',
        })
      );

      // li 요소들이 전부 빈 텍스트인지 확인
      const allLiEmpty = liNodes.every(([liNode]) => {
        const text = Node.string(liNode);
        return text.trim() === ''; // 텍스트가 빈 경우 true 반환
      });

      // 모든 li가 빈 텍스트라면 ul 요소를 삭제
      if (allLiEmpty) {
        const [ulNode] = Editor.nodes(editor, {
          match: (n) =>
            Element.isElement(n) && n.type === 'ul',
        });
        if (ulNode) {
          const [, ulPath] = ulNode;

          // ul 내부의 모든 li 요소를 찾음
          const liNodes = Array.from(
            Editor.nodes(editor, {
              at: ulPath,
              match: (n) =>
                Element.isElement(n) && n.type === 'li',
            })
          );
          // li 요소들이 전부 빈 텍스트인지 확인
          const allLiEmpty = liNodes.every(([liNode]) => {
            const text = Node.string(liNode);
            return text.trim() === ''; // 텍스트가 빈 경우 true 반환
          });

          if (event.metaKey === true) {
            event.preventDefault();
            return;
          }
          console.log(allLiEmpty);
          console.log(liNodes.length);
          // 만약 모든 li가 빈 텍스트라면 ul 요소를 삭제
          if (allLiEmpty && liNodes.length == 1) {
            event.preventDefault(); // 기본 동작 방지
            Transforms.removeNodes(editor, {
              at: ulPath,
            });
            // 새로운 paragraph 요소 추가
            const newParagraph: CustomElement = {
              type: 'paragraph',
              children: [
                {
                  text: '', // 빈 텍스트
                },
              ],
            };

            // paragraph를 현재 선택된 위치에 삽입
            Transforms.insertNodes(editor, newParagraph, {
              at: ulPath, // ulPath에 새 paragraph 삽입
            });

            // 새 paragraph의 끝으로 커서 이동
            const pointAfterNewParagraph = Editor.end(
              editor,
              ulPath
            ); // 새 paragraph의 끝 위치
            Transforms.select(
              editor,
              pointAfterNewParagraph
            ); // 커서를 끝으로 이동
          }
        }
      }
    }
  },

  //static-option
  toggleOlBlock(editor: ReactEditor) {
    const isActive = ListEditor.isOlBlockActive(editor);

    if (isActive) {
      console.log('ol에서 다른거로 바뀜');
      // 이미 ul인 경우, ul을 paragraph로 변경하고 모든 li를 unwrap
      Transforms.setNodes(
        editor,
        { type: 'paragraph' },
        {
          match: (n) =>
            isCustomElement(n) &&
            n.type === 'li' &&
            Editor.isBlock(editor, n),
          mode: 'lowest', // 선택된 블록만 변경
        }
      );

      // 선택된 li 요소를 ul에서 unwrap (해제)
      Transforms.unwrapNodes(editor, {
        match: (n) => isCustomElement(n) && n.type === 'ol',
        split: true, // 선택된 부분만 unwrap
      });
    } else {
      console.log('ol로 생성됨');
      // 새로운 ul을 생성하고 li로 감싸기
      Transforms.wrapNodes(editor, {
        type: 'ol',
        children: [],
      });

      // li 요소가 없는 경우 li 요소를 추가
      Transforms.insertNodes(editor, {
        type: 'li',
        children: [{ text: '' }],
      });

      // 방금 생성한 ul 내부에서만 paragraph 노드를 삭제
      const [olNodeEntry] = Editor.nodes(editor, {
        match: (n) =>
          Element.isElement(n) && n.type === 'ol',
        mode: 'highest', // 가장 상위 ul 노드만 선택
      });

      if (olNodeEntry) {
        const [, olPath] = olNodeEntry;

        // ul 내부의 paragraph 노드를 삭제
        Transforms.removeNodes(editor, {
          at: olPath, // 방금 생성한 ul 노드의 경로
          match: (n) =>
            Element.isElement(n) && n.type === 'paragraph',
        });
      }
    }
  },

  escapeOlBlock(
    editor: ReactEditor,
    event: React.KeyboardEvent<HTMLDivElement>,
    selection: BaseSelection
  ) {
    if (selection && Range.isCollapsed(selection)) {
      const liNodes = Array.from(
        Editor.nodes(editor, {
          at: selection.anchor.path,
          match: (n) =>
            Element.isElement(n) && n.type === 'li',
        })
      );

      // 마지막 li 요소가 빈 텍스트인지 확인
      const lastLiEmpty =
        liNodes.length > 0
          ? Node.string(
              liNodes[liNodes.length - 1][0]
            ).trim() === ''
          : true;
      if (lastLiEmpty) {
        // 마지막 li 요소의 경로를 가져옵니다.
        const lastLiPath = liNodes[liNodes.length - 1][1];

        // 마지막 li 요소를 제거합니다.
        Transforms.removeNodes(editor, {
          at: lastLiPath, // li 요소의 위치에서 제거
        });

        // 현재 ul의 경로를 가져옵니다.
        const [currentOl] = Editor.nodes(editor, {
          match: (n) =>
            Element.isElement(n) && n.type === 'ol',
        });

        if (currentOl) {
          const [, olPath] = currentOl; // ul 요소의 경로를 가져옵니다.

          // 새 paragraph 요소를 생성합니다.
          const newParagraph: CustomElement = {
            type: 'paragraph',
            children: [{ text: '' }],
          };

          // ul 요소 아래에 새 paragraph 요소를 추가합니다.
          Transforms.insertNodes(editor, newParagraph, {
            at: Path.next(olPath), // ul 다음 위치에 삽입
          });
          event.preventDefault();
          // 커서를 새 paragraph의 끝으로 이동합니다.
          // 새 paragraph의 끝으로 커서를 이동합니다.
          const newParagraphPath = Path.next(olPath); // 새 paragraph의 경로
          const endPath = Editor.end(
            editor,
            newParagraphPath
          ); // 새 paragraph의 끝 위치

          Transforms.select(editor, {
            anchor: endPath,
            focus: endPath,
          });
        }
      }
    }
  },

  removeEmptyOl(
    editor: ReactEditor,
    event: React.KeyboardEvent<HTMLDivElement>,
    selection: BaseSelection
  ) {
    // ul 내부의 li 요소 찾기
    if (selection && Range.isCollapsed(selection)) {
      const liNodes = Array.from(
        Editor.nodes(editor, {
          at: selection.anchor.path,
          match: (n) =>
            Element.isElement(n) && n.type === 'li',
        })
      );

      // li 요소들이 전부 빈 텍스트인지 확인
      const allLiEmpty = liNodes.every(([liNode]) => {
        const text = Node.string(liNode);
        return text.trim() === ''; // 텍스트가 빈 경우 true 반환
      });

      // 모든 li가 빈 텍스트라면 ul 요소를 삭제
      if (allLiEmpty) {
        const [olNode] = Editor.nodes(editor, {
          match: (n) =>
            Element.isElement(n) && n.type === 'ol',
        });
        if (olNode) {
          const [, olPath] = olNode;

          // ul 내부의 모든 li 요소를 찾음
          const liNodes = Array.from(
            Editor.nodes(editor, {
              at: olPath,
              match: (n) =>
                Element.isElement(n) && n.type === 'li',
            })
          );
          // li 요소들이 전부 빈 텍스트인지 확인
          const allLiEmpty = liNodes.every(([liNode]) => {
            const text = Node.string(liNode);
            return text.trim() === ''; // 텍스트가 빈 경우 true 반환
          });

          if (event.metaKey === true) {
            event.preventDefault();
            return;
          }
          // 만약 모든 li가 빈 텍스트라면 ul 요소를 삭제
          if (allLiEmpty && liNodes.length == 1) {
            event.preventDefault(); // 기본 동작 방지
            Transforms.removeNodes(editor, {
              at: olPath,
            });
            // 새로운 paragraph 요소 추가
            const newParagraph: CustomElement = {
              type: 'paragraph',
              children: [
                {
                  text: '', // 빈 텍스트
                },
              ],
            };

            // paragraph를 현재 선택된 위치에 삽입
            Transforms.insertNodes(editor, newParagraph, {
              at: olPath, // ulPath에 새 paragraph 삽입
            });

            // 새 paragraph의 끝으로 커서 이동
            const pointAfterNewParagraph = Editor.end(
              editor,
              olPath
            ); // 새 paragraph의 끝 위치
            Transforms.select(
              editor,
              pointAfterNewParagraph
            ); // 커서를 끝으로 이동
          }
        }
      }
    }
  },
};
