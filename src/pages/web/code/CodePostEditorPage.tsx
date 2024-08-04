import BasicButton from '@components/web/code/button/BasicButton';
import BasicInput from '@components/web/code/input/BasicInput';
import CodeEditor from '@components/web/code/input/CodeEditor';
import DropdownInput from '@components/web/code/input/DropdownInput';
import TextareaInput from '@components/web/code/input/TextareaInput';
import { codeLanguageDropdownList } from '@constants/list/codeLanguageDropdown';
import '@style/pages/web/code/codePostEditorPage.scss';
import { useEffect, useState } from 'react';

const CodePostEditorPage = () => {
  // dropdown value
  const [dropdownValue, setDropdownValue] = useState(
    'Select the language you want to use.'
  );

  // code editor language setting
  const [editorLanguage, setEditorLanguage] =
    useState<string>(dropdownValue);

  // code data
  const [code, setCode] = useState(
    `// If you do not select one of the Language drop-down contents, 
// the language of the code editor is fixed to 'text'.`
  );

  // change code data
  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  // input element list
  const inputElementList = [
    {
      explainTextElement: <p className="title">TITLE</p>,
      inputElement: <BasicInput placeholder={'Title'} />,
    },
    {
      explainTextElement: <p className="writer">WRITER</p>,
      inputElement: <BasicInput placeholder={'Writer'} />,
    },
    {
      explainTextElement: (
        <p className="language">LANGUAGE</p>
      ),
      inputElement: (
        <DropdownInput
          dropdownValue={dropdownValue}
          setDropdownValue={setDropdownValue}
          dropdownList={codeLanguageDropdownList}
        />
      ),
    },
    {
      explainTextElement: <p className="code">CODE</p>,
      inputElement: (
        <CodeEditor
          language={editorLanguage}
          height="30rem"
          code={code}
          onChange={handleCodeChange}
        />
      ),
    },
    {
      explainTextElement: (
        <p className="explain">EXPLAIN OF THE CODE</p>
      ),
      inputElement: (
        <TextareaInput placeholder={'Explain'} />
      ),
    },
  ];

  // if dropdownValue is changing,
  // setting toLowerCase of dropdownValue to editorlanguage
  useEffect(() => {
    setEditorLanguage(dropdownValue.toLowerCase());
  }, [dropdownValue]);

  return (
    <main>
      <section className="code__postEditor">
        <h2>POSTING CODE</h2>
        {inputElementList.map((value, key) => (
          <div className="input-wrapper" key={key}>
            {value.explainTextElement}
            {value.inputElement}
          </div>
        ))}
        <BasicButton text={'POSTING'} />
      </section>
    </main>
  );
};

export default CodePostEditorPage;
