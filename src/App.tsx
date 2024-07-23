import { routerList } from '@constants/routingPath';
//import Footer from './components/web/common/Footer';
import Header from './components/web/common/Header';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Header />
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
