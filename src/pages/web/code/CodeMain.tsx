import CodeDisplay from '@components/web/code/view/CodeDisplay';
import '@style/pages/web/code/codeMain.scss';

const CodeMain = () => {
  const exampleCode = `
    import React from 'react';
    import { Route, Routes } from 'react-router-dom';
    import { routerList } from '@constants/router/codeRoutingPath';
    
    const CodeHome = () => {
      return (
        <>
          <Routes>
            {Object.entries(routerList).map(([key, value]) => (
              <Route
                key={key}
                path={value.path}
                element={<value.component />}
              />
            ))}
          </Routes>
        </>
      );
    };
    
    export default CodeHome;
  `;
  return (
    <main>
      <section className="code__introduce">
        <CodeDisplay
          code={exampleCode}
          language="javascript"
        />
      </section>
    </main>
  );
};

export default CodeMain;
