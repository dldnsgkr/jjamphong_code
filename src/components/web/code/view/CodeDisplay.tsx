import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import js from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import ts from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css';
import java from 'react-syntax-highlighter/dist/esm/languages/prism/java';
import scss from 'react-syntax-highlighter/dist/esm/languages/prism/scss';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import '@style/components/web/code/view/codeDisplay.scss';

type CodeDisplayPropsType = {
  code: string;
  language: string;
};

SyntaxHighlighter.registerLanguage('javascript', js);
SyntaxHighlighter.registerLanguage('typescript', ts);
SyntaxHighlighter.registerLanguage('css', css);
SyntaxHighlighter.registerLanguage('java', java);
SyntaxHighlighter.registerLanguage('scss', scss);
SyntaxHighlighter.registerLanguage('jsx', jsx);
SyntaxHighlighter.registerLanguage('tsx', tsx);

const CodeDisplay = ({
  code,
  language,
}: CodeDisplayPropsType) => {
  const handleCopy = () => {};

  return (
    <div className="codeDisplay__container">
      <div className="codeDisplay__header">
        <p className="codeDisplay__header--language">
          {language}
        </p>
        <CopyToClipboard text={code} onCopy={handleCopy}>
          <p className="copy-button">Copy</p>
        </CopyToClipboard>
      </div>
      <div className="codeDisplay__body">
        <SyntaxHighlighter
          language={language}
          style={okaidia}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeDisplay;
