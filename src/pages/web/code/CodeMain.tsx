import CodeEditor from '@components/web/code/input/CodeEditor';
import CodeDisplay from '@components/web/code/view/CodeDisplay';
import '@style/pages/web/code/codeMain.scss';
import { useState } from 'react';

const CodeMain = () => {
  const exampleCode = `
    import React from 'react';
    
    const Home = () => {
      return (
        <>
          <div className="home">Hello Home</div>
        </>
      );
    };
    
    export default Home;
  `;
  const [code, setCode] = useState(
    '// write your code here'
  );

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };
  console.log(code);
  return (
    <main>
      <section className="code__introduce">
        <div className="codeCopy__wrap">
          <div className="codeCopy__wrap--text">
            <p>
              You can find the code you want and copy it!
            </p>
          </div>
          <CodeDisplay code={exampleCode} language="jsx" />
        </div>
        <div className="codeWrite__wrap">
          <div className="codeWrite__wrap--text">
            <p>
              Enter the code you want to register and share
              it with everyone!
            </p>
            <button className="move__to--write">
              <span>Click!</span>
              <span>Go to Write</span>
            </button>
          </div>
          <CodeEditor
            code={code}
            height={'15rem'}
            language={'javascript'}
            onChange={handleCodeChange}
          />
        </div>
      </section>
    </main>
  );
};

export default CodeMain;
