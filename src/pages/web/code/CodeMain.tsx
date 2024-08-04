import CodeDisplay from '@components/web/code/view/CodeDisplay';
import '@style/pages/web/code/codeMain.scss';

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
          <div></div>
        </div>
      </section>
    </main>
  );
};

export default CodeMain;
