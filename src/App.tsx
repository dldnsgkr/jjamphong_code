import { routerList } from '@constants/routingPath';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        {Object.entries(routerList).map(([key, value]) => (
          <Route
            key={key}
            path={value.path}
            element={<value.component />}
          ></Route>
        ))}
      </Routes>
    </>
  );
}

export default App;
