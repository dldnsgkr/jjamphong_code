import { routerList } from '@constants/router/mainRoutingPath';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
