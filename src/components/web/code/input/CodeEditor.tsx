import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/theme-monokai'; // 원하는 테마를 선택하세요
import 'ace-builds/src-noconflict/mode-jsx';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-tsx';
import 'ace-builds/src-noconflict/mode-typescript';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/mode-scss';

type CodeEditorPropsType = {
  code?: string;
  height: string;
  language: string;
  onChange?: (newCode: string) => void;
};

const CodeEditor = ({
  code,
  height,
  language,
  onChange,
}: CodeEditorPropsType) => {
  console.log(language);
  return (
    <AceEditor
      mode={language.endsWith('.') ? 'text' : language}
      theme="monokai" // 원하는 테마를 설정하세요
      name="code_editor"
      value={code}
      onChange={onChange}
      width="100%"
      height={height}
      editorProps={{ $blockScrolling: true }}
      setOptions={{
        showPrintMargin: false,
        useWorker: false,
      }}
    />
  );
};

export default CodeEditor;
