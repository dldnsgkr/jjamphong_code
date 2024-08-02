import CodeFooter from '@components/web/footer/CodeFooter';
import CodeHeader from '@components/web/header/CodeHeader';
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
            element={<value.component />}
          ></Route>
        ))}
      </Routes>
      <CodeFooter />
    </>
  );
};

export default CodeHome;
