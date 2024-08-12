import CodeFooter from '@components/web/code/CodeFooter';
import CodeHeader from '@components/web/code/CodeHeader';
import { Route, Routes } from 'react-router-dom';
import { routerList } from '@constants/router/codeRoutingPath';

const CodeHome = () => {
  return (
    <>
      <CodeHeader />
      <Routes>
        {Object.entries(routerList).map(([key, value]) => (
          <Route
            key={key}
            path={value.path}
            element={
              value.component ? (
                <value.component />
              ) : undefined
            }
          ></Route>
        ))}
      </Routes>
      <CodeFooter />
    </>
  );
};

export default CodeHome;
