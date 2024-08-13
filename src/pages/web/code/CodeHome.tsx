import CodeFooter from '@components/web/code/CodeFooter';
import CodeHeader from '@components/web/code/CodeHeader';
import { Route, Routes } from 'react-router-dom';
import { routerList } from '@constants/router/codeRoutingPath';
// import useSWR from 'swr';
// import { a } from '@api/test';

const CodeHome = () => {
  // const { data } = useSWR('asjash', async () => await a());
  // console.log(data?.data);
  return (
    <>
      <CodeHeader />
      <div></div>
      <div style={{ padding: '0 0 3rem 0' }}>
        <Routes>
          {Object.entries(routerList).map(
            ([key, value]) => (
              <Route
                key={key}
                path={value.path}
                element={
                  value.component ? (
                    <value.component />
                  ) : undefined
                }
              ></Route>
            )
          )}
        </Routes>
      </div>
      <CodeFooter />
    </>
  );
};

export default CodeHome;
