import '@style/components/web/code/view/codePostEditorDeps.scss';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
// Import the Slate editor factory.
import {
  createEditor,
  Editor,
  Element,
  Transforms,
  Range,
  Text,
  // Node,
} from 'slate';
// Import the Slate components and React plugin.
import {
  Slate,
  Editable,
  withReact,
  RenderElementProps,
  RenderLeafProps,
  DefaultElement,
} from 'slate-react';
import {
  ElementEditor,
  ListEditor,
  StyleEditor,
} from '@utils/web/code/textEditor/SlateEditorFunction';
import { isCustomElement } from '@utils/web/code/textEditor/SlateEditorSetup';
import {
  CodeElement,
  H1Element,
  H2Element,
  H3Element,
  Leaf,
  LiElement,
  OlElement,
  UlElement,
} from '@utils/web/code/textEditor/SlateEditorElement';
import { CustomElement } from '@type/web/slateTypes';
import { createPortal } from 'react-dom';
import ModalBackground from '../modalBackground/ModalBackground';
import LinkModal from '../modal/LinkModal';

const SlateEditor = () => {
  // if 'content' item in loacalStorage, then parsing content data
  // but if not 'content' item in loacalStorage, set up the value by the user set up at the first
  const initialValue = useMemo(
    () =>
      JSON.parse(
        String(localStorage.getItem('content'))
      ) || [
        {
          type: 'paragraph',
          children: [
            {
              type: '',
              text: '',
            },
          ],
        },
      ],
    []
  );
  // Define a rendering function based on the element passed to `props`. We use
  // `useCallback` here to memoize the function for subsequent renders.
  const renderElement = useCallback(
    (props: RenderElementProps) => {
      if (isCustomElement(props.element)) {
        switch (props.element.type) {
          case 'code':
            return <CodeElement {...props} />;
          case 'h1':
            return <H1Element {...props} />;
          case 'h2':
            return <H2Element {...props} />;
          case 'h3':
            return <H3Element {...props} />;
          case 'ul':
            return <UlElement {...props} />;
          case 'ol':
            return <OlElement {...props} />;
          case 'li':
            return <LiElement {...props} />;
          default:
            return <DefaultElement {...props} />;
        }
      }
      // 기본 요소 처리
      return <DefaultElement {...props} />;
    },
    []
  );

  // Define a leaf rendering function that is memoized with `useCallback`.
  const renderLeaf = useCallback(
    (props: RenderLeafProps) => {
      return <Leaf {...props} />;
    },
    []
  );

  // Create a Slate editor object that won't change across renders.
  const [editor] = useState(() =>
    withReact(createEditor())
  );

  const modalRoot = useRef<HTMLElement | null>(
    document.getElementById('modal-root') as HTMLElement
  );

  const [modalBackground, setModalBackground] =
    useState<boolean>(false);

  const getSelectedTypes = (editor: Editor) => {
    const { selection } = editor;

    // selection이 존재할 때
    if (selection) {
      // 선택된 노드들을 조회
      const selectedNodes = Editor.nodes(editor, {
        at: selection,
        match: (n) =>
          Element.isElement(n) || Text.isText(n), // Element와 Text 노드 모두 조회
      });

      // 선택된 노드들에 대해 타입을 추출하여 출력
      const selectedTypes = [];
      const selectedTextStyles = []; // CustomText 스타일을 저장할 배열

      for (const [node] of selectedNodes) {
        // Element 타입인 경우
        if (Element.isElement(node)) {
          selectedTypes.push(node.type);
        }

        // Text 타입인 경우
        if (Text.isText(node)) {
          const textStyles = {
            bold: node.bold || false,
            underline: node.underline || false,
            italic: node.italic || false,
          };
          console.log(node.bold);
          selectedTextStyles.push(textStyles);
        }
      }

      // console.log('Selected Types:', selectedTypes);
      // console.log(
      //   'Selected Text Styles:',
      //   selectedTextStyles
      // );

      return { selectedTypes, selectedTextStyles };
    }

    return null;
  };

  const buttonList: {
    text: string;
    capability: () => void;
    type: string;
  }[] = [
    {
      text: 'B',
      capability: () => StyleEditor.toggleBoldMark(editor),
      type: 'bold',
    },
    {
      text: '_',
      capability: () =>
        StyleEditor.toggleUnderlineMark(editor),
      type: 'underline',
    },
    {
      text: '< />',
      capability: () => ElementEditor.toggleH1Block(editor),
      type: 'code',
    },
    {
      text: ' / ',
      capability: () =>
        StyleEditor.toggleItalicMark(editor),
      type: 'italic',
    },
    {
      text: 'H1',
      capability: () => ElementEditor.toggleH1Block(editor),
      type: 'h1',
    },
    {
      text: 'H2',
      capability: () => ElementEditor.toggleH3Block(editor),
      type: 'h2',
    },
    {
      text: 'H3',
      capability: () => ElementEditor.toggleH2Block(editor),
      type: 'h3',
    },
    {
      text: 'ol',
      capability: () => ListEditor.toggleOlBlock(editor),
      type: 'ol',
    },
    {
      text: 'ul',
      capability: () => ListEditor.toggleUlBlock(editor),
      type: 'ul',
    },
    {
      text: 'link',
      capability: () => {
        setModalBackground(true);
      },
      type: 'link',
    },
  ];
  const [selectedTypes, setSelectedTypes] = useState<
    string[]
  >([]);
  const [selectedTextStyles, setSelectedTextStyles] =
    useState<
      {
        bold: boolean;
        underline: boolean;
        italic: boolean;
      }[]
    >([]);

  useEffect(() => {
    const handleSelectionChange = () => {
      const result = getSelectedTypes(editor);
      if (result) {
        setSelectedTypes(result.selectedTypes); // selectedTypes 업데이트
        setSelectedTextStyles(result.selectedTextStyles); // selectedTextStyles 업데이트
        // 에디터의 현재 값(내용) 가져오기
        let value = editor.children;
        const isAstChange = editor.operations.some(
          (op) => 'set_selection' !== op.type
        );
        if (value.length === 0) {
          const defaultParagraph: CustomElement = {
            type: 'paragraph',
            children: [
              {
                type: '',
                text: '',
              },
            ],
          };
          // 기본 paragraph 값으로 value를 설정
          value = [defaultParagraph];
        }
        if (isAstChange) {
          // Save the value to Local Storage.
          const content = JSON.stringify(value);
          localStorage.setItem('content', content);
        }
      }
    };

    // 에디터의 선택 변경 시 handleSelectionChange 실행
    editor.onChange = handleSelectionChange;
    // return () => {
    //   editor.onChange = null;
    // };
  }, [editor]);

  return (
    <>
      <div className="deps-wrapper">
        <Slate
          editor={editor}
          initialValue={initialValue}
          // 입력 내용의 변경이 있을때 마다 localStorage에 저장
          onChange={(value) => {
            const selectedTypes = getSelectedTypes(editor);
            console.log(
              '현재 선택된 부분의 타입:',
              selectedTypes
            );
            const isAstChange = editor.operations.some(
              (op) => 'set_selection' !== op.type
            );
            if (value.length === 0) {
              const defaultParagraph: CustomElement = {
                type: 'paragraph',
                children: [
                  {
                    text: '',
                  },
                ],
              };
              // 기본 paragraph 값으로 value를 설정
              value = [defaultParagraph];
            }
            if (isAstChange) {
              // Save the value to Local Storage.
              const content = JSON.stringify(value);
              localStorage.setItem('content', content);
            }
          }}
        >
          <div className="deps-controller">
            {buttonList.map((value, key) => {
              const isActive =
                selectedTypes.includes(value.type) ||
                (value.type === 'bold' &&
                  selectedTextStyles.some(
                    (style) => style.bold
                  )) ||
                (value.type === 'italic' &&
                  selectedTextStyles.some(
                    (style) => style.italic
                  )) ||
                (value.type === 'underline' &&
                  selectedTextStyles.some(
                    (style) => style.underline
                  ));

              return (
                <button
                  key={key}
                  className={`editor_btn ${isActive ? 'active' : ''}`}
                  onMouseDown={(event) => {
                    event.preventDefault();
                    value.capability();
                  }}
                >
                  {value.text}
                </button>
              );
            })}
          </div>
          <div className="deps-contents">
            <Editable
              style={{
                minHeight: '20rem',
                outline: 'none',
              }}
              renderElement={renderElement}
              renderLeaf={renderLeaf}
              onKeyDown={(event) => {
                //mac version metakey + any key
                if (event.metaKey === true) {
                  switch (event.key) {
                    // When "`" is pressed, keep our existing code block logic.
                    case '`': {
                      event.preventDefault();
                      ElementEditor.toggleCodeBlock(editor);
                      break;
                    }
                    // When "B" is pressed, bold the text in the selection.
                    case 'b': {
                      event.preventDefault();
                      StyleEditor.toggleBoldMark(editor);
                      break;
                    }
                    case 'Backspace': {
                      const { selection } = editor;

                      if (selection) {
                        const [currentNodeEntry] =
                          Editor.nodes(editor, {
                            match: (n) =>
                              Element.isElement(n), // 모든 요소를 확인
                            at: selection.anchor.path, // 선택된 위치에서 확인
                          });

                        if (currentNodeEntry) {
                          const [currentNode] =
                            currentNodeEntry;
                          console.log(
                            Element.isElement(
                              currentNode
                            ) && currentNode.type
                          );
                          // 현재 요소가 ul인지 확인
                          if (
                            Element.isElement(
                              currentNode
                            ) &&
                            currentNode.type === 'ul'
                          ) {
                            ListEditor.removeEmptyUl(
                              editor,
                              event,
                              selection
                            );
                            return;
                          }
                          if (
                            Element.isElement(
                              currentNode
                            ) &&
                            currentNode.type === 'ol'
                          ) {
                            ListEditor.removeEmptyOl(
                              editor,
                              event,
                              selection
                            );
                            return;
                          }
                        }
                      }

                      if (
                        selection &&
                        Range.isCollapsed(selection)
                      ) {
                        const [currentBlock] = Editor.nodes(
                          editor,
                          {
                            match: (n) =>
                              Element.isElement(n) &&
                              Editor.isBlock(editor, n),
                          }
                        );

                        if (currentBlock) {
                          const [, path] = currentBlock; // block
                          // Check if the selection is at the start of the block
                          if (
                            Editor.isStart(
                              editor,
                              selection.anchor,
                              path
                            )
                          ) {
                            event.preventDefault();

                            // Get the previous block
                            const prevBlockPath =
                              Editor.previous(editor, {
                                at: path,
                                match: (n) =>
                                  Element.isElement(n) &&
                                  Editor.isBlock(editor, n),
                              });

                            if (prevBlockPath) {
                              const [, prevPath] =
                                prevBlockPath;

                              // Move the cursor to the end of the previous block
                              Transforms.select(
                                editor,
                                Editor.end(editor, prevPath)
                              );

                              // Now delete the current block if it's empty
                              const isEmptyBlock =
                                Editor.string(
                                  editor,
                                  path
                                ) === '';
                              if (isEmptyBlock) {
                                Transforms.removeNodes(
                                  editor,
                                  {
                                    at: path,
                                  }
                                );
                              }
                            }
                          }
                        }
                      }
                      break;
                    }
                  }
                  return;
                }
                //any key
                switch (event.key) {
                  case '&': {
                    // Prevent the ampersand character from being inserted.
                    event.preventDefault();
                    // Execute the `insertText` method when the event occurs.
                    editor.insertText('and');
                    break;
                  }
                  case 'Enter': {
                    const { selection } = editor;
                    if (selection) {
                      const [currentNodeEntry] =
                        Editor.nodes(editor, {
                          match: (n) =>
                            Element.isElement(n), // 모든 요소를 확인
                          at: selection.anchor.path, // 선택된 위치에서 확인
                        });

                      if (currentNodeEntry) {
                        const [currentNode] =
                          currentNodeEntry;
                        console.log(
                          Element.isElement(currentNode) &&
                            currentNode.type
                        );
                        // 현재 요소가 ul인지 확인
                        if (
                          Element.isElement(currentNode) &&
                          currentNode.type === 'ul'
                        ) {
                          ListEditor.escapeUlBlock(
                            editor,
                            event,
                            selection
                          );
                          return;
                        }
                        // 현재 요소가 ol인지 확인
                        if (
                          Element.isElement(currentNode) &&
                          currentNode.type === 'ol'
                        ) {
                          ListEditor.escapeOlBlock(
                            editor,
                            event,
                            selection
                          );
                          return;
                        }
                      }
                    }
                    break;
                  }
                  case 'Backspace': {
                    const { selection } = editor;

                    if (selection) {
                      const [currentNodeEntry] =
                        Editor.nodes(editor, {
                          match: (n) =>
                            Element.isElement(n), // 모든 요소를 확인
                          at: selection.anchor.path, // 선택된 위치에서 확인
                        });

                      if (currentNodeEntry) {
                        const [currentNode] =
                          currentNodeEntry;
                        console.log(
                          Element.isElement(currentNode) &&
                            currentNode.type
                        );
                        // 현재 요소가 ul인지 확인
                        if (
                          Element.isElement(currentNode) &&
                          currentNode.type === 'ul'
                        ) {
                          ListEditor.removeEmptyUl(
                            editor,
                            event,
                            selection
                          );
                          return;
                        }

                        if (
                          Element.isElement(currentNode) &&
                          currentNode.type === 'ol'
                        ) {
                          ListEditor.removeEmptyOl(
                            editor,
                            event,
                            selection
                          );
                          return;
                        }
                      }
                    }
                    break;
                  }
                }
                // Define a new handler which prints the key that was pressed.
                if (!event.ctrlKey) {
                  return;
                }
              }}
            />
          </div>
        </Slate>
      </div>
      {modalRoot.current &&
        createPortal(
          <ModalBackground
            showModalBackground={modalBackground}
            setShowModalBackground={setModalBackground}
          >
            <LinkModal />
          </ModalBackground>,
          modalRoot.current
        )}
    </>
  );
};

export default SlateEditor;
